import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import PlaylistSearchResult from "../../components/PlaylistSearchResult/PlaylistSearchResult"

function Playlists({ playlistResults }) {
    return (
        <div>
            {playlistResults?.map(playlist => (
                <NavLink to={playlist?.id}><PlaylistSearchResult playlist={playlist} key={playlist?.id}/></NavLink>
            ))}
        </div>
    );
}

export default Playlists;