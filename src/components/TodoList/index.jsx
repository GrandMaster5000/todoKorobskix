import React, {useContext, useEffect, useState} from 'react';
import DBContext from '../../context/db';

const TodoList = ({match}) => {

    const [todos , setTodos] = useState([]);

    const db = useContext(DBContext);
    
    useEffect(() => {
        db.get('todos')(collection => 
            collection.where('listId', '==', match.params.listId))
        .then(setTodos);

    }, [db, match.params.listId])
    return (
        <ul> 
            {todos.map(t => (
                <li key={t.id}>{t.title}</li>
            ))}
        </ul>
    );
}

export default TodoList;