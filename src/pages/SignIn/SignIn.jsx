import './SignIn.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '/src/context/AuthContext.jsx';
import axios from 'axios';
import pokemonBackground from "../../assets/PokemonBackground.jpg";
import Pokeball from "../../Components/pokeball/pokeball.jsx";

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
            <img className="background"
                 src={pokemonBackground}
                 alt="PokemonBackground"
            />
            <div className="signIn-content-wrapper">
                <div className="signIn-content">
                    <h1>Inloggen</h1>

                    <form className="signUp-form"
                          onSubmit={handleSubmit}>
                            <div className="form-input">
                                <label htmlFor="email-field">e-mailadres:</label>
                                    <input
                                        type="email"
                                        id="email-field"
                                        name="e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                <label htmlFor="password-field">Wachtwoord:</label>

                                    <input
                                        type="password"
                                        id="password-field"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                            </div>


                        <Pokeball
                            type="submit"
                            className="form-button"
                            disabled={loading}
                        >
                            Inloggen
                        </Pokeball>
                    </form>
                    {error && <p className="error">Combinatie van e-mailadres en wachtwoord is onjuist</p>}

                    <p>No account yet? please sign up <Link to="/signup">here</Link>.</p>
                </div>
            </div>
        </>
    );
}

export default SignIn;