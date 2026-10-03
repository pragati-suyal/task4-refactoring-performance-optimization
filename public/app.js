const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const counter = document.getElementById("counter");

let todos = [];

// Fetch todos once
async function loadTodos() {
    const response = await fetch("/api/todos");
    todos = await response.json();

    renderTodos();
}

// Create todo
async function createTodo(title) {
    const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    if (!response.ok) {
        throw new Error("Unable to create todo");
    }

    const todo = await response.json();

    todos.push(todo);
    renderTodos();
}

// Toggle todo
async function toggleTodo(id, completed) {
    const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed })
    });

    if (!response.ok) {
        throw new Error("Unable to update todo");
    }

    const updatedTodo = await response.json();

    todos = todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
    );

    renderTodos();
}

// Delete todo
async function deleteTodo(id) {
    const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Unable to delete todo");
    }

    todos = todos.filter(todo => todo.id !== id);

    renderTodos();
}

// Filter todos
function getVisibleTodos() {
    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    const filter = filterSelect.value;

    return todos.filter(todo => {

        const matchesSearch =
            todo.title.toLowerCase().includes(searchTerm);

        const matchesFilter =
            filter === "all" ||
            (filter === "active" && !todo.completed) ||
            (filter === "completed" && todo.completed);

        return matchesSearch && matchesFilter;
    });
}

// Render UI
function renderTodos() {
    const visibleTodos = getVisibleTodos();

    todoList.replaceChildren();

    const fragment = document.createDocumentFragment();

    visibleTodos.forEach(todo => {

        const li = document.createElement("li");

        li.className = todo.completed
            ? "todo completed"
            : "todo";

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener("change", () => {
            toggleTodo(todo.id, checkbox.checked);
        });

        const title = document.createElement("span");

        title.textContent = todo.title;

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteTodo(todo.id);
        });

        li.append(
            checkbox,
            title,
            deleteButton
        );

        fragment.appendChild(li);
    });

    todoList.appendChild(fragment);

    const remaining = todos.filter(todo => !todo.completed).length;

    counter.textContent =
        `${remaining} active task(s)`;
}

// Add todo
todoForm.addEventListener("submit", async event => {

    event.preventDefault();

    const title = todoInput.value.trim();

    if (!title) {
        return;
    }

    try {
        await createTodo(title);

        todoInput.value = "";
        todoInput.focus();

    } catch (error) {
        console.error(error);
    }
});

// Search
searchInput.addEventListener("input", renderTodos);

// Filter
filterSelect.addEventListener("change", renderTodos);

// Start application
loadTodos();