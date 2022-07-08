import "./PlaylistTrack.scss"
import playlistAdd from "../../assets/icons/playlistAdd.svg"

function PlaylistTrack({ track }) {
    return (  
        <div className="playlist-track single-playlist__track">
            <img className="playlist-track__img" src={track?.album.images[2].url} />
            <h3 className="playlist-track__name">{track?.name}</h3>
            <p className="playlist-track_artist">{track?.artists[0].name}</p>
        </div>
    );
}

export default PlaylistTrack;