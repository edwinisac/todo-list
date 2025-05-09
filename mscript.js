const todoform = document.querySelector("form");
const todoInput = document.querySelector("#todo_input");
const todoUl = document.querySelector("#todo_items");

let todoArray = getTodo();
updateTodoLi();

todoform.addEventListener("submit", function (e) {
  e.preventDefault(); //used to prevent default behaviour of the browser when the submit event is happened
  addTodo();
});

//function for adding to do items to the todo array

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject={
      text:todoText,
      completed:false

  }
    todoArray.push(todoObject);
    updateTodoLi();
    saveTodo();
    todoInput.value = "";
  }
}

function updateTodoLi() {
  todoUl.innerHTML = "";
  todoArray.forEach((todo, todoIndex) => {
    todoItem = createHtml(todo, todoIndex);
    todoUl.append(todoItem);
  });
}

// function for creating the li elements

function createHtml(todo, todoIndex) {
  const order=`task-${todoIndex}`;
  const newlist = document.createElement("li");
  const todoText=todo.text;
  newlist.classList.add("todo");
  newlist.innerHTML = `          <input type="checkbox" id="task_${order}" />
          <label class="custom_checkbox" for="task_${order}">
            <i class="fa-solid fa-check"></i>
          </label>
          <label for="task_${order}" class="todo_text">${todoText}</label>
          <button class="delete_button">
            <i class="fa-solid fa-trash"></i>
          </button>`;

  const todoDelete=newlist.querySelector(".delete_button");
  todoDelete.addEventListener("click",function () {
    deleteItem(todoIndex);
  })
  const checkbox=newlist.querySelector("input");
  checkbox.addEventListener("change",()=>{
    todoArray[todoIndex].completed=checkbox.checked;
    saveTodo();
  })
  
  return newlist;
}

// function to save data

function saveTodo(){
  const jsonTodoArray=JSON.stringify(todoArray);
  localStorage.setItem("todos",jsonTodoArray);
}
// function to get saved data
function getTodo(){
  const todos=localStorage.getItem("todos")||"[]";
  return JSON.parse(todos);
}

//function to delete li


function deleteItem(index){
  todoArray=todoArray.filter((_,i)=>i!==index);
  saveTodo();
  updateTodoLi();
}

