const shapes={
 heart:'<path d="M32 53 9 31C-6 14 15-1 32 15 49-1 70 14 55 31Z"/>',
 star:'<path d="m32 4 7 19 20 1-16 13 5 21-16-12-17 12 6-21L4 24l21-1Z"/>',
 moon:'<path d="M45 7A26 26 0 1 0 57 47 27 27 0 0 1 45 7Z"/><path d="m48 8 2 6 7 2-7 2-2 6-2-6-6-2 6-2Z"/>',
 film:'<rect x="6" y="13" width="52" height="38" rx="4"/><path d="M17 13v38m30-38v38M6 23h11m-11 18h11m30-18h11M47 41h11"/><path d="m27 25 13 7-13 8Z"/>',
 palette:'<path d="M34 7C10 5-3 34 13 48c10 10 18 5 16-2-1-6 8-9 12-4C57 54 73 13 34 7Z"/><circle cx="20" cy="25" r="3"/><circle cx="32" cy="18" r="3"/><circle cx="45" cy="23" r="3"/>',
 music:'<path d="M26 45V15l27-7v29M26 24l27-7"/><ellipse cx="18" cy="48" rx="9" ry="6"/><ellipse cx="45" cy="40" rx="9" ry="6"/>',
 vase:'<path d="M23 9h18l-3 14c1 7 14 10 14 22 0 8-8 12-20 12S12 53 12 45c0-12 13-15 14-22Z"/><path d="M25 22h14M15 40h34M24 8v-3h16v3"/>',
 game:'<path d="M19 20h26c10 0 18 26 12 30-5 4-13-9-15-9H22c-2 0-10 13-15 9-6-4 2-30 12-30Z"/><path d="M19 26v12m-6-6h12"/><circle cx="43" cy="29" r="2"/><circle cx="49" cy="35" r="2"/>',
 dinner:'<path d="M5 43h54M9 40a23 23 0 0 1 46 0M32 16v-6m-4 0h8M10 52h44"/>',
 camera:'<path d="M6 20h13l5-7h16l5 7h13v33H6Z"/><circle cx="32" cy="35" r="11"/><path d="M48 26h4"/>',
 key:'<circle cx="22" cy="23" r="13"/><path d="m32 32 23 23m-7-7 6-6M40 40l6-6"/><circle cx="19" cy="20" r="3"/>',
 sun:'<circle cx="32" cy="32" r="14"/><path d="M32 2v8m0 44v8M2 32h8m44 0h8M11 11l6 6m30 30 6 6M11 53l6-6m30-30 6-6"/>',
 coffee:'<path d="M12 23h32v16c0 18-32 18-32 0Zm32 3h7c12 0 10 17-7 15M7 57h44M23 15c-8-7 8-7 0-14m12 14c-8-7 8-7 0-14"/>'
};
export function icon(name,cls='') {return `<svg class="icon ${cls}" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${shapes[name]||shapes.heart}</svg>`;}
export function poster(resource){return `<div class="poster" style="--poster:${resource.color}"><span class="poster-orbit"></span><span class="poster-line"></span>${icon(resource.icon)}<span class="poster-caption">${resource.english}</span><span class="poster-no">DR / ${String(resource.index+1).padStart(2,'0')}</span></div>`;}