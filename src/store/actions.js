import * as api from '../api';

export const loginUser = (login, password, dispatch) => {
    return api.loginUser(login, password);
}

export function signOutUser() {
    return api.signOutUser().then(() => ({}));
}

export function registerUser(email, password) {
    return api.registerUser(email, password).then(() => ({}));
}

export const getLists = (userId) => {
    return api.getList(userId)
        .then(lists => ({
            type: 'GET_LISTS',
            payload: {lists}
        }));
}

export const getTodos = (userId) => {
    return api.getTodos(userId)
        .then(todos => ({
            type: 'GET_TODOS',
            payload: {todos}
        }));
}

export const getListTodos = (listId) => {
    return api.getListTodos(listId)
        .then(todos => ({
            type: 'GET_LIST_TODOS',
            payload: {
                todos
            }
        }));
}

export const createTodo = (data ) => {
    return api.createTodo(data)
        .then(todo => ({
            type: 'CREATE_TODO',
            payload: {
                todo
            }
        }));
} 

export const deleteTodo = (todoId) => {
    return api.deleteTodo(todoId)
        .then(todoId => ({
            type: 'DELETE_TODO',
            payload: {
                todoId
            }
        }))
}

export const updateTodo = (todoId, data) => {
    return api.updateTodo(todoId, data)
        .then(todo => ({
            type: 'UPDATE_TODO',
            payload: {
                todoId,
                todo
            }
        }));
}


export function setAuth() {
    return dispatch => api.initAuth(user => {
        return user ? dispatch({
            type: 'LOGIN_USER',
            payload: {
                user
            }
        }) : dispatch({
            type: 'LOGOUT_USER'
        });
    });
}


export const actions = {
    getLists,
    getTodos,
    getListTodos,
    createTodo,
    deleteTodo,
    updateTodo,
    setAuth,
    loginUser,
    signOutUser,
    registerUser
};


