import React from 'react';
import {
    List
} from 'mdc-react'
import TodoListItem from '../TodoListItem';
import './TodoList.scss';


const TodoList = ({list, todos, onDelete, onUpdate, onSelect}) => {
    return (
        <>
            <div className='todo-list'>

                <List className='todo-list__items'> 
                    {todos.map(t => (
                        <TodoListItem 
                        key={t.id}
                        todo={t}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onSelect={onSelect}
                        />
                    ))}
                </List>
            </div>
        </>
    );
}

export default TodoList;