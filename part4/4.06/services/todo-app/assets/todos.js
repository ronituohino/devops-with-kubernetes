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

async function markTodoDone(e) {
  e.preventDefault();

  const todoId = e.target.dataset.id;

  try {
    const response = await fetch(`${TODO_API_URL}/${todoId}`, {
      method: "PUT",
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

  // Render todos that are done at the bottom
  todos.forEach((todo) => {
    if (todo.Done) {
      const li = document.createElement("li");
      li.classList.add("todo-entry");
      li.classList.add("todo-done");

      const todoP = document.createElement("p");
      const text = document.createTextNode(todo.Todo);
      todoP.appendChild(text);
      li.appendChild(todoP);

      ul.insertBefore(li, ul.firstChild);
    }
  });

  // Render todos that are not done at the top
  todos.forEach((todo) => {
    if (!todo.Done) {
      const li = document.createElement("li");
      li.classList.add("todo-entry");

      const todoP = document.createElement("p");
      const text = document.createTextNode(todo.Todo);
      todoP.appendChild(text);
      li.appendChild(todoP);

      const todoBtn = document.createElement("button");
      todoBtn.dataset.id = todo.Id;
      const btnText = document.createTextNode("Done");
      todoBtn.appendChild(btnText);
      todoBtn.onclick = markTodoDone;
      li.appendChild(todoBtn);

      ul.insertBefore(li, ul.firstChild);
    }
  });
}

// Add functionality to todo form
const todoForm = document.querySelector(".todo-form");
todoForm.addEventListener("submit", submitTodo);

// Get todos from server
getTodos();
