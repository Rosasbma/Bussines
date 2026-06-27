// Service Worker — Roza Arreglos PWA
const CACHE = 'roza-v3';
const ASSETS = [
  '/Bussines/',
  '/Bussines/index.html',
  '/Bussines/icon-192.png',
  '/Bussines/icon-512.png',
  '/Bussines/manifest.json',
  '/Bussines/Logotipo_2.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.includes('firebase') ||
      url.includes('google') ||
      url.includes('googleapis') ||
      url.includes('gstatic') ||
      url.includes('fonts') ||
      url.includes('cdnjs')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
