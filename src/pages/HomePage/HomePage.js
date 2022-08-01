import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react"
import "./HomePage.scss";
import BirdAnimation from "../../components/BirdAnimation/BirdAnimation";
import { gsap } from "gsap";

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=d20d9da3b07549c485dcbaf9436be010&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public'

function HomePage({ spotifyApi, accessToken, loggedIn }) {
    const [code, setCode] = useState()
    const profileButton = useRef()
    const profileButtonTween = useRef()
    const loginButton = useRef()
    const loginButtonTween = useRef()

    useEffect(() => {
        loginButtonTween.current = gsap.to(loginButton.current, {
            backgroundColor: "#f95d9b",
            paused: true
        });

        profileButtonTween.current = gsap.to(profileButton.current, {
            backgroundColor: "#f95d9b",
            paused: true
        });

    }, [])

    const homeButtonEnter = (element) => {
        if(element === "profile") {
            profileButtonTween.current?.play();
        }
        if(element === "login") {
            loginButtonTween.current?.play();
        }
    }

    const buttonLeaveHandler = (element) => {
        if(element === "profile") {
            profileButtonTween.current.reverse();
        }
        if(element === "login") {
            loginButtonTween.current.reverse();
        }    
    }

    if(loggedIn) {
        return (
            <section className="home">
                <div className="home__copy-container">
                    <h1 className="home__heading">Build fun playlists with friends!</h1>
                    <NavLink to="/profile" onMouseEnter={() => {homeButtonEnter("profile")}} onMouseLeave={() => {buttonLeaveHandler("profile")}} className="home__link" ref={profileButton}>Profile</NavLink>
                    {/* <NavLink to={"/login"} className="home__link">Login!</NavLink> */}
                </div>
                <BirdAnimation className="home__hero"/>
            </section>
        );
    } else {
        return (
            <section className="home">
                <div className="home__copy-container">
                    <h1 className="home__heading">Build fun playlists with friends!</h1>
                    <a className="home__link" onMouseEnter={() => {homeButtonEnter("login")}} onMouseLeave={() => {buttonLeaveHandler("login")}} href={AUTH_URL} ref={loginButton}>Login!</a>
                    {/* <NavLink to={"/login"} className="home__link">Login!</NavLink> */}
                </div>
                <BirdAnimation className="home__hero"/>
            </section>
        );
    }
}

export default HomePage;