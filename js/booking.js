import {RESOURCES,SLOTS,getResource,availableDates} from './data.js';
export const STORAGE_KEY = 'date-roulette:v1';
export const totalPrice = (resource, guests) => resource.price * guests;
export function validateContext(context, now = new Date()) {
  if(!availableDates(now).includes(context.date)) return 'Выберите дату в ближайшие 14 дней.';
  if(!SLOTS.some(s=>s.id===context.slot)) return 'Выберите сеанс.';
  if(!Number.isInteger(context.guests)||context.guests<2||context.guests>4) return 'Участников должно быть от 2 до 4, только целое число.';
  if(!Number.isFinite(context.budget)||context.budget<0) return 'Укажите бюджет от 0 ₽.';
  return '';
}
export function isOccupied(id,date,slot,bookings) {
  return (id==='jazz' && slot==='19:00') || (id==='puzzle' && slot==='16:00') || bookings.some(b=>b.resourceId===id&&b.date===date&&b.slot===slot);
}
export function isPast(context,now = new Date()) { return !context.date || !context.slot || new Date(`${context.date}T${context.slot}:00`).getTime()<=now.getTime(); }
export function filterResources(context) { return RESOURCES.filter(r=>r.capacity>=context.guests&&totalPrice(r,context.guests)<=context.budget&&(context.mood==='Все настроения'||r.mood===context.mood)); }
export function candidates(context,bookings,now = new Date()) { return validateContext(context,now)||isPast(context,now)?[]:filterResources(context).filter(r=>!isOccupied(r.id,context.date,context.slot,bookings)); }
export function createBooking(id,context,bookings,now = new Date()) {
  const resource=getResource(id); const invalid=validateContext(context,now);
  if(invalid) throw new Error(invalid);
  if(!resource) throw new Error('Сначала выберите площадку.');
  if(isPast(context,now)) throw new Error('Этот сеанс уже начался. Выберите другое время.');
  if(context.guests>resource.capacity) throw new Error(`Площадка вмещает не больше ${resource.capacity} участников.`);
  if(totalPrice(resource,context.guests)>context.budget) throw new Error('Сумма выше вашего бюджета. Измените ограничения.');
  if(!filterResources(context).some(r=>r.id===id)) throw new Error('Площадка больше не соответствует фильтрам.');
  if(isOccupied(id,context.date,context.slot,bookings)) throw new Error('Этот сеанс уже занят. Выберите другой.');
  return {id:`DR-${crypto.randomUUID().slice(0,8).toUpperCase()}`,resourceId:id,name:resource.name,date:context.date,slot:context.slot,guests:context.guests,unitPrice:resource.price,total:totalPrice(resource,context.guests),createdAt:now.toISOString()};
}
export function validateStored(value) {
  if(!value || value.version!==1 || !Array.isArray(value.bookings) || value.bookings.length>1000) throw new Error('Неверный формат сохранений.');
  const ids=new Set(),slots=new Set();
  for(const b of value.bookings){
    const r=getResource(b.resourceId);const key=`${b.resourceId}/${b.date}/${b.slot}`;
    const dateValid=typeof b.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(b.date)&&!Number.isNaN(Date.parse(b.date))&&new Date(b.date+'T12:00:00Z').toISOString().slice(0,10)===b.date;
    if(!r||typeof b.id!=='string'||!/^DR-[A-Z0-9-]{8,40}$/.test(b.id)||typeof b.name!=='string'||b.name.length>100||!dateValid||!SLOTS.some(s=>s.id===b.slot)||!Number.isInteger(b.guests)||b.guests<2||b.guests>r.capacity||b.unitPrice!==r.price||b.total!==b.unitPrice*b.guests||typeof b.createdAt!=='string'||Number.isNaN(Date.parse(b.createdAt))||ids.has(b.id)||slots.has(key)||isOccupied(b.resourceId,b.date,b.slot,[])) throw new Error('Повреждены данные бронирований.');
    ids.add(b.id);slots.add(key);
  }
  return value.bookings;
}
export function readBookings(storage) { const raw=storage.getItem(STORAGE_KEY); return raw===null?[]:validateStored(JSON.parse(raw)); }
export function saveBookings(storage,bookings) { validateStored({version:1,bookings}); storage.setItem(STORAGE_KEY,JSON.stringify({version:1,bookings})); }