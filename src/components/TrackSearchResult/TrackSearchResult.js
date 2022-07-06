import { useState } from "react";
import playlistAdd from "../../assets/icons/playlistAdd.svg"
import PlaylistModal from "../PlaylistModal/PlaylistModal"
function TrackSearchResult({ track, chooseTrack, playlistResults, userId }) {
    const [show, setShow] = useState(false)

    function handlePlay() {
        chooseTrack(track)
    }
    
    function showModal() {
        setShow(true)
    }

    if(show) {
        return (
            <>
                <PlaylistModal setShow={setShow} show={show} playlistResults={playlistResults} userId={userId}/>
                <div>
                    <img src={track.albumUrl} onClick={handlePlay} />
                    <p>{track.title}</p>
                    <img src={playlistAdd} onClick={showModal} />
                </div>
            </>
        )
    }
    
    return (
        <>
            <div>
                <img src={track.albumUrl} onClick={handlePlay} />
                <p>{track.title}</p>
                <img src={playlistAdd} onClick={showModal} />
            </div>
        </>
    );
}

export default TrackSearchResult;