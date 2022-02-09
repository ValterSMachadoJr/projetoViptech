//import { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './componentes/Header';
import React from 'react';
import CustomRoutes from "./componentes/routes";
import { BrowserRouter } from 'react-router-dom'
import Navegacao from './componentes/paginas/navegacao';
//import { count } from 'console'


function App() {
  
  
  return (
    <>
    <div className='App'>
       <Header/> 
    </div>  
       <div>  
        <BrowserRouter>
            <Navegacao/>
            <CustomRoutes/>
          {/*<h1 className="container"> fazer container </h1> */}
       </BrowserRouter>
     </div>
    </>
  )
}

export default App
