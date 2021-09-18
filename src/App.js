import React from 'react';
import { Switch, Route } from 'react-router';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import ListPage from './pages/List';

import './App.scss';
import useApi from './hooks/db';



export default function App() {
  const {data: {lists}} = useApi();
  
  return (
    <div className='app'>
      <AppDrawer lists={lists}/>

      <AppContent>
          <Switch>
            <Route path='/:listId' component={ListPage}/>
          </Switch>
      </AppContent>
    </div>
  );
}

