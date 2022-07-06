import { useEffect } from "react";
import { Link } from "react-router-dom";
import PlaylistModalOption from "../PlaylistModalOption/PlaylistModalOption";
import { v4 as uuid } from "uuid";

function PlaylistModal({ show, setShow, spotifyApi, playlistResults, userId }) {
    function handleExitModal() {
        setShow(false)
    }

    return (  
        <div>
            {playlistResults?.map(playlist => {
                if(userId !== playlist.owner) return null
                return <PlaylistModalOption key={uuid()} playlist={playlist} />
            })}
            <Link to="/playlists" onClick={handleExitModal}>Go Back</Link>
        </div>
    );
}

export default PlaylistModal;