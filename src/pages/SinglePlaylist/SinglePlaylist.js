import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistTrack from "../../components/PlaylistTrack/PlaylistTrack";

function SinglePlaylist({ spotifyApi }) {
    const { playlistid } = useParams()
    const [playlist, setPlaylist] = useState() 

    useEffect(() => {
        spotifyApi.getPlaylist(playlistid).then(res => {
            setPlaylist(res.body)
        })
    }, [playlistid])

    return (  
        <div>
            <h1>{playlist?.name}</h1>
            <img src={playlist?.images[0].url} />
            {playlist?.tracks.items.map(track => {
                return <PlaylistTrack track={track.track} key={track.uri}/>
            })}
        </div>
    );
}

export default SinglePlaylist;