import './App.scss';
import './pages/Login/Login'
import { useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./utils/useAuth";
import useQuery from "./utils/useQuery"
import Playlists from "./pages/Playlists/Playlists"

const { REACT_APP_CLIENT_ID } = process.env;

const spotifyApi = new SpotifyWebApi({
  clientId: REACT_APP_CLIENT_ID,
})

function App() {
  const [loggedIn, setLoggedIn] = useState()
  const [userId, setUserId] = useState('')
  
  const query = useQuery()

  const code = query.get("code")

  const accessToken = useAuth(code)

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
    spotifyApi.getMe().then((res) => {
      console.log(res)
      setUserId(res.body.id)
    }).catch(err => console.log(err))
  }, [accessToken])

  return (
    <div className="App">
        <PageHeader loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Dashboard accessToken={accessToken} setLoggedIn={setLoggedIn} spotifyApi={spotifyApi}/>
        <Routes>
          <Route path="/" element={<HomePage spotifyApi={spotifyApi} accessToken={accessToken}/>} />
          <Route path="login" element={<Login />} />
          <Route path="playlists" element={<Playlists accessToken={accessToken} spotifyApi={spotifyApi} userId={userId}/>} />
        </Routes>
    </div>
  );
}

export default App;
