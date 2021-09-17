import React from 'react';
import {
    ListItem, ListItemGraphic, ListItemText,
    Checkbox
} from 'mdc-react'
import './index.scss';


const TodoListItem = ({todo, onCompleteChange}) => {
    return (
        <ListItem className="todo-list-item">
            <ListItemGraphic>
                <Checkbox 
                checked={todo.completed}
                onChange={onCompleteChange}
                />
            </ListItemGraphic>

            <ListItemText>{todo.title}</ListItemText>
        </ListItem>
        
    );
}

export default TodoListItem;