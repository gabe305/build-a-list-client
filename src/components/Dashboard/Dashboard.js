import useAuth from "../../utils/useAuth";
import { useEffect, useState } from "react"
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../TrackSearchResult/TrackSearchResult";
import Player from "../Player/Player";
import { useNavigate } from "react-router-dom";

const { REACT_APP_CLIENT_ID } = process.env;

const spotifyApi = new SpotifyWebApi({
    clientId: REACT_APP_CLIENT_ID,
})

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=d2f4a0a165d94bcabde9f3bf08fcb7f3&response_type=code&redirect_uri=http://localhost:3000/dashboard/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

function Dashboard({ props, setCode, code, setLoggedIn }) {
    // console.log(code)
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    const navigate = useNavigate();

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
    }

    useEffect(() => {
        if(!code) {
            console.log("joe");
            window.location.replace(AUTH_URL)
        }
    }, [])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return ({
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                })
            }))
        })

        return () => cancel = true
    }, [search, accessToken])

    return (
        <>
            <form
                placeholder="Search for a song or artist"
                className="search"
            >

                <input type="text" className="search__input" value={search} onChange={e => setSearch(e.target.value)} />

            </form>

            <div className="search__results">
                {searchResults.map(track => (
                    <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
                ))}
            </div>
            <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
        </>
    );
}

export default Dashboard;