import './SignIn.css';
import { Link } from 'react-router-dom';


function SignIn(){

    return (
        <>
            <h1>Sign in Page</h1>

            <p>No account yet? please sign up <Link to="/signup">here</Link>.</p>

        </>
    )

}

export default SignIn;