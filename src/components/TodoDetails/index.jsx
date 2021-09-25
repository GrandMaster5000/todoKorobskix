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
import useStore from '../../hooks/store';


const TodoDetails = ({todo, onClose ,className, ...props}) => {
    const [textareaValueName, setTextAreaValueName] = useState('');
    const [textareaValueStep, setTextAreaValueStep] = useState('');
    const {state,actions} = useStore();

    const handleName = (e) => {
        if(e.code === 'Enter') {
            e.preventDefault();
            actions.updateTodo(todo.id, { title: textareaValueName})
        }
    }
  
    const handleStep = (e) => {
        if(e.code === 'Enter') {
            e.preventDefault();
            actions.updateTodo(todo.id,
            {steps: [...todo.steps, {completed: false, title: textareaValueStep}]});
            setTextAreaValueStep('');
        }
    }

    const handleCheckChange = (title) => {
        actions.updateTodo(todo.id, {steps: todo.steps.map(s => {
            if(s.title === title) {
                return {title: s.title, completed: !s.completed} 
            }
            return s;
        })})
    }

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
                            onChange={(e) => setTextAreaValueName(e.target.value)}
                            value={textareaValueName}
                            placeholder={todo.title}
                            onKeyDown={handleName}
                        />
                    <label className='text-area-label' htmlFor="textarea">Название</label>
                </Layout>

                <Layout className='todo-details-layout textarea-layout'>    
                    <TextArea
                        type='datetime-local'
                        onChange={(e) => {}}
                        value={textareaValueName}
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
                                            className='step-checkbox'
                                            onChange={() => handleCheckChange(step.title)}
                                        />
                                    </ListItemGraphic>

                                    <ListItemText>{step.title}</ListItemText>
                                </ListItem>    
                            )}
                        </List>
                    }

                </section>
                <Layout className='todo-details-layout textarea-layout'>    
                    <TextArea
                        type='datetime-local'
                        onChange={(e) => setTextAreaValueStep(e.target.value)}
                        value={textareaValueStep}
                        placeholder='Добавить шаг'
                        onKeyDown={handleStep}
                    />
                    <label className='text-area-label' htmlFor="textarea">Название шага</label>
                </Layout>

            </aside>
        </>
    );
}

export default TodoDetails;