import React, {useEffect, useState, useContext} from 'react';
import {Layout,SideSheet, Typography} from 'mdc-react';
import Spinner from '../../components/Spinner';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import DataContext from '../../context/data';
import TodoDetails from '../../components/TodoDetails';
import { actions } from '../../store/store';
import classNames from 'classnames';

import './index.scss';


const ListPage = ({ match }) => {
    const {state, dispatch} = useContext(DataContext)
    const [selectedTodo, setSelectedTodo] = useState(null);
    const list = state.lists.find(list => list.id === match.params.listId);

    useEffect(() => {
        if (match.params.listId) {
            actions.getListTodos(match.params.listId, dispatch);
        } else {
            actions.getTodos(dispatch);
        }
    }, [dispatch,match.params.listId]);
        
    const handleSubmit = (areaValue) => {
       actions.createTodo({
           title: areaValue,
           listId: list.id
       }, dispatch);
    };

    const handleDelete = (todoId) => {
        actions.deleteTodo(todoId, dispatch);
    };

    const handleUpdate = (todoId, data) => {
        actions.updateTodo(todoId, data, dispatch);
    };

    const handleSelect = (todo) => {
        setSelectedTodo(todo)
    }


    if(!list || !state.todos) return <Spinner/>

    return (
        <Layout id='todo-list-page' row>
            <Typography 
            className='todo-list__title'
            type='headline4'
            >{list && list.title}</Typography>
            <Layout  className='sidebar-list-page'>


                <Layout column className="mdc-side-sheet-app-content">
                    <TodoList 
                    list={list}
                    todos={state.todos}
                    onSelect={handleSelect}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    />
                    <TodoForm
                        className='todo-form'
                        onSubmit={handleSubmit}
                    />
                </Layout>

                <SideSheet
                    // open={false}
                    dismissible
                    appContentSelector=".mdc-side-sheet-app-content"
                    className={classNames({
                        'mdc-side-sheet--open': selectedTodo,
                        'mdc-side-sheet--close': !selectedTodo,
                    })}
                >
                    {selectedTodo &&
                        <TodoDetails
                            todo={selectedTodo}
                            onClose={() => setSelectedTodo(null)}
                        />
                    }
                </SideSheet>
            </Layout>
        </Layout>
    );
}

export default ListPage;