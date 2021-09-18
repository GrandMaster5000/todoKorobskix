import React, {useEffect} from 'react';
import Spinner from '../../components/Spinner';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import useApi from '../../hooks/api';
import './index.scss';


const ListPage = ({ match }) => {
    const {data: {lists, todos}, actions} = useApi();
    const list = lists.find(list => list.id === match.params.listId);

    useEffect(() => {
        actions.getListTodos(match.params.listId)    
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
    }

    if(!list || !todos) return <Spinner/>

    return (
        <div id='todo-list-page'>
            <TodoList 
            list={list}
            todos={todos}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            />
            <TodoForm
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default ListPage;