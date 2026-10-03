# Task 4 Performance Optimization Report

## 1. Introduction

This project focuses on refactoring and optimizing a Todo application.

The main goals were:

- Improve readability
- Improve maintainability
- Reduce unnecessary DOM operations
- Improve filtering efficiency
- Create reusable functions

## 2. Problems Identified

The original implementation contained areas that could be improved:

1. Repeated code
2. Large functions
3. Less meaningful variable names
4. Repeated DOM manipulation
5. Unnecessary UI updates

## 3. Refactoring Changes

### Meaningful Naming

Variables and functions were renamed to clearly describe their purpose.

Example:

Old:

data

New:

todos

This makes the code easier to understand.

### Function Decomposition

Application logic was separated into smaller functions.

Examples:

loadTodos()
createTodo()
toggleTodo()
deleteTodo()
renderTodos()

This improves maintainability.

## 4. Performance Optimizations

### DocumentFragment

Multiple Todo elements are first created inside a DocumentFragment.

This reduces repeated DOM insertion operations.

### Efficient Filtering

The application uses Array.filter() to generate the visible list.

### Reduced Rendering

The UI is updated only after:

- Adding a Todo
- Updating a Todo
- Deleting a Todo
- Searching
- Changing filters

## 5. Expected Impact

| Area | Before | After |
|------|--------|-------|
| Code readability | Low | High |
| Function structure | Large functions | Small reusable functions |
| DOM updates | Multiple | Batched |
| Maintainability | Moderate | High |
| Filtering | Repeated logic | Centralized logic |

## 6. Conclusion

The refactored application is easier to understand and maintain.

The use of reusable functions, centralized filtering and
DocumentFragment-based DOM updates improves the overall structure
and performance of the application.