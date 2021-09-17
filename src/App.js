import React, {useEffect, useState} from 'react';
import { Switch, Route } from 'react-router';

import {getList} from './api';
import DBContext from './context/db';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import ListPage from './pages/List';

import './App.scss';



export default function App() {
  const [lists , setLists] = useState([]);

  useEffect(() => {
    getList()
    .then(setLists);
  }, [])

  return (
    <DBContext.Provider value={{lists}}>
      <div className='app'>
        <AppDrawer lists={lists}/>

        <AppContent>
            <Switch>
              <Route path='/:listId' component={ListPage}/>
            </Switch>
        </AppContent>
      </div>
    </DBContext.Provider>
  );
}

