import { NavLink } from "react-router-dom";
import staff from "../../assets/images/staff.svg"
import logo from "../../assets/images/logo.png"
import { useState, useEffect } from "react"

function HomePage({ spotifyApi, accessToken }) {
    const [code, setCode] = useState()
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <section>
            <img src={staff} alt="Animated musical staff"/>
            <div>
                <NavLink to={"/dashboard"}>dashboard!</NavLink>
                <NavLink to={"/login"}>Login!</NavLink>
                <NavLink to={"/register"}>Register!</NavLink>
            </div>
        </section>
    );
}

export default HomePage;