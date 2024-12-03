const CACHE_NAME = 'my-app-cache-ver1';
const urlsToCache = [
    "index.html",
    "offline.html",
    "styles.css",
    "app.js",
    "logo192.png",
    "logo512.png"
];


tgis.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Open Cache");
            return cache.addAll(urlsToCache);
        })
    )
})


this.addEventListener("fetch", (event) => {
    if (event.request.method === "GET") {
        event.respondWith(
            caches.match(event.request).then((res) => {
                return (
                    res ||
                    fetch(event.request).then((networkRes) => {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkRes.clone());
                            return networkRes;
                        });
                    })
                );
            }).catch(() => caches.match('offline.html'))
        );
    }
});

this.addEventListener("sync", (event) => {
    if (event.tag === "sync-post-data") {
        event.waitUntil(sendPostRequests());
    }
});

async function sendPostRequests() {
    const data = await getPendingRequests(); // Retrieve from IndexedDB
    for (const request of data) {
        await fetch(request.url, {
            method: "POST",
            body: JSON.stringify(request.body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Remove from IndexedDB after successful sync
    }
}

this.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || "New Notification";
    const options = {
        body: data.body || "You have a new update.",
        icon: "logo192.png",
    };
    event.waitUntil(self.registration.showNotification(title, options));
});



this.addEventListener("activate", (event)=>{
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(caches.keys().then(cacheNames => Promise.all(
        cacheNames.map((cacheName) => {
            if(!cacheName.includes(CACHE_NAME)) {
                return caches.delete(cacheName);
            }
        }))))
})
