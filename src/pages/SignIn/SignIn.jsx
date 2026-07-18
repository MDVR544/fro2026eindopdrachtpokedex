import './SignIn.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '/src/context/AuthContext.jsx';
import axios from 'axios';

function SignIn(){
    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post(`${noviEndPoint}login`, {
                email: email,
                password: password,
            },{
                headers:
                    {
                        'novi-education-project-id': noviProjectId,
                    }
            });
            login(result.data.token);

        } catch(e) {
            console.error(e);
            toggleError(true);
        }
        finally{
            toggleLoading(false);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email-field">
                    e-mailadres:
                    <input
                        type="email"
                        id="email-field"
                        name="e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p className="error">Combinatie van e-mailadres en wachtwoord is onjuist</p>}

                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    Inloggen
                </button>
            </form>

            <p>No account yet? please sign up <Link to="/signup">here</Link>.</p>
        </>
    );
}

export default SignIn;