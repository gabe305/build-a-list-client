import logo from "../../assets/images/logo.png"
import "./PageHeader.scss"
import { NavLink, Link } from "react-router-dom";

function PageHeader() {
    return (  
        <header className="header">
            <Link to="/"><img src={logo} className="header__logo" alt="Build-A-List Logo which has the text written out with headphones above the A, and a hammer over the t." /></Link>
            <Link to="/playlists/build" className="header__build-link">Build A Playlist</Link>
            <nav className="header__nav nav">
                <ul className="nav__list">
                    <li className="nav__item"><NavLink to="/playlists">Playlists</NavLink></li>
                    {/* <li className="nav__item"><NavLink to="/about">About</NavLink></li>
                    <li className="nav__item"><NavLink to="/profile">Profile</NavLink></li> */}
                </ul>
            </nav>
        </header>
    );
}

export default PageHeader;