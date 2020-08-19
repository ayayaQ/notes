var visible = false;
var storage = window.localStorage;

var notes = storage.getItem("notes");
if(notes == null)
    notes = [];
else
    notes = JSON.parse(notes);


function showWriter() {
    if(visible)
        document.getElementById("noteWriter").style.display = "none";
    else
        document.getElementById("noteWriter").style.display = "flex";

    visible = !visible;
}

function saveNote() {
    let note = {
        title: document.getElementById("title").value,
        content: document.getElementById("noteContent").value
    };

    if(note.title == "" && note.content == "") {
        window.alert("Can't save an empty message.")
        return;
    }

    var div = document.createElement("div");
    div.className = "note";

    

    var h2 = document.createElement("h2");
    h2.textContent = note.title;

    var p = document.createElement("p");
    p.textContent = note.content;

    div.appendChild(h2);
    div.appendChild(p);

    document.getElementById("notes").appendChild(div);

    notes.push(note);
    storage.setItem("notes", JSON.stringify(notes));
    
    
    clearFields();
    console.log(notes);
}

function loadNote(note) {

    var div = document.createElement("div");
    div.className = "note";

    var h2 = document.createElement("h2");
    h2.textContent = note.title;

    var p = document.createElement("p");
    p.textContent = note.content;

    div.appendChild(h2);
    div.appendChild(p);

    document.getElementById("notes").appendChild(div);
}

function loadAllNotes() {

    notes.forEach(element => {
        loadNote(element);
    });
}

function clearFields() {
    document.getElementById("title").value = ""
    document.getElementById("noteContent").value = ""
}

loadAllNotes();