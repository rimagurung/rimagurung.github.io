'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "16a0cb95b2aac1e261bf9a9bd7b7b081",
"assets/AssetManifest.json": "74a0290739973141ef208814d268f1fb",
"assets/assets/1x.jpg": "3645fc9ac088a3a5f76f4066c1fa5c53",
"assets/assets/502.jpg": "67c343360b03e073f8e2ee8f0f31f953",
"assets/assets/bridal.jpg": "641b86a6fef07f1a305d0156c1681692",
"assets/assets/bridal2.jpg": "918d3c2e09a2afc891a69b1bafee3e4a",
"assets/assets/bridal_rima.jpg": "7b42eea1b6dbe71ef2fcaabc241eb010",
"assets/assets/commercial1.jpg": "141688f074f5090b81eaa2d277df4b6b",
"assets/assets/editor_rima.jpg": "fb7bd26859038a273489d97ccd27745e",
"assets/assets/engagementbride.jpg": "5264e7cc78dbcfa0e7b1f938f644c86a",
"assets/assets/face2.jpg": "140d59a8f942c2cdf6a3ebf3153ef39a",
"assets/assets/faceart.jpg": "520b9a6aa91de303697d9b73d1db85e4",
"assets/assets/grooming2.jpg": "bdc2034d294dbaa27e3cbe97d58b0d50",
"assets/assets/haldibride.jpg": "6e5e90f5fb8e64f28a4480daa73a0c61",
"assets/assets/mensgrooming.jpg": "174cebda30c1c583ca8acfae9eec6cfd",
"assets/assets/partymakeup1.jpg": "dfcb1993fec25998e0834522b8b9311c",
"assets/assets/receptionbride.jpg": "5fc15e55d21b8fa617c36e001f9d7026",
"assets/assets/rima_insta1.jpg": "b5b8a3403872e95b3204d1686a26ffab",
"assets/assets/rima_logo.png": "7ea4ac56c4b9c2a446644343cb296bf4",
"assets/assets/rima_video.jpg": "ff09bc641b6f3838d7072db6c2517e20",
"assets/assets/sangeetbride.jpg": "785d453c8b7a1aa575f95913095ceecd",
"assets/assets/selfmakeup.jpg": "a10f464eb1d7a5424359f28ddae56279",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "bc259a2a7bb56237cba85670d415c352",
"assets/NOTICES": "5da5166753c10d9cb8df2744c8c76052",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/flutter_image_compress_web/assets/pica.min.js": "6208ed6419908c4b04382adc8a3053a2",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d7791ef376c159f302b8ad90a748d2ab",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "5070443340d1d8cceb516d02c3d6dee7",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "658b490c9da97710b01bd0f8825fce94",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "3bd93dfe6f74ec4261f82b4d4c2c63dc",
"canvaskit/canvaskit.wasm": "acffb57c88613883935113f62d3f1cef",
"canvaskit/chromium/canvaskit.js": "2829bb10a7eb9912e12b452dfd671141",
"canvaskit/chromium/canvaskit.wasm": "7a1bea507c76779850ab738ff5eb598f",
"canvaskit/skwasm.js": "5256dd3e40ec9fe1fc9faa51a116bcfd",
"canvaskit/skwasm.wasm": "4e8794ddf4a38d9d979502cced963d9f",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.ico": "8b6a1e017c0d5ad801706963ac8d32c4",
"flutter.js": "a96e4cac3d2da39d86bf871613180e7b",
"icons/Icon-192.png": "2f0312ae9113f7abd3e64568930dbc14",
"icons/Icon-512.png": "a1e56ded2eeeb3c62d0c2ae088cf3793",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "730ea81279cce3a86216609db24ce6f8",
"/": "730ea81279cce3a86216609db24ce6f8",
"main.dart.js": "7219a9be36ad438143fc4155fe7335eb",
"manifest.json": "396d7b354a86b81a74e98148ba03bae5",
"version.json": "c6d1e20164d19186ddfa451d3da8642b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
