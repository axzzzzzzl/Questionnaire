import './App.css';
import React from "react";
import { Editor } from './pages/Editor';
import { Route, Routes } from 'react-router-dom';

function App() {
  return(
    <Routes>
      <Route path="/Questionnaire/" element={<Editor />} />
      <Route path="/Questionnaire/hello" element={<Hello />} />
    </Routes>
  )
}
const Hello = () => {
  return <div>Hello React</div>
}

export default App;