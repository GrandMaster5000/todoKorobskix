import React, { useState } from 'react'
import {
    Icon,
    IconButton,
    Typography,
    Layout,
    Checkbox, 
    List,
    ListItem,
    ListItemText,
    ListItemGraphic
} from 'mdc-react';
import classNames from 'classnames';
import './index.scss';
import TextArea from '../Textarea';


const TodoDetails = ({todo, onClose ,className, ...props}) => {
    const [textareaValue, setTextAreaValue] = useState('');
    
    return (
        <>
            <aside className={classNames('todo-details', className)} {...props}>
                <Layout className='todo-details-layout'>
                    <Typography>Детали задачи</Typography>

                    <IconButton onClick={onClose}>
                        <Icon>close</Icon>
                    </IconButton>
                </Layout>

                
                <Layout className='todo-details-layout'>    
                        <TextArea
                            onChange={(e) => setTextAreaValue(e.target.value)}
                            value={textareaValue}
                            placeholder={todo.title}
                        />
                    <label className='text-area-label' htmlFor="textarea">Название</label>
                </Layout>

                <section className="todo-steps">
                    <Typography variant="subtitle2" noMargin>Шаги</Typography>

                    {todo && todo.steps && todo.steps.length > 0 &&
                        <List className="todo-step-list" dense>
                            {todo.steps.map((step, index) =>
                                <ListItem key={index}>
                                    <ListItemGraphic>
                                        <Checkbox
                                            checked={step.completed}
                                        />
                                    </ListItemGraphic>

                                    <ListItemText>{step.title}</ListItemText>
                                </ListItem>    
                            )}
                        </List>
                    }
                </section>
            </aside>
        </>
    );
}

export default TodoDetails;