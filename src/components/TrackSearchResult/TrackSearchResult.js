import { useEffect, useRef, useState } from "react";
import playlistAdd from "../../assets/icons/playlistAdd.svg"
import "./TrackSearchResult.scss"
import { gsap } from "gsap"

function TrackSearchResult({ track, chooseTrack, playlistResults, userId, chosenPlaylist, setChosenSongs, chosenSongs, buildMode }) {
    // const [show, setShow] = useState(false);
    const [added, setAdded] = useState(false);
    const songRef = useRef()
    const songTween = useRef()
    let stringifiedSongs = chosenSongs ? JSON.stringify(chosenSongs) : null

    useEffect(() => {
        songTween.current = gsap.to(songRef.current, {
            backgroundColor: "#5A9615",
            paused: true
        })
    }, [])

    function handlePlay() {
        chooseTrack(track)
    }

    useEffect(() => {
        if(chosenSongs.length === 0) {
            setAdded(false)
            songTween.current.reverse()
        }
    }, [stringifiedSongs, chosenSongs.length]);

    const playlistAddHandler = () => {
        if(!added) {
            songTween.current.play()
            if(chosenSongs) {
                setChosenSongs([...chosenSongs, track.uri])
            } else {
                setChosenSongs([track.uri])
            }
            setAdded(true)
        } else {
            songTween.current.reverse()
            setChosenSongs(() => (
                chosenSongs?.filter(chosenSongsTrack => (
                    chosenSongsTrack !== track.uri
                ))
            ))
            setAdded(false)
        }
    }

    // if(show) {
    //     return (
    //         <>
    //             <PlaylistModal setShow={setShow} show={show} playlistResults={playlistResults} userId={userId}/>
    //             <div className="song" ref={songRef} onClick={handlePlay}>
    //                 <img className="song__image" src={track.albumUrl} />
    //                 <div class="song__right-container">
    //                     <p className="song__title">{track.title}</p>
    //                     <img className="song__playlistAdd-btn" src={playlistAdd} />
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }
    
    return (
        <>
            <div className="song" ref={songRef}>
                <img className="song__image" src={track.albumUrl} onClick={handlePlay} alt="Song" />
                <p className="song__title">{track.title}</p>
                <img className="song__playlistAdd-btn" src={playlistAdd} onClick={playlistAddHandler} alt="Button to add to playlist"/>
            </div>
        </>
    );
}

export default TrackSearchResult;