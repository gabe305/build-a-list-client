import { useState } from "react";
import playlistAdd from "../../assets/icons/playlistAdd.svg"
import PlaylistModal from "../PlaylistModal/PlaylistModal"
import "./TrackSearchResult.scss"

function TrackSearchResult({ track, chooseTrack, playlistResults, userId, chosenPlaylist, setChosenSongs, chosenSongs, buildMode }) {
    const [show, setShow] = useState(false);

    function handlePlay() {
        chooseTrack(track)
    }
    
    function showModal() {
        setShow(true)
    }

    const playlistAddHandler = () => {
        setChosenSongs([...chosenSongs, track.uri])
    }

    if(show) {
        return (
            <>
                <PlaylistModal setShow={setShow} show={show} playlistResults={playlistResults} userId={userId}/>
                <div className="song" onClick={handlePlay}>
                    <img className="song__image" src={track.albumUrl} />
                    <div class="song__right-container">
                        <p className="song__title">{track.title}</p>
                        <img className="song__playlistAdd-btn" src={playlistAdd} onClick={showModal} />
                    </div>
                </div>
            </>
        )
    }
    
    return (
        <>
            <div className="song">
                <img className="song__image" src={track.albumUrl} onClick={handlePlay} />
                <p className="song__title">{track.title}</p>
                <img className="song__playlistAdd-btn" src={playlistAdd} onClick={playlistAddHandler} />
            </div>
        </>
    );
}

export default TrackSearchResult;