import React, {useContext, useEffect, useState} from 'react';
import DBContext from '../../context/db';
import Spinner from '../../components/Spinner';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import { getListTodos, createTodo, deleteTodo } from '../../api';
import './index.scss';


const ListPage = ({ match }) => {
    const [todos , setTodos] = useState([]);  
    const db = useContext(DBContext);
    const list = db.lists.find(list => list.id === match.params.listId);

    useEffect(() => {
        getListTodos(match.params.listId)
            .then(setTodos);     
    }, [db, match.params.listId])
        
    const handleSubmit = (areaValue) => {
       createTodo({
           title: areaValue,
           listId: list.id
       })
       .then(todo => setTodos([...todos, todo]))
    }

    const handleDelete = (todoId) => {
        deleteTodo(todoId).then(todoId => {
            setTodos([...todos.filter(t => t.id !== todoId)])
        })
    }

    if(!list || !todos) return <Spinner/>

    return (
        <div id='todo-list-page'>
            <TodoList 
            list={list}
            todos={todos}
            onDelete={handleDelete}
            />
            <TodoForm
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default ListPage;