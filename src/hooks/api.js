import {useEffect, useState, useMemo} from 'react'


export default function useApi() {
  const [lists , setLists] = useState([]);
  const [todos , setTodos] = useState([]);

    useEffect(() => {
        api.getList()
            .then(setLists);
    }, []);

   
    
    const actions = useMemo(() => ({
        getLists,
        getTodos,
        getListTodos,
        createTodo,
        deleteTodo,
        updateTodo
    }), [])

    return {
        data: {
            lists,
            todos
        },
        actions
    };
}