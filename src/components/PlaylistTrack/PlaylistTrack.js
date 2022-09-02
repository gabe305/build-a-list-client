import "./PlaylistTrack.scss"

function PlaylistTrack({ track }) {
    return (  
        <div className="playlist-track single-playlist__track">
            <img className="playlist-track__img" src={track?.album.images[2].url} alt="Track thumbnail" />
            <h3 className="playlist-track__name">{track?.name}</h3>
            <p className="playlist-track_artist">{track?.artists[0].name}</p>
        </div>
    );
}

export default PlaylistTrack;