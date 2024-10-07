const TODO_API_URL = "/todos";

async function getTodos() {
  try {
    const response = await fetch(TODO_API_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    updateTodos(json);
  } catch (error) {
    console.error(error.message);
  }
}

async function submitTodo(e) {
  e.preventDefault();

  const todo = e.target.querySelector("#todo").value;

  try {
    const response = await fetch(TODO_API_URL, {
      method: "POST",
      body: JSON.stringify({ todo }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    updateTodos(json);
  } catch (error) {
    console.error(error.message);
  }
}

function updateTodos(todos) {
  const ul = document.querySelector(".todo-list");

  // Clear all previous todos
  while (ul.firstChild) {
    ul.removeChild(ul.lastChild);
  }

  // Add new ones
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const liContent = document.createTextNode(todo);
    li.appendChild(liContent);
    ul.insertBefore(li, ul.firstChild);
  });
}

// Add functionality to todo form
const todoForm = document.querySelector(".todo-form");
todoForm.addEventListener("submit", submitTodo);

// Get todos from server
getTodos();
