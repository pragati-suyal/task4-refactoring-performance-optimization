# Task 4 - Code Refactoring and Performance Optimization

## Project

Refactored Todo Application

## Objective

The objective of this project is to refactor an open-source Todo
application to improve code readability, maintainability and
performance.

## Technologies

- Node.js
- Express.js
- HTML
- CSS
- JavaScript

## Improvements

### 1. Improved Naming

Generic variable names were replaced with meaningful names such as:

- todoInput
- visibleTodos
- searchTerm
- completed
- deleteTodo

### 2. Function Decomposition

Large operations were separated into reusable functions:

- loadTodos()
- createTodo()
- toggleTodo()
- deleteTodo()
- getVisibleTodos()
- renderTodos()

### 3. Reduced DOM Operations

DocumentFragment is used to build multiple Todo elements before
inserting them into the DOM.

### 4. Efficient Filtering

Array filter() is used to efficiently generate the visible Todo list.

### 5. Reduced Unnecessary Rendering

The interface is rendered only after relevant data changes.

## How to Run

Install dependencies:

npm install

Start the application:

npm start

Open:

http://localhost:3000

## Conclusion

The refactored version has a cleaner structure, meaningful naming,
smaller functions and optimized DOM manipulation.