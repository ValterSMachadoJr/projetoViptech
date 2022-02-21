//import { useState } from 'react';
//import logo from './logo.svg';
import "./App.css";
import Header from "./componentes/Header";
import React, { useEffect, useState } from "react";
import CustomRoutes from "./componentes/routes";
import { BrowserRouter } from "react-router-dom";
import { WelcomeMessageDTO } from "classes/WelcomeMessageDTO";
import { NodeAPI } from "services/Service";
import { AxiosResponse } from "axios";

//import { count } from 'console'

function App() {
  const [message, setMessage] = useState<string>("");

  async function getWelcomeMessage() {
    try {
      const welcomeMessage: AxiosResponse<WelcomeMessageDTO> =
        await NodeAPI.get(`${process.env.REACT_APP_API_URL}`);
      console.log(welcomeMessage.data.mensagem);
      setMessage(welcomeMessage.data.mensagem);
    } catch (error) {
      console.log(error);
      setMessage("Erro na chamada da API");
    }
  }

  useEffect(() => {
    console.log("Renderizei meu computador");
    getWelcomeMessage();
  }, []);

  return (
    <>
      <div className="App">
        <Header />
      </div>
      <div>
        <BrowserRouter>
          <CustomRoutes />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
