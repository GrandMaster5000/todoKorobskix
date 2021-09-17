import React, {useContext, useEffect, useState} from 'react';
import {
    Typography,
    List,
    Spinner
} from 'mdc-react'
import DBContext from '../../context/db';
import TodoListItem from '../TodoListItem';
import './TodoList.scss';


const TodoList = ({match}) => {
    const [todos , setTodos] = useState([]);

    const db = useContext(DBContext);
    const list = db.lists.find(list => list.id === match.params.listId);
    
    useEffect(() => {
        db.get('todos')(collection => 
            collection.where('listId', '==', match.params.listId))
        .then(setTodos);

    }, [db, match.params.listId])

    
    return (
        <div className='todo-list'>
            <Typography 
            className='todo-list__title'
            type='headline4'
            >{list && list.title}</Typography>

            <List className='todo-list__items'> 
                {todos.map(t => (
                    <TodoListItem 
                    key={t.id}
                    todo={t}
                    />
                ))}
            </List>
        </div>
    );
}

export default TodoList;