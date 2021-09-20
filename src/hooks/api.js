import * as api from '../api';
import {useEffect, useState, useMemo} from 'react'


export default function useApi() {
  const [lists , setLists] = useState([]);
  const [todos , setTodos] = useState([]);

    useEffect(() => {
        api.getList()
            .then(setLists);
    }, []);

    const getLists = () => {
        return api.getList()
            .then(setLists)
    }

    const getTodos = () => {
        return api.getTodos()
            .then(setTodos);
    }

    const getListTodos = (listId) => {
        return api.getListTodos(listId)
            .then(setTodos);
    }

    const createTodo = (data) => {
        return api.createTodo(data)
            .then(todo => setTodos([...todos, todo]));
    } 

    const deleteTodo = (todoId) => {
        return api.deleteTodo(todoId)
            .then(todoId => {
                setTodos([...todos.filter(t => t.id !== todoId)]);
            })
    }

    const updateTodo = (todoId, data) => {
        return api.updateTodo(todoId, data)
            .then(data => {
                setTodos([...todos.map(t => t.id !== todoId ? ({...t, ...data})
                : t)]);
            });
    }
    
    const actions = useMemo(() => ({
        getLists,
        getTodos,
        getListTodos,
        createTodo,
        deleteTodo,
        updateTodo
    }), [])

    return {
        data: {
            lists,
            todos
        },
        actions
    };
}