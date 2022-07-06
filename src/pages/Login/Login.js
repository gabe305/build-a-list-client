import './Login.scss'

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=d20d9da3b07549c485dcbaf9436be010&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public'

function Login() {
    return (  
        <>
            <a href={AUTH_URL}><button>Login!</button></a>
        </>
    );
}

export default Login;