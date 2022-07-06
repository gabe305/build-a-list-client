import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import PlaylistSearchResult from "../../components/PlaylistSearchResult/PlaylistSearchResult"

function Playlists({ playlistResults }) {
    return (
        <div>
            <NavLink to="/playlists/build">Build A Playlist</NavLink>
            {playlistResults?.map(playlist => (
                <NavLink to={playlist?.id}><PlaylistSearchResult playlist={playlist} key={playlist?.id}/></NavLink>
            ))}
        </div>
    );
}

export default Playlists;