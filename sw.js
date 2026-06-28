const CACHE='matournee-v2';
const ASSETS=['./manifest.json','https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js','https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ASSETS.map(u=>c.add(u).catch(()=>{})))));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const req=e.request;const u=req.url;
 if(u.includes('/route')||u.includes('/geocode')||u.includes('nominatim')||u.includes('mymemory')||u.includes('cartocdn')||u.includes('openrouteservice')||u.includes('project-osrm')){return;}
 if(req.mode==='navigate'||u.endsWith('/')||u.endsWith('index.html')){e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp)).catch(()=>{});return r;}).catch(()=>caches.match(req)));return;}
 e.respondWith(caches.match(req).then(r=>r||fetch(req)));});
