import "./PlaylistSearchResult.scss"

function PlaylistSearchResult({ playlist }) {
    return (
        <div className="playlist"> 
            <img className="playlist__img" src={playlist.playlistUrl?.url}/>
            <h2 className="playlist__title">{playlist.title}</h2>
        </div>
    );
}

export default PlaylistSearchResult;