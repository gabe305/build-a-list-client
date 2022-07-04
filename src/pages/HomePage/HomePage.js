import { NavLink } from "react-router-dom";
import staff from "../../assets/images/staff.svg"
import logo from "../../assets/images/logo.png"
import useQuery from "../../utils/useQuery"
import { useEffect } from "react"

function HomePage({ code, setCode }) {
    const query = useQuery()

    useEffect(() => {
        setCode(query.get("code"))
        console.log(query.get("code"))
    }, [code])

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