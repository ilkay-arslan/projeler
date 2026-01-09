const form=document.querySelector(".todoForm");
const addInput=document.querySelector(".todoName");
const addButton=document.querySelector(".addButton");
const todoList=document.querySelector(".list-group");
const clearAllTodo=document.querySelector(".todoClearButton");

runEvents();

let todos=[];

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    todoList.addEventListener("click",removeTodoToUI);
    clearAllTodo.addEventListener("click",clearAllTodos);
}

function clearAllTodos(){
    checkTodoFromStorage();
    const todoListesi=document.querySelectorAll(".list-group-item");

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            todo.remove();
        })
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    else{
        alert("Silmek için en az bir todo olmalıdır");
    }
}

function removeTodoToUI(e){
    if(e.target.className==="fa-solid fa-trash-can"){
        const todo=e.target.parentElement.parentElement;
        todo.remove();
        removeTodoFromStorage(todo.textContent);
    }
}

function removeTodoFromStorage(removeTodo){
    checkTodoFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo==todo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}



function pageLoaded(){
    checkTodoFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const textInput=addInput.value.trim();
    if(textInput==null || textInput==""){
        alert("Lütfen bir değer giriniz");
    }
    else{
        addTodoToUI(textInput);
        addTodoToStorage(textInput);
    }

    e.preventDefault();
}

function addTodoToUI(newTodo){
    const li=document.createElement("li");
    li.className="list-group-item";

    const firstI=document.createElement("i");
    firstI.className="fa-solid fa-square";

    const span=document.createElement("span");
    span.textContent=newTodo;

    const a=document.createElement("a");
    a.href="#";
    a.className="delete-item";

    const secondI=document.createElement("i");
    secondI.className="fa-solid fa-trash-can";

    todoList.appendChild(li);
    li.appendChild(firstI);
    li.appendChild(span);
    li.appendChild(a);
    a.appendChild(secondI);

    addInput.value="";
}

function addTodoToStorage(newTodo){
    checkTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

function checkTodoFromStorage(){
    if(localStorage.getItem("todos")==null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}
