import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import EntranceLogin from './Components/EntranceLogin';
import EntranceRegister from './Components/EntranceRegister';
import Entry from './Components/Entry';

const App = () => {
   const mainUser = () => {
    const token = sessionStorage.getItem('token')
    return token > '' ? true : false
  }
  return (
    <div className="App">
      <div>
        <Switch>
          <Route path='/login'>{mainUser() ? (<Redirect from="/login" to="/entry" />) : (<EntranceLogin />)}
          </Route> 
          <Route path='/register' component= { EntranceRegister }/>
          <Route path='/entry' component= { Entry }></Route>
          <Redirect from='/' to='/login'/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
