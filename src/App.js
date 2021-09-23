import React, { useEffect, useReducer } from 'react';
import { Switch, Route } from 'react-router';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import ListPage from './pages/List';

import './App.scss';
import DataContext from './context/data';
import { reducer, initialState, actions } from './store/store';
import Auth from './pages/Auth';



export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
      actions.getLists(dispatch);
      actions.setAuth(dispatch);
  }, []);

  if(!state.user) {
      return <Route component={Auth}/>
  }

  return (
    <DataContext.Provider value={{state, dispatch}}>
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
    </DataContext.Provider>
  );
}

