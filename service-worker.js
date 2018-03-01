var dataCacheName = 'GrndVsInf-v1';
var cacheName = 'GrndVsInf-final-1';
var version = '1.0.0';
const CACHE = 'GrndVsInf-final-1';
var filesToCache = [
  '/index.html',
  '/js/alarm.js',
  '/js/app.js',
  '/js/constants.js',
  '/js/draggability.js',
  '/js/guessed.js',
  '/js/health.js',
  '/js/leveling-system.js',
  '/js/wordsmanager.js',
  '/css/main.css',
  '/css/normalize.css',
  '/libs/mobile-drag-drop/default.css',
  '/libs/mobile-drag-drop/scroll-behaviour.min.js',
  '/libs/compromise/builds/compromise.es6.min.js'
];

self.addEventListener('install', function(evt) {
  console.log('[ServiceWorker] Installed version', version);
  evt.waitUntil(
    precache()
    .then(function() {
      console.log('[ServiceWorker] Skip waiting on install');
      return self.skipWaiting();
    })
  )
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('[Service Worker] Fetch', evt.request.url);
  if( evt.request.url.includes('chrome-extension:')
      || evt.request.url.includes('socket.io')
      || evt.request.url.includes('google-analytic')
    ) return;
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request).then(refresh));
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
   return fetch(request).then(function (response) {
     return cache.put(request, response.clone()).then(function () {
       return response;
     });
   });
  });
}

function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      var message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      }
      client.postMessage(JSON.stringify(message));
    })
  })
}
