var offline_files = [
    "index.html",
    "manifest.json",
    "assets/offline.js"
];

self.addEventListener('install', function (event) {
    console.log('Install!');

    //Load all files defined in the list above into cache when installing the app
    offline_files.forEach(function (file, index) {
        var offlineRequest = new Request(file);
        event.waitUntil(
            fetch(offlineRequest).then(function (response) {
                return caches.open('offline').then(function (cache) {
                    console.log('[oninstall] Cached offline page', response.url);
                    return cache.put(offlineRequest, response);
                });
            })
        );
    });
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
                    var url_split = request.url.split("/");
                    return cache.match(url_split[url_split.length - 1]);
                });
            })
        );
    }
});