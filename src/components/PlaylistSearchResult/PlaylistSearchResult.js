function PlaylistSearchResult({ playlist }) {
    return (
        <div> 
            <h2>{playlist.title}</h2>
            <img src={playlist.playlistUrl?.url}/>
        </div>
    );
}

export default PlaylistSearchResult;