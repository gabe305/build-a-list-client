import './App.scss';
import './pages/Login/Login'
import { useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard'
import { BrowserRouter, Route, Routes, useParams, } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';


function App() {
  const [code, setCode] = useState()
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // console.log(code)
  }, [code, loggedIn])

  return (
    <div className="App">
      <BrowserRouter>
        <PageHeader loggedIn={loggedIn}/>
        <Routes>
          <Route path="/" element={<HomePage setCode={setCode} code={code}/>} />
          <Route path="/dashboard" element={<Dashboard code={code} setLoggedIn={setLoggedIn}/>} /> 
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
