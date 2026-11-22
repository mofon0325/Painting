const CACHE='moyan-art-github-v3';
const ASSETS=['./','./index.html','./app.js','./styles.css','./icon.svg','./icon-192.png','./icon-512.png','./manifest.webmanifest','./questions.json'];
self.addEventListener('install',ev=>ev.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',ev=>ev.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',ev=>{const u=new URL(ev.request.url);if(ev.request.method!=='GET'||u.pathname.includes('/api/'))return;ev.respondWith(fetch(ev.request).then(r=>{if(r.ok&&u.origin===self.location.origin){const copy=r.clone();caches.open(CACHE).then(c=>c.put(ev.request,copy));}return r;}).catch(()=>caches.match(ev.request)));});
