import './App.scss';
import './pages/Login/Login'
import { useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./hooks/useAuth";
import useQuery from "./hooks/useQuery"
import Playlists from "./pages/Playlists/Playlists"
import SinglePlaylist from './pages/SinglePlaylist/SinglePlaylist';
import BuildPlaylist from './pages/BuildPlaylist/BuildPlaylist';

const { REACT_APP_CLIENT_ID } = process.env;

const spotifyApi = new SpotifyWebApi({
  clientId: REACT_APP_CLIENT_ID,
})

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')
  const [playlistResults, setPlaylistResults] = useState([])

  const query = useQuery()

  const code = query.get("code")

  const accessToken = useAuth(code)
  
  useEffect(() => {
    if (!accessToken) return
    setLoggedIn(true)
    spotifyApi.setAccessToken(accessToken)
    spotifyApi.getMe().then((res) => {
      setUserId(res.body.id)
    })
    if(userId) {
      spotifyApi.getUserPlaylists(userId).then((res) => {
          setPlaylistResults(res.body.items.map(playlist => {
            return ({
                  owner: playlist.owner.id,
                  title: playlist.name,
                  id: playlist.id,
                  playlistUrl: playlist.images[0]
              })
          }))
      })
    }
  }, [accessToken, userId])

  return (
    <div className="App">
        <PageHeader loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Dashboard accessToken={accessToken} setLoggedIn={setLoggedIn} spotifyApi={spotifyApi} playlistResults={playlistResults} userId={userId}/>
        <Routes>
          <Route path="/" element={<HomePage spotifyApi={spotifyApi} accessToken={accessToken} loggedIn={loggedIn}/>} />
          <Route path="login" element={<Login />} />
          <Route path="playlists" element={<Playlists playlistResults={playlistResults} accessToken={accessToken} spotifyApi={spotifyApi} userId={userId}/>} />
          <Route path="playlists/:playlistid" element={<SinglePlaylist accessToken={accessToken} spotifyApi={spotifyApi} userId={userId}/>} />
          <Route path="playlists/build" element={<BuildPlaylist accessToken={accessToken} spotifyApi={spotifyApi} userId={userId}/>} />
        </Routes>
    </div>
  );
}

export default App;
