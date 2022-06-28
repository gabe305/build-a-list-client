import useAuth from "../../utils/useAuth";

function Dashboard({ code }) {
    const accessToken = useAuth(code)
    return (  
        <>
        {code}
        </>
    );
}

export default Dashboard;