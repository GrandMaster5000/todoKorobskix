import React, {useEffect, useState, useContext} from 'react';
import {Layout} from 'mdc-react';
import Spinner from '../../components/Spinner';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import DataContext from '../../context/data';
import TodoDetails from '../../components/TodoDetaild';
import { actions } from '../../store/store';

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
            <Layout row>
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

            {selectedTodo && <TodoDetails
                todo={selectedTodo}
                onClose={() => setSelectedTodo(null)}
            />}
        </Layout>
    );
}

export default ListPage;