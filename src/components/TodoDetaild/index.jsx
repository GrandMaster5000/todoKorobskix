import React, { useState } from 'react'
import {
    Icon,
    IconButton,
    Typography,
    Layout,
    Checkbox, 
    List,
    ListItem,
    ListItemText
} from 'mdc-react';
import classNames from 'classnames';
import './index.scss';
import TextArea from '../Textarea';


const TodoDetails = ({todo, onClose ,className, ...props}) => {
    const [textareaValue, setTextAreaValue] = useState('');
    console.log(todo);
    return (
        <aside className={classNames(className, 'todo-details')} {...props}>
            <Layout className='todo-details-layout'>
                <Typography>Детали задачи</Typography>

                <IconButton onClick={onClose}>
                    <Icon>close</Icon>
                </IconButton>
            </Layout>
            
            <Layout>
                <Layout className='todo-details-layout'>
                    <Checkbox
                        checked={todo.completed}
                        onChange={() => {}}
                    />
                    <TextArea
                        onChange={(e) => setTextAreaValue(e.target.value)}
                        value={textareaValue}
                        placeholder='Отредактируй'
                    />
                </Layout>

                {todo.steps && todo.steps.length > 0 &&
                    <List>
                        {todo.steps.map((step, i) => (
                            <ListItem key={i}>
                                <ListItemText>{step}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                }
            </Layout>
        </aside>
    );
}

export default TodoDetails;