import React from 'react';
import {
    ListItem, ListItemGraphic, ListItemText,
    Checkbox
} from 'mdc-react'


const TodoListItem = ({todo, onCompleteChange}) => {


    
    console.log(todo);
    return (
        <ListItem>
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