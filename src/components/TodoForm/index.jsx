import React, { useState } from 'react';
import {
    List,ListItem,IconButton,Icon
} from 'mdc-react';
import './index.scss';
import Alert from '../Alert';


const TodoForm = ({ onSubmit }) => {
    const [areaValue, setAreaValue] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(areaValue.replace(/\s/g, '') === '') {
            setError('Введите название задачи!');
            setTimeout(() => setError(undefined), 4000);
            return;
        }
        onSubmit(areaValue);
        setAreaValue('');
        setIsSubmit(true);
        setTimeout(() => setIsSubmit(false), 5000);
    }

    const handleKeyDown = (e) => {
        if(e.code === 'Enter') {
           handleSubmit(e);
        }
    }

    return (
        <>
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
                        <IconButton tabIndex={0} className='done-button'>
                            <Icon className='done-button-icon'>done</Icon>
                        </IconButton>
                    </ListItem>
                </List>
            </form>
            {isSubmit && <Alert 
            onClose={() => setIsSubmit(false)} 
            type='success' >Задача создана &#128512;</Alert>}

            {error && <Alert 
            onClose={() => setError(undefined)} 
            type='danger' >{error} &#129324;</Alert>}
        </>
    );
}

export default TodoForm;