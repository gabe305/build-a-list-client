import './App.css';
import './components/Login/Login'
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    <div className="App">
    {code ? <Dashboard code={code} /> :
      <Login />
    }
    </div>
  );
}

export default App;
