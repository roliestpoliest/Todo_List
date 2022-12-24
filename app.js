//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event){
   event.preventDefault();
   // console.log('hello');
   //todo div
   const todoDiv = document.createElement("div");
   // const inputField = document.getElementsByClassName("todo-input");
   if(!todoInput.value){
      document.getElementsByName("input-field")[0].placeholder = "input cannot be empty";
      return;
   }else{
      document.getElementsByName("input-field")[0].placeholder = "todo item";
   }
   todoDiv.classList.add("todo");

   //todo <li>
   const newTodo = document.createElement("li");
   newTodo.innerText = todoInput.value;
   newTodo.classList.add("todo-item");

   //insert new todo item into the div
   todoDiv.appendChild(newTodo);

   //add todos to local storage
   saveLocalTodos(todoInput.value);

   //check mark button
   const completedButton = document.createElement("button");
   completedButton.innerHTML = '<i class="fas fa-check"><li>';
   completedButton.classList.add("complete-btn");
   todoDiv.appendChild(completedButton);
   //trash button
   const trashButton = document.createElement("button");
   trashButton.innerHTML = '<i class="fas fa-trash"><li>';
   trashButton.classList.add("trash-btn");
   todoDiv.appendChild(trashButton);

   //append to list
   todoList.appendChild(todoDiv);
   
   //clear todo input value
   todoInput.value = "";
}

function deleteCheck(event){
   const item = event.target;
   //delete todo
   if(item.classList.contains("trash-btn")){
      const todo = item.parentElement;
      //animation
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener('transitionend', function(){
         todo.remove();
      });
   }
   
   //check mark
   if(item.classList.contains("complete-btn")){
      console.log("toggle completed");
      const todo = item.parentElement;
      todo.classList.toggle("completed");
   }
}

function filterTodo(event) {
   const type = event.target.value;
   const todos = document.querySelectorAll(".todo");
 
   for (const i of todos) {
     switch (type) {
       case "all":
         i.style.display = "flex";
         break;
       case "completed":
         i.className.includes("completed")
           ? (i.style.display = "flex")
           : (i.style.display = "none");
         break;
       case "uncompleted":
         !i.className.includes("completed")
           ? (i.style.display = "flex")
           : (i.style.display = "none");
         break;
     }
   }
}

function saveLocalTodos(todo){
   let todos;
   if(localStorage.getItem("todos") === null){
      todos = [];
   }else{
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
   let todos;
   if(localStorage.getItem("todos") === null){
      todos = [];
   }else{
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.forEach(function(todo){
      //todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      //todo <li>
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");

      //insert new todo item into the div
      todoDiv.appendChild(newTodo);

      //check mark button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"><li>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"><li>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      //append to list
      todoList.appendChild(todoDiv);
   });
}

function removeLocalTodos(todo){
   let todos;
   if(localStorage.getItem("todos") === null){
      todos = [];
   }else{
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}