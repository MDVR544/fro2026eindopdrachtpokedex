import './account.css' ;
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '/src/context/AuthContext';
import pokemonBackground from "../../assets/PokemonBackground.jpg";



function Account(){
    const { user } = useContext(AuthContext);

    return (
        <>
            <img className="background"
                 src={pokemonBackground}
                 alt="PokemonBackground"
            />
            <div className="account-content-wrapper">
                <div className="account-content">
                    <h2>User details</h2>
                    <section className="user-details" >
                        <p><strong>Email:</strong> {user.email}</p>
                    </section>
                    <div className="navigation-text-content">
                    <p>Klik <Link to="/myteams">hier</Link> om je eerste team aan te maken!</p>
                    <p>Terug naar de Pokédex? klik <Link to="/">hier</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Account;