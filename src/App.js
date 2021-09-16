import React, {useEffect, useState} from 'react';
import {get} from './api';
import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';

import './App.scss';



export default function App() {
  const [lists , setLists] = useState([]);
  const [todos , setTodos] = useState([]);


  useEffect(() => {
    get('todos')
    .then(setTodos);
    
    get('lists')
    .then(setLists);
  }, [])
  return (
    <div className='app'>
      <AppDrawer lists={lists}/>

      <AppContent>
          <ul>
              {todos.map(t => (
                  <li key={t.id}>{t.title}</li>
              ))}
              
          </ul>
      </AppContent>
    </div>
  );
}

