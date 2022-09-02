import { useEffect, useState } from "react"
import TrackSearchResult from "../TrackSearchResult/TrackSearchResult";
import Player from "../Player/Player";
import "./Dashboard.scss"

function Dashboard({ accessToken, spotifyApi, playlistResults, userId, buildMode, setBuildMode, chosenPlaylist, setChosenSongs, chosenSongs }) {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
    }

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        },
                        track.album.images[0]
                    )
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                })
            )
        }).catch(err => console.log(err))

        return () => cancel = true
    }, [search, accessToken, spotifyApi])

    return (
        <div className="search">
            <input type="text" className="search__input" placeholder="Search for a song" value={search} onChange={e => setSearch(e.target.value)} />

            <div className="search__menu">
                {searchResults.map(track => (
                    <TrackSearchResult className="search__result" track={track} key={track.uri} chosenPlaylist={chosenPlaylist} setChosenSongs={setChosenSongs} chosenSongs={chosenSongs} chooseTrack={chooseTrack} playlistResults={playlistResults} userId={userId} buildMode={buildMode} />
                ))}
            </div>
            <div
                className="search__player" >
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </div>
    );
}

export default Dashboard;