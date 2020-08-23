var visible = false;
var storage = window.localStorage;

var notes = storage.getItem("notes");
if(notes == null)
    notes = [];
else
    notes = JSON.parse(notes);


/**
 * 
 */
function showWriter() {
    if(visible)
        document.getElementById("noteWriter").style.display = "none";
    else
        document.getElementById("noteWriter").style.display = "flex";

    visible = !visible;
}

/**
 * 
 */
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

    div.onclick = function() {
        divClick(div);
    };
    div.onmousemove = function() {
        assign(div);
    };
    
    
    clearFields();
    showWriter();
}


/**
 * 
 * @param {HTMLDivElement} div 
 */
function assign(div) {
    if(div.children.length == 2)
    {
        div.onclick = function() {
            divClick(div);
        };
    }
}

/**
 * 
 * @param {Note} note 
 */
function loadNote(note) {

    var div = document.createElement("div");
    div.className = "note";

    var h2 = document.createElement("h2");
    h2.textContent = note.title;

    var p = document.createElement("p");
    p.textContent = note.content;

    div.appendChild(h2);
    div.appendChild(p);

    div.onclick = function() {
        divClick(div);
    };
    div.onmousemove = function() {
        assign(div);
    };

    document.getElementById("notes").appendChild(div);
}

/**
 * 
 * @param {HTMLDivElement} div 
 */
function divClick(div) {
    let c = div.children;

    div.onclick = null;
    div.className = "edit";

    var input = document.createElement("input");
    input.className = "title";
    input.value = c[0].textContent;
    

    var textarea = document.createElement("textarea");
    textarea.className = "noteContent";
    textarea.value = c[1].textContent;
    

    c[0].replaceWith(input);
    c[1].replaceWith(textarea);


    var nodes = Array.prototype.slice.call(div.parentElement.children);
    var index = nodes.indexOf(div);

    var saveButton = document.createElement("div");
    saveButton.className = "button";
    saveButton.onclick = function() {
        saveChanges(div, index);
    };
    saveButton.textContent = "Save";
    div.appendChild(saveButton);

    var deleteButton = document.createElement("div");
    deleteButton.className = "button";
    deleteButton.onclick = function() {
        deleteNote(div, index);
    };
    deleteButton.textContent = "Delete";
    div.appendChild(deleteButton);
}



/**
 * 
 * @param {HTMLDivElement} div 
 * @param {number} index 
 */
function saveChanges(div, index) {

    let note = {
        title: div.children[0].value,
        content: div.children[1].value
    };

    if(note.title == "" && note.content == ""){
        window.alert("Can't save an empty message.")
        return;
    }

    div.onmouseenter = null;
    div.className = "note";


    var h2 = document.createElement("h2");
    h2.textContent = note.title;

    var p = document.createElement("p");
    p.textContent = note.content;

    
    div.textContent = "";
    div.appendChild(h2);
    div.appendChild(p);
    
    
    notes.splice(index, 1, note);
    storage.setItem("notes", JSON.stringify(notes));
}

/**
 * 
 * @param {HTMLDivElement} div 
 * @param {number} index 
 */
function deleteNote(div, index) {
    div.remove();

    notes.splice(index, 1);

    storage.setItem("notes", JSON.stringify(notes));
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