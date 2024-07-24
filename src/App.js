import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import NoteList from './NoteListEditor'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App(){

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-5">
        <Routes>
           <Route path='/' element={<LoginForm/>}/>
           <Route path='/NoteListEditor' element={<NoteList/>}/>
        </Routes>
      
      
      </div>
    </Router>
    
  );
};

export default App;