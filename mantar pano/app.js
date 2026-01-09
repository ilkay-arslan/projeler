const addNote=document.querySelector(".addNote button");
const noteList=document.querySelector(".note-list");


runEvents();


function runEvents(){
    addNote.addEventListener("click",addNotes);
    noteList.addEventListener("click",editing);
    noteList.addEventListener("click",removeToNote);
    document.addEventListener("DOMContentLoaded",pageLoaded);
}

function pageLoaded(){
    const notes=JSON.parse(localStorage.getItem("notes"));

    if(notes){
        notes.forEach((notesText) =>{
            addNotesToUI(notesText);
        }) 
    }
}

function editing(e){
    if(e.target.classList.contains("fa-pen")){
        const li = e.target.closest(".note-list-item");
        const noteDiv = li.querySelector(".note");
        const textArea = li.querySelector(".write");
        const p=li.querySelector(".p");

        // toggle mantığı
        if (textArea.classList.contains("hidden")) {
            // Düzenleme moduna gir
            textArea.value = noteDiv.textContent; 
            // div'deki yazıyı textarea'ya kopyala
            textArea.classList.remove("hidden");
            p.classList.remove("hidden");
            noteDiv.classList.add("hidden");
        } else {
            // Kaydetme moduna geç
            noteDiv.textContent = textArea.value; // textarea içeriğini div'e yaz
            textArea.classList.add("hidden");
            p.classList.add("hidden");
            noteDiv.classList.remove("hidden");
            uptadeStorage();
        }
        
    }
}

function removeToNote(e){
    e.preventDefault();
    if(e.target.classList.contains("fa-trash-can")){
        const li=e.target.parentElement.parentElement.parentElement;
        li.remove();
        uptadeStorage();
    }

}

function addNotes(e){
    addNotesToUI("");
   // uptadeStorage();
    e.preventDefault();
}

function uptadeStorage(){
    const notesText=document.querySelectorAll(".note");

    const notes=[];

    notesText.forEach((note) => notes.push(note.textContent));
    localStorage.setItem("notes",JSON.stringify(notes));
}


function addNotesToUI(notesText=""){
    let li=document.createElement("li");
    li.className="note-list-item";

    let firstDiv=document.createElement("div");
    firstDiv.className="header";

    let p=document.createElement("p");
    p.className="p hidden";
    p.textContent="Editing...";

    let firstA=document.createElement("a");
    firstA.href="#";
    firstA.className="firstLink";
    
    let firstI=document.createElement("i");
    firstI.className="fa-solid fa-pen";

    let secondA=document.createElement("a");
    secondA.href="#";
    secondA.className="secondLink";

    let secondI=document.createElement("i");
    secondI.className="fa-solid fa-trash-can";

    let secondDiv=document.createElement("div");
    secondDiv.className="note";
    secondDiv.textContent = notesText;
    if(!notesText) secondDiv.classList.add("hidden");

    let textArea=document.createElement("textarea");
    textArea.className="write";
    textArea.value = notesText;   // Burada not içeriğini textarea’ya da yaz
    textArea.classList.add("hidden");

    noteList.appendChild(li);

    li.appendChild(firstDiv);
    li.appendChild(secondDiv);
    li.appendChild(textArea);

    firstDiv.appendChild(p);
    firstDiv.appendChild(firstA);
    firstDiv.appendChild(secondA);

    firstA.appendChild(firstI);

    secondA.appendChild(secondI);

    return li;
}