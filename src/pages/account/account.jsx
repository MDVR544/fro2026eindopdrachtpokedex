import './account.css' ;
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '/src/context/AuthContext';



function Account(){
    const { user } = useContext(AuthContext);

    return (
        <div className="account-page">
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Email:</strong> {user.email}</p>
            </section>

            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </div>
    );
}

export default Account;