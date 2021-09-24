import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import ListPage from './pages/List';

import './App.scss';
import Auth from './pages/Auth';
import useStore from './hooks/store';



export default function App() {
  const {state, actions} = useStore();

  useEffect(() => {
    actions.setAuth();
  }, []);
  
  useEffect(() => {
    if(state.user) {
      actions.getLists(state.user.uid);
      actions.getTodos(state.user.uid);
    }
  }, [state.user])

  if(!state.user) {
      return <Route component={Auth}/>
  }

  return (
      <div className='app'>
        <AppDrawer lists={state.lists} todos={state.todos}/>

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

