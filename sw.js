/* 시즈오카 여행 — 서비스 워커
   · 앱 파일: 캐시 우선 (오프라인에서 즉시 열림)
   · 지도 타일: 캐시 우선 + 백그라운드 저장, 최대 개수 제한
   업데이트할 때는 VERSION 숫자만 올리면 됩니다.
*/
var VERSION   = 'v8';
var SHELL     = 'shizuoka-shell-' + VERSION;
var TILES     = 'shizuoka-tiles-' + VERSION;
var TILE_MAX  = 1400;   // 타일 캐시 상한 (대략 40~60MB)

var SHELL_FILES = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './leaflet.js',
  './leaflet.css',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './images/marker-icon.png',
  './images/marker-shadow.png',
  './images/layers.png',
  './images/layers-2x.png'
];

/* ---------- 설치 ---------- */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(SHELL).then(function (c) {
      return c.addAll(SHELL_FILES);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

/* ---------- 활성화: 옛 캐시 정리 ---------- */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL && k !== TILES) return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* ---------- 타일 캐시 개수 제한 ---------- */
function trimTiles() {
  caches.open(TILES).then(function (c) {
    c.keys().then(function (keys) {
      if (keys.length <= TILE_MAX) return;
      var remove = keys.length - TILE_MAX;
      for (var i = 0; i < remove; i++) c.delete(keys[i]);
    });
  });
}

function isTile(url) {
  return /tile\.openstreetmap\.org/.test(url.hostname) ||
         /\.tile\.openstreetmap\.org/.test(url.hostname);
}

/* ---------- 요청 처리 ---------- */
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }

  /* 지도 타일: 캐시에 있으면 그대로, 없으면 받아서 저장 */
  if (isTile(url)) {
    e.respondWith(
      caches.open(TILES).then(function (c) {
        return c.match(req).then(function (hit) {
          if (hit) return hit;
          return fetch(req).then(function (res) {
            if (res && (res.ok || res.type === 'opaque')) {
              c.put(req, res.clone());
              trimTiles();
            }
            return res;
          }).catch(function () {
            /* 오프라인이고 저장도 안 된 타일 → 빈 응답 (지도는 회색으로 표시) */
            return new Response('', { status: 504, statusText: 'offline tile' });
          });
        });
      })
    );
    return;
  }

  /* 같은 출처의 앱 파일: 캐시 우선, 네트워크로 갱신 */
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) {
          if (res && res.ok) {
            caches.open(SHELL).then(function (c) { c.put(req, res.clone()); });
          }
          return res;
        }).catch(function () {
          return hit || caches.match('./index.html');
        });
        return hit || net;
      })
    );
    return;
  }

  /* 그 외(외부 링크 등)는 그대로 통과 */
});
