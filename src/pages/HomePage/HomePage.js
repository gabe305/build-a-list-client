import { NavLink } from "react-router-dom";
import staff from "../../assets/images/staff.svg"
import logo from "../../assets/images/logo.png"
import { useState, useEffect } from "react"
import bird from "../../assets/images/bird.svg";
import "./HomePage.scss";
import BirdAnimation from "../../components/BirdAnimation/BirdAnimation";

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=d20d9da3b07549c485dcbaf9436be010&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public'

function HomePage({ spotifyApi, accessToken }) {
    const [code, setCode] = useState()
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <section className="home">
            <div className="home__copy-container">
                <h1 className="home__heading">Build fun playlists with friends!</h1>
                <button><a href={AUTH_URL}>Login!</a></button>
                {/* <NavLink to={"/login"} className="home__link">Login!</NavLink> */}
            </div>
            <BirdAnimation />
        </section>
    );
}

export default HomePage;