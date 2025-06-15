import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import CreateRecipe from './components/CreateRecipe';
import ErrorNotFound from './components/ErrorNotFound';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/404notFound" element={<ErrorNotFound />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<CreateRecipe />} />
      </Routes>
    </div>
  );
}

export default App;