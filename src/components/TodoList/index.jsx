import React from 'react';
import {
    Typography,
    List
} from 'mdc-react'
import TodoListItem from '../TodoListItem';
import './TodoList.scss';


const TodoList = ({list, todos, onDelete, onUpdate}) => {
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
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    />
                ))}
            </List>
        </div>
    );
}

export default TodoList;