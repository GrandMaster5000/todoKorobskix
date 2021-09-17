import React, { useState } from 'react';
import {
    List,ListItem
} from 'mdc-react';
import './index.scss';


const TodoForm = ({ onSubmit }) => {
    const [areaValue, setAreaValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onSubmit(areaValue);
        setAreaValue('');
    }

    const handleKeyDown = (e) => {
        if(e.code === 'Enter') {
            e.preventDefault();
            onSubmit(areaValue);
            setAreaValue('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            <List>
                <ListItem>    
                   <textarea 
                   className='todo-list-textarea' 
                   placeholder='Что нужно сделать...'
                   onChange={e => setAreaValue(e.target.value)}
                   onKeyDown={handleKeyDown}
                   value={areaValue}
                   />
                </ListItem>
            </List>
        </form>
    );
}

export default TodoForm;