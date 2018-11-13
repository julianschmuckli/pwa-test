function startGyroscope() {
    var sensor = new Gyroscope();
    sensor.addEventListener('reading', function () {
        document.getElementById("gyroscope").innerText = "X: " + Math.round(sensor.x * 100) / 100 + " / Y:" + Math.round(sensor.y * 100) / 100 + " / Z:" + Math.round(sensor.z * 100) / 100;
    });
    sensor.start();
}