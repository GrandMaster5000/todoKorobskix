import React, {useEffect, useState} from 'react';
import {Layout,SideSheet} from 'mdc-react';
import Spinner from '../../components/Spinner';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import TodoDetails from '../../components/TodoDetails';
import classNames from 'classnames';
import useStore from '../../hooks/store';
import './index.scss';
import PageHeader from '../../components/PageHeader';


const ListPage = ({ match }) => {
    const {state, actions} = useStore();
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [sortBy, setSortBy] = useState('title');
    const path = match.path;

    const list = state.lists.find(list => list.id === match.params.listId) 
    || { title: 'Задачи'};

    const getTodosByFilter = ({
        '/': todos => todos,
        '/important': todos => {
            list.title = 'Важные'
            return todos.filter(todo => todo.important)
        },
        '/planned': todos => {
            list.title = 'Запланированные'
           return todos.filter(todo => todo.dueDate)
        }
    });

    const getTodosByList = (listId, todos) => todos.filter(todo => todo.listId === list.id);

    const sortFn = {
        title: (a, b) => a.title.localeCompare(b.title),
        important: (a, b) => b.important - a.important,
        completed: (a, b) => b.completed - a.completed
    };

    const todos = match.params.listId ? getTodosByList(match.params.listId, state.todos) : getTodosByFilter[path](state.todos);
    const sortedTodos = sortBy ?  todos.slice().sort(sortFn[sortBy]) : todos;

    useEffect(() => {
        setSelectedTodo(null);
    }, [match.path, match.params.listId]);
        
    const handleSubmit = (areaValue) => {
       actions.createTodo({
           title: areaValue,
           userId: state.user.uid,
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

    const handleSortChange = (sort) => {
        setSortBy(sort)
    }

    if(!list || !todos) return <Spinner/>

    return (
        <Layout id='todo-list-page' row>
            <PageHeader 
            list={list}
            onSortChange={handleSortChange}
            />

            <Layout  className='sidebar-list-page'>
                <Layout column className="mdc-side-sheet-app-content">
                    <TodoList 
                    list={list}
                    todos={sortedTodos}
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