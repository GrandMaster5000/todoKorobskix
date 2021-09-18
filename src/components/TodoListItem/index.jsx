import React from 'react';
import {
    ListItem, ListItemGraphic, ListItemText,ListItemMeta,
    Checkbox,
    Icon, IconButton
} from 'mdc-react'
import './index.scss';


const TodoListItem = ({todo, onCompleteChange, onDelete}) => {
    return (
        <ListItem className="todo-list-item">
            <ListItemGraphic>
                <Checkbox 
                checked={todo.completed}
                onChange={onCompleteChange}
                />
            </ListItemGraphic>

            <ListItemText>{todo.title}</ListItemText>
            <ListItemMeta className='meta-list'>
                <IconButton onClick={() => onDelete(todo.id)}>
                    <Icon className='list-item-icon'>delete</Icon>
                </IconButton>
            </ListItemMeta>
        </ListItem>
        
    );
}

export default TodoListItem;