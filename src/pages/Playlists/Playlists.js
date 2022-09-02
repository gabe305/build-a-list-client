import { NavLink } from "react-router-dom"
import PlaylistSearchResult from "../../components/PlaylistSearchResult/PlaylistSearchResult"
import { v4 as uuid } from "uuid"

function Playlists({ playlistResults }) {
    return (
        <div>
            {playlistResults?.map(playlist => (
                <NavLink to={playlist?.id} key={uuid()}><PlaylistSearchResult playlist={playlist} key={playlist?.id}/></NavLink>
            ))}
        </div>
    );
}

export default Playlists;