const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let todos = [
    {
        id: 1,
        title: "Learn JavaScript",
        completed: false
    },
    {
        id: 2,
        title: "Complete Task 4",
        completed: true
    }
];

let nextId = 3;

// GET all todos
app.get("/api/todos", (req, res) => {
    res.json(todos);
});

// ADD todo
app.post("/api/todos", (req, res) => {
    const title = String(req.body.title || "").trim();

    if (!title) {
        return res.status(400).json({
            error: "Todo title is required"
        });
    }

    const todo = {
        id: nextId++,
        title,
        completed: false
    };

    todos.push(todo);

    res.status(201).json(todo);
});


app.put("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(item => item.id === id);

    if (!todo) {
        return res.status(404).json({
            error: "Todo not found"
        });
    }

    if (typeof req.body.title === "string") {
        todo.title = req.body.title.trim();
    }

    if (typeof req.body.completed === "boolean") {
        todo.completed = req.body.completed;
    }

    res.json(todo);
});


app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = todos.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Todo not found"
        });
    }

    const deletedTodo = todos.splice(index, 1)[0];

    res.json(deletedTodo);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});