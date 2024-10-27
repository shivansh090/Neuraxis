import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import NeuraxisClone from './Neuraxis-clone';
import Text2ISL from './components/Text2ISL';
import './App.css';
import './tailwind.css';
import AuthPage from './components/auth';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NeuraxisClone />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path='/text2isl' element={<Text2ISL/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;