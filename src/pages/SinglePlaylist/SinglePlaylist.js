import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistTrack from "../../components/PlaylistTrack/PlaylistTrack";
import sampleImage from "../../assets/images/sample-image.svg"

function SinglePlaylist({ spotifyApi, chosenPlaylist, setChosenPlaylist, buildMode, setBuildMode }) {
    const { playlistid } = useParams()

    useEffect(() => {
        spotifyApi.getPlaylist(playlistid).then(res => {
            setChosenPlaylist(res.body)
        })
    }, [playlistid])

    const buildHandler = () => {
        setBuildMode(!buildMode)
    }

    return (  
        <section className="single-playlist__page">
            <button className="single-playlist__builder-mode" onClick={buildHandler}>Builder Mode!</button>
            <div className="single-playlist">
                <div className="single-playlist__info-side">
                    <h2 className="single-playlist__title">{chosenPlaylist?.name}</h2>
                    <img className="single-playlist__img"src={chosenPlaylist?.images[0]?.url || sampleImage} />
                </div>
                <div className="single-playlist__info-side">
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
            </div>
        </section>
    );
}

export default SinglePlaylist;