import * as api from '../api';

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_LISTS': 
            return {
                ...state,
                lists: state.lists.concat(action.payload.lists)
            };
        case 'GET_TODOS': 
            return {
                ...state,
                todos: state.todos.concat(action.payload.todos)
            };
        case 'GET_LIST_TODOS': 
            return {
                ...state,
                todos: action.payload.todos
            };
        case 'CREATE_TODO': 
            return {
                ...state,
                todos: state.todos.push(action.payload.todo)
            };
        case 'UPDATE_TODO': 
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo.id === action.payload.todo.id) {
                        return {
                            ...todo,
                            ...action.payload.todo
                        }
                    }

                    return todo
                })
            }
        case 'DELETE_TODO': 
            return {
                ...state,
                todos: state.todos.filter(todo => todo !== 
                action.payload.todoId)
            }
        default :
            return state;
    }
}

export const initialState = {
    lists: [],
    todos: []
}

export const getLists = (dispatch) => {
    return api.getList()
        .then(lists => dispatch({
            type: 'GET_LISTS',
            payload: {lists}
        }));
}

export const getTodos = (dispatch) => {
    return api.getTodos()
        .then(todos => dispatch({
            type: 'GET_TODOS',
            payload: {todos}
        }));
}

export const getListTodos = (listId, dispatch) => {
    return api.getListTodos(listId)
        .then(todos => dispatch({
            type: 'GET_LIST_TODOS',
            payload: {
                todos
            }
        }));
}

export const createTodo = (data, dispatch) => {
    return api.createTodo(data)
        .then(todo => dispatch({
            type: 'CREATE_TODO',
            payload: {
                todo
            }
        }));
} 

export const deleteTodo = (todoId, dispatch) => {
    return api.deleteTodo(todoId)
        .then(todoId => dispatch({
            type: 'DELETE_TODO',
            payload: {
                todoId
            }
        }))
}

export const updateTodo = (todoId, data, dispatch) => {
    return api.updateTodo(todoId, data)
        .then(todo => dispatch({
            type: 'UPDATE_TODO',
            payload: {
                todoId,
                todo
            }
        }));
}

export const actions = {
    getLists,
    getTodos,
    getListTodos,
    createTodo,
    deleteTodo,
    updateTodo
};