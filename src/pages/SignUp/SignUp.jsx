import './SignUp.css';
import { Link } from 'react-router-dom';


function SignUP(){

    return (
        <>
            <h1>Sign up Page</h1>
            <p>Already have an account? please sign in <Link to="/signin">here</Link>.</p>

        </>
    )

}

export default SignUP;