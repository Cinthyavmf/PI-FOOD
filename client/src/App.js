import React from 'react';
import './App.css';
import {Route, BrowserRouter as Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import CreateRecipe from './components/CreateRecipe';
import ErrorNotFound from './components/ErrorNotFound';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" exact><LandingPage/></Route> 
        <Route path="/home" exact ><Home/></Route>
        <Route path="/404notFound" exact><ErrorNotFound></ErrorNotFound></Route>
        <Route path="/home/:id"><Detail/></Route>
        <Route path="/create"><CreateRecipe/></Route>
      </Routes>
    </div>

  );
}

export default App;
