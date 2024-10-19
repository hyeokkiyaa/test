import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext'; 
import Login from './login/login';
import 'mdb-ui-kit/css/mdb.min.css';


import TransferList from './content/TransferList'; 
import UserInfo from './content/UserInfo';
import Dashboard from './content/Dashboard'; 
import Convert from './content/Convert';     
import Navbar from './UI/Navbar';

function App() {
  return (
    <UserProvider>
      <Router>
       
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/content/TransferList" element={<TransferList />} />
          <Route path='/content/Dashboard' element={<Dashboard />} />
          <Route path='/content/Convert' element={<Convert />} />
          <Route path='/content/UserInfo' element={<UserInfo />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;


