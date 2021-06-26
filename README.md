# **TODO APP**

A todo application that is build on the idea, of keeping the data close to the user.

---

This is a **ReactJS** app utilizes the **localbase** package to store all the data in the IndexedDB inside the browser.

Data inside the database is structured in the following manner

### Collections

The top level structure is a **collection**. It contains a number of **lists** that the user deems to belong together.

### Lists

Lists contain a collection of **tasks** aka **todos**

### Tasks / todos

**Tasks/todos** come in the form of normal **tasks** or **subtasks**. A task can contain as many **subtasks** as needed. 

*Subtasks themselves cannot contain any subtasks.*
