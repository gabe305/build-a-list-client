function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }
    return (  
        <div>
            <img src={track.albumUrl} onClick={handlePlay} />
        </div>
    );
}

export default TrackSearchResult;