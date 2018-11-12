if (('localStorage' in window)) {
    document.getElementById("webstorage-support").innerText = "Ja";
} else {
    document.getElementById("webstorage-support").innerText = "Nein";
}

var text_note = document.getElementById("data-store");
window.onload = function () {
    try {
        var note = JSON.parse(localStorage.getItem("note"));
        text_note.value = note.text;
    } catch (e) {
        //It was never a note created
    }
    text_note.onkeyup = saveNote;
};

function saveNote() {
    var value = {text: text_note.value};
    localStorage.setItem("note", JSON.stringify(value));
    console.log("Saved");
}