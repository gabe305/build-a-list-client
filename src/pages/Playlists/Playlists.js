import { useState, useEffect } from "react"
import PlaylistSearchResult from "../../components/PlaylistSearchResult/PlaylistSearchResult"

function Playlists({ spotifyApi, accessToken, userId}) {
    const [playlistResults, setPlaylistResults] = useState()

    // spotifyApi.getUserPlaylists(userId).then((res) => {
    //     setPlaylistResults(res.body.items.map(playlist => {
    //         return ({
    //             title: playlist.name,
    //             uri: playlist.uri,
    //             playlistUrl: playlist.images[0]
    //         })
    //     }))
    // })

    return (
        <h1>ga</h1>
        // playlistResults.map((playlist => (
        //     <PlaylistSearchResult playlist={playlist} />
        // )))
    );
}

export default Playlists;