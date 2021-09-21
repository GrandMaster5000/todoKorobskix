import React, { useEffect, useContext, useReducer } from 'react';
import { Switch, Route } from 'react-router';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import ListPage from './pages/List';

import './App.scss';
import DataContext from './context/data';
import { reducer, initialState, actions } from './store/store';



export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
      console.log(actions);
      actions.getLists(dispatch);
  }, [])

  return (
    <DataContext.Provider value={{state, dispatch}}>
      <div className='app'>
        <AppDrawer lists={state.lists}/>

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

