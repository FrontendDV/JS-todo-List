// SELECTORS
const input = document.querySelector('#input');
const addToListBtn = document.querySelector('#addToListBtn');
const toDoList = document.querySelector('#toDoList');


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded',getLocalTodos);
addToListBtn.addEventListener('click',addToDo);


// FUNCTIONS
function addToDo(){
    // check if input value is null return false and do not add empty box
    if(input.value =="")return false;
    // create Div in ul tag
    let div = document.createElement('div');
    toDoList.appendChild(div);
    div.className='toDoDiv';
    // create paragraph in div 
    let newToDo = document.createElement('p');
    div.appendChild(newToDo);
    newToDo.innerText = input.value;
    saveLocalStorage(input.value);
    input.value = "";
    // create icon div element in div
    let iconsDiv = document.createElement('div')
    div.appendChild(iconsDiv);
    iconsDiv.style.display = "flex";
    // create checked icon element in icon div
    let plusIcon = document.createElement('i');
    iconsDiv.appendChild(plusIcon);
    plusIcon.innerHTML = "<i class='fas fa-check'></i>";
    plusIcon.style.cursor = "pointer";
    // create minus icon element in icon div
    let minusIcon = document.createElement('i');
    iconsDiv.appendChild(minusIcon);
    minusIcon.innerHTML = "<i class='fas fa-trash'></i>";
    minusIcon.style.cursor='pointer';
    // checked event listener on click check icon
    plusIcon.addEventListener('click',checkNewToDo);
    // delete event listener on click minus icon
    minusIcon.addEventListener('click',deleteNewToDo);
}


function checkNewToDo(e){
    e.currentTarget.parentElement.parentElement.style.opacity = "0.5"
}
 
function deleteNewToDo(e){
    // animation
    e.currentTarget.parentElement.parentElement.classList.add('fall'); 
    removeLocalTodo(e);
    // delete full div when animation end
    const todo = e.currentTarget.parentElement.parentElement;
    todo.addEventListener('transitionend',()=>{
        todo.remove()
    })
}

// Save to do list in local storage
function saveLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Get items from local storage and print

function getLocalTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        let div = document.createElement('div');
        toDoList.appendChild(div);
        div.className='toDoDiv';
        // create paragraph in div 
        let newToDo = document.createElement('p');
        div.appendChild(newToDo);
        newToDo.innerText = todo;
        // create icon div element in div
        let iconsDiv = document.createElement('div')
        div.appendChild(iconsDiv);
        iconsDiv.style.display = "flex";
        // create checked icon element in icon div
        let plusIcon = document.createElement('i');
        iconsDiv.appendChild(plusIcon);
        plusIcon.innerHTML = "<i class='fas fa-check'></i>";
        plusIcon.style.cursor = "pointer";
        // create minus icon element in icon div
        let minusIcon = document.createElement('i');
        iconsDiv.appendChild(minusIcon);
        minusIcon.innerHTML = "<i class='fas fa-trash'></i>";
        minusIcon.style.cursor='pointer';
         // checked event listener on click check icon
        plusIcon.addEventListener('click',checkNewToDo);
        // delete event listener on click minus icon
        minusIcon.addEventListener('click',deleteNewToDo);
    })
}
// Delete to do list items 
function removeLocalTodo(e){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const toDoIndex = e.currentTarget.parentElement.parentElement.innerText;
    todos.splice(todos.indexOf(toDoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}