import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistTrack from "../../components/PlaylistTrack/PlaylistTrack";
import sampleImage from "../../assets/images/sample-image.svg"

function SinglePlaylist({ spotifyApi }) {
    const { playlistid } = useParams()
    const [playlist, setPlaylist] = useState() 

    useEffect(() => {
        spotifyApi.getPlaylist(playlistid).then(res => {
            setPlaylist(res.body)
        })
    }, [playlistid])

    return (  
        <div className="single-playlist">
            <h1 className="single-playlist__title">{playlist?.name}</h1>
            <img className="single-playlist__img"src={playlist?.images[0]?.url || sampleImage} />
            {playlist?.tracks.items.map(track => {
                return <PlaylistTrack track={track.track} key={track.uri}/>
            })}
        </div>
    );
}

export default SinglePlaylist;