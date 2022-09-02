import logo from "../../assets/images/logo.png"
import "./PageHeader.scss"
import { NavLink, Link } from "react-router-dom";
import { gsap } from "gsap";
import { useRef } from "react";

function PageHeader({ loggedIn, buildMode, chosenPlaylist, chosenSongs, setChosenSongs, spotifyApi }) {
    const headerRef = useRef()

    const submitSongsHandler = () => {
        if (chosenSongs) {
            spotifyApi.addTracksToPlaylist(chosenPlaylist?.id, [...chosenSongs])
                .then(data => {
                    setChosenSongs([])
                });
        }
    }

    if (buildMode) {
        gsap.to(headerRef.current, {
            backgroundColor: "#f95d9b",
            duration: 3,
            ease: "back.out(1.7)",
        });

        return (
            <header ref={headerRef} className="header header--build">
                <Link to="/"><img src={logo} onClick={submitSongsHandler} className="header__logo header__logo--center" alt="Build-A-List Logo which has the text written out with headphones above the A, and a hammer over the t." /></Link>
                <NavLink to="/playlists" className="header__my-playlists nav__item">My Playlists</NavLink>
            </header>
        );
    }

    if (loggedIn) {
        gsap.to(headerRef.current, {
            backgroundColor: "#39a0ca",
            duration: 2,
            ease: "back.out(1.7)",
        });
        return (
            <header ref={headerRef} className="header">
                <Link to="/"><img src={logo} className="header__logo" alt="Build-A-List Logo which has the text written out with headphones above the A, and a hammer over the t." /></Link>
                <Link to="/playlists/build" className="header__build-link">Build A Playlist</Link>
                <nav className="header__nav nav">
                    <ul className="nav__list">
                        <li className="nav__item"><NavLink to="/playlists">My Playlists</NavLink></li>
                    </ul>
                </nav>
            </header>
        );
    } else {
        return (
            <header className="header header--solo">
                <Link to="/"><img src={logo} className="header__logo header__logo--center" alt="Build-A-List Logo which has the text written out with headphones above the A, and a hammer over the t." /></Link>
            </header>
        );
    }
}

export default PageHeader;