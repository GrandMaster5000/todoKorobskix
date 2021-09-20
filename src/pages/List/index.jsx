import React, {useEffect, useState} from 'react';
import {Layout} from 'mdc-react';
import Spinner from '../../components/Spinner';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import useApi from '../../hooks/api';
import TodoDetails from '../../components/TodoDetaild';

import './index.scss';


const ListPage = ({ match }) => {
    const {data: {lists, todos}, actions} = useApi();
    const [selectedTodo, setSelectedTodo] = useState(null);
    const list = lists.find(list => list.id === match.params.listId);

    useEffect(() => {
        if (match.params.listId) {
            actions.getListTodos(match.params.listId);
        } else {
            actions.getTodos();
        }
    }, [actions, match.params.listId]);
        
    const handleSubmit = (areaValue) => {
       actions.createTodo({
           title: areaValue,
           listId: list.id
       });
    };

    const handleDelete = (todoId) => {
        actions.deleteTodo(todoId);
    };

    const handleUpdate = (todoId, data) => {
        actions.updateTodo(todoId, data);
    };

    const handleSelect = (todo) => {
        setSelectedTodo(todo)
    }

    if(!list || !todos) return <Spinner/>

    return (
        <Layout id='todo-list-page' row>
            <Layout row>
                <TodoList 
                list={list}
                todos={todos}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                />
                <TodoForm
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