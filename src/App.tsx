import React, {useCallback, useState, useEffect} from "react";
import {v4 as uuid} from "uuid";
import styled from "@emotion/styled";
import {AddInput} from "./components/AddInput.tsx";
import {TodoItem} from "./components/TodoItem.tsx";
import {TodoList} from "./components/TodoList.tsx";
import {Header} from "./components/Header.tsx";

const Wrapper = styled.div({display: "flex", flexDirection: "column", alignItems: "center", width: 300});

/**
* This is the initial todo state.
* Instead of loading this data on every reload,
* we should save the todo state to local storage,
* and restore on page load. This will give us
* persistent storage.
*/

function App() {

    const storeTodos = JSON.parse(localStorage.getItem("todos") ?? '');
    if (!storeTodos) {
        localStorage.setItem("todos", JSON.stringify([
            {
                id: uuid(),
                label: "Buy groceries",
                checked: false
            }, {
                id: uuid(),
                label: "Reboot computer",
                checked: false
            }, {
                id: uuid(),
                label: "Ace CoderPad interview",
                checked: true
            }
        ]));
    }
    const [todos,
        setTodos] = useState < Todo[] > (storeTodos);

    const addTodo = useCallback((label : string) => {
        setTodos((prev) => [
            {
                id: uuid(),
                label,
                checked: false
            },
            ...prev
        ]);
    }, []);

    const handleChange = useCallback((id : string, checked : boolean) => {
        // handle the check/uncheck logic
        if (checked) {
            const index = todos.findIndex((todo) => todo.id === id);
            const [todoToMove] = todos.splice(index, 1);
            todos.push(todoToMove);
        }
        setTodos(todos => todos.map((todo) => {
            return todo.id === id
                ? {
                    ...todo,
                    checked
                }
                : todo;
        }))
    }, [todos]);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <Wrapper>
            <Header>Todo List</Header>
            <AddInput onAdd={addTodo}/>
            <TodoList>
                {todos.map((todo) => (<TodoItem {...todo} onChange={handleChange}/>))}
            </TodoList>
        </Wrapper>
    );
}

export default App;