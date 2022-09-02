import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PlaylistTrack from "../../components/PlaylistTrack/PlaylistTrack";
import sampleImage from "../../assets/images/sample-image.svg"
import "./SinglePlaylist.scss"
import { gsap } from "gsap"

function SinglePlaylist({ spotifyApi, chosenPlaylist, setChosenPlaylist, buildMode, setBuildMode }) {
    const { playlistid } = useParams()
    const [img, setImg] = useState()
    const buildButton = useRef()
    const buildButtonTween = useRef()
    
    useEffect(() => {
        buildButtonTween.current = gsap.to(buildButton.current, {
            backgroundColor: "#f95d9b",
            paused: true
        });
    }, [])

    const buildEnterHandler = () => {
        buildButtonTween.current?.play();
    }
    
    const buildLeaveHandler = () => {
        buildButtonTween.current.reverse();
    }
    
    const buildHandler = () => {
        setBuildMode(!buildMode)
    }

    useEffect(() => {
        if(chosenPlaylist) {
            setImg(chosenPlaylist?.images[0])
        }
    }, [chosenPlaylist])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistid).then(res => {
            setChosenPlaylist(res.body)
        })
    }, [playlistid, chosenPlaylist, setChosenPlaylist, spotifyApi])
    
    return (  
        <section className="single-playlist__page">
            <button className="single-playlist__builder-mode" ref={buildButton} onMouseEnter={buildEnterHandler} onMouseLeave={buildLeaveHandler} onClick={buildHandler}>Builder Mode!</button>
            <div className="single-playlist">
                <div className="single-playlist__info-side single-playlist__info-side--title-img">
                    <h2 className="single-playlist__title">{chosenPlaylist?.name}</h2>
                    <img className="single-playlist__img" alt="playlist thumbnail" src={img?.url || sampleImage} />
                </div>
                <div className="single-playlist__info-side single-playlist__info-side--metrics">
                    <div className="single-playlist__info-top">
                        <div className="single-playlist__info-single">
                            <h3 className="single-playlist__info-label">Followers</h3>
                            <p className="single-playlist__info">{chosenPlaylist?.followers?.total}</p>
                        </div>
                        <div className="single-playlist__info-single">
                            <h3 className="single-playlist__info-label">Tracks</h3>
                            <p className="single-playlist__info">{chosenPlaylist?.tracks?.total}</p>
                        </div>
                    </div>
                    <div className="single-playlist__info-single">
                        <h3 className="single-playlist__info-label">Description</h3>
                        <p className="single-playlist__info">{chosenPlaylist?.description}</p>
                    </div>
                </div>
            </div>
            {buildMode && chosenPlaylist ? 
                <div className="single-playlist__tracks">
                    {chosenPlaylist?.tracks?.items.map(track => {
                        return <PlaylistTrack track={track.track} key={track.uri}/>
                    })}
                </div>
            :
                <div className="single-playlist__tracks">
                    {chosenPlaylist?.tracks?.items.map(track => {
                        return <PlaylistTrack track={track.track} key={track.uri}/>
                    })}
                </div>
            }
        </section>
    );
}

export default SinglePlaylist;