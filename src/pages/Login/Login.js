import './Login.scss'


const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=d2f4a0a165d94bcabde9f3bf08fcb7f3&response_type=code&redirect_uri=http://localhost:3000/dashboard/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

function Login() {
    return (  
        <>
            <a href={AUTH_URL} on><button>Login!</button></a>
        </>
    );
}

export default Login;