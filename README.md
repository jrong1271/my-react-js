# React + Todo

The goal of this exercise is to create a working todo list with persistent data storage.

To start with, we have a styled todo list that supports adding todos. We also have premade styles for completed todo items. Although there’s no working mechanism for “completing” a todo.

Requirements
- [x] Clicking on a todo item should toggle the “checked” state.
```
    setTodos(todos => todos.map((todo) => {
      return todo.id === id ? { ...todo, checked } : todo;
    }));
```
- [x] The todo list state should be saved and loaded from local storage.
```
const storeTodos = JSON.parse(localStorage.getItem("todos")??'');
    if (!storeTodos) {
    localStorage.setItem("todos", JSON.stringify([
      {
        id: uuid(),
        label: "Buy groceries",
        checked: false,
      },
      {
        id: uuid(),
        label: "Reboot computer",
        checked: false,
      },
      {
        id: uuid(),
        label: "Ace CoderPad interview",
        checked: true,
      },
    ]));
  }
  const [todos, setTodos] = useState<Todo[]>(storeTodos);
```
- [x] Checked items should sink to the bottom of the list automatically
```
    if (checked){
      const index = todos.findIndex((todo) => todo.id === id);
      const [todoToMove] = todos.splice(index, 1);
      todos.push(todoToMove);
    }
```

***Stretch Goals***
- [ ] Allow todos to be deleted. When you hover your mouse over a todo, an X should appear on the far right side, clicking the X should remove it from the list.
- [ ] Add hidden timestamps to todos (created_at, completed_at), these will be used for sorting
The active todos should be sorted by created_at descending
The completed todos should be sorted by completed_at ascending