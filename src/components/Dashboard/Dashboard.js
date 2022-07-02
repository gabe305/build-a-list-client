import useAuth from "../../utils/useAuth";
import { useEffect, useState } from "react"
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../TrackSearchResult/TrackSearchResult";
import Player from "../Player/Player";

const { REACT_APP_CLIENT_ID } = process.env;

const spotifyApi = new SpotifyWebApi({
    clientId: REACT_APP_CLIENT_ID,
})


function Dashboard({ props, setCode, code, setLoggedIn }) {
    console.log(code)
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
    }

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