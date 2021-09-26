import React, { useEffect } from 'react';
import {
    ListItem, ListItemGraphic, ListItemText,ListItemMeta,
    Checkbox,
    Icon, IconButton
} from 'mdc-react'
import './index.scss';


const TodoListItem = ({todo, onDelete, onUpdate, onSelect}) => {
    useEffect(() => {
        onSelect(todo);
    }, [todo.steps])
    
    const handleChange = () => {
        onUpdate(todo.id, {completed: !todo.completed});
    }
    return (
        <ListItem className="todo-list-item">
            <ListItemGraphic>
                <Checkbox 
                checked={todo.completed}
                onChange={handleChange}
                />
            </ListItemGraphic>

            <ListItemText onClick={() => onSelect(todo)}>{todo.title}</ListItemText>
            <ListItemMeta className='meta-list'>
                <IconButton onClick={() => onDelete(todo.id)}>
                    <Icon className='list-item-icon list-item-icon-delete'>delete</Icon>
                </IconButton>

                <IconButton onClick={() => onUpdate(todo.id, { important: !todo.important})}>
                    <Icon className='list-item-icon list-item-icon-star'>{todo.important ? 'star' : 'star_outline'}</Icon>
                </IconButton>
            </ListItemMeta>
        </ListItem>
        
    );
}

export default TodoListItem;