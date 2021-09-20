import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import ListPage from './pages/List';

import './App.scss';
import useApi from './hooks/api';



export default function App() {
  const {data: {lists},actions} = useApi();

  useEffect(() => {
      actions.getLists();
  }, [actions])

  return (
    <div className='app'>
      <AppDrawer lists={lists}/>

      <AppContent>
          <Switch>
            <Route exact path='/' component={ListPage}/>
            <Route exact path='/important' component={ListPage}/>
            <Route exact path='/planned' component={ListPage}/>
            <Route path='/:listId/:todoId?' component={ListPage}/>
          </Switch>
      </AppContent>
    </div>
  );
}

