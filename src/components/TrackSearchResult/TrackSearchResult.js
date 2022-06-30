

function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }
    return (  
        <div>
            <img src={track.albumUrl} onClick={handlePlay} />
            <p>{track.artist.name[0]}</p>
        </div>
    );
}

export default TrackSearchResult;