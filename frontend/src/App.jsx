import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import "./components/NotesLayout.jsx"
import MainUI from "./components/MainUI.jsx";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Check from "./components/Check.jsx";
function App() {
  return (
    <>
    <BrowserRouter>


  <Header/>

    <Routes>


      <Route path="/" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>

      <Route path="/protected" element={<Check/>}>

        <Route path="home" element={<MainUI/>}/>

      </Route>

    </Routes>
    
    
    </BrowserRouter>

    </>
  );
}

export default App;
