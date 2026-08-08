import './SignUp.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import pokemonBackground from '../../assets/PokemonBackground.jpg';
import Pokeball from "../../Components/pokeball/pokeball.jsx";

function SignUP(){
    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post(`${noviEndPoint}users`, {
                email: email,
                password: password,
                roles: [
                        "user"
                    ]
                },
                {
                    headers:
                    {
                        'novi-education-project-id': noviProjectId,
            }}
            );

            navigate('/signin');
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
            <div className="signUp-content-wrapper">
                <div className="signUp-content">
                    <h1>Registreren</h1>

                    <form className="signUp-form"
                        onSubmit={handleSubmit}>
                        <div className="form-input">
                            <label htmlFor="email-field">E-mailadres:</label>
                                <input
                                    type="email"
                                    id="email-field"
                                    name="email"
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
                            Registreren
                        </Pokeball>
                    </form>
                    {error && <p>This account already exist, please select a different e-mailadres</p>}

                    <p>Already have an account? please sign in <Link to="/signin">here</Link>.</p>
                </div>
            </div>
        </>
    );
}

export default SignUP;