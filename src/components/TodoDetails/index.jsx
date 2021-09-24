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
import moment from 'moment';


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

                
                <Layout className='todo-details-layout textarea-layout'>    
                        <TextArea
                            onChange={(e) => setTextAreaValue(e.target.value)}
                            value={textareaValue}
                            placeholder={todo.title}
                        />
                    <label className='text-area-label' htmlFor="textarea">Название</label>
                </Layout>

                <Layout className='todo-details-layout textarea-layout'>    
                    <TextArea
                        type='datetime-local'
                        onChange={(e) => {}}
                        value={textareaValue}
                        placeholder={todo.dueDate 
                        ? moment(todo.dueDate.seconds * 1000).format('YYYY-MM-DD') 
                        : 'Добавить дату'}
                    />
                    <label className='text-area-label' htmlFor="textarea">Дата выполнения</label>
                </Layout>

                <section className="todo-steps">
                    <Typography variant="subtitle2" noMargin>Шаги</Typography>



                    {todo.dueDate ? 
                        <Typography>{todo.dueDate.seconds}</Typography>
                        :
                        <Typography></Typography>
                    }

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