window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

function updateStatus() {
    if (navigator.onLine) {
        document.getElementById("online-status").innerText = "Online";
    } else {
        document.getElementById("online-status").innerText = "Offline";
    }
}

window.onload = function () {
    updateStatus();
};