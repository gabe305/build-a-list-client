import logo from "../../assets/images/logo.png"
import "./PageHeader.scss"


function PageHeader() {
    return (  
        <header className="header">
            <img src={logo} className="header__logo" alt="Build-A-List Logo which has the text written out with headphones above the A, and a hammer over the t." />
            <nav className="header__nav nav">
                <ul className="nav__list">
                    <li className="nav__item">Playlists</li>
                    <li className="nav__item">Explore</li>
                    <li className="nav__item">Profile</li>
                </ul>
            </nav>
        </header>
    );
}

export default PageHeader;