self.addEventListener('install', function (event) {
    console.log('Install!');

    //Load all files into cache when installing the app
    var offlineRequest = new Request('index.html');
    event.waitUntil(
        fetch(offlineRequest).then(function (response) {
            return caches.open('offline').then(function (cache) {
                console.log('[oninstall] Cached offline page', response.url);
                return cache.put(offlineRequest, response);
            });
        })
    );
});
self.addEventListener("activate", event => {
    console.log('Activate!');
});
self.addEventListener('fetch', function (event) {
    console.log('Fetch!', event.request);

    var request = event.request;

    if (request.method === 'GET') {

        event.respondWith(
            fetch(request).catch(function (error) {

                console.error(
                    '[onfetch] Failed. Serving cached offline fallback ' +
                    error
                );
                return caches.open('offline').then(function (cache) {
                    return cache.match('offline.html');
                });
            })
        );
    }
});