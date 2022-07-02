import './App.scss';
import './pages/Login/Login'
import { useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard'
import { BrowserRouter, Route, Switch, useParams, } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';

// const code = new URLSearchParams(window.location.search).get('code')

function App({ props }) {
  // state = {
  //   loggedIn: false,
  //   code: ""
  // }
  const [code, setCode] = useState()
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setCode(code)
  }, [code, loggedIn])

  return (
    <div className="App">
      <BrowserRouter>
        <PageHeader loggedIn={loggedIn}/>
        <Switch>
          <Route path={"/"} exact render={(props) => <HomePage setCode={setCode} code={code} props={props}/>} />
          <Route path={"/dashboard"} render={(props) => <Dashboard code={code} props={props} setLoggedIn={setLoggedIn}/>} /> 
          <Route path={"/login"} component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
