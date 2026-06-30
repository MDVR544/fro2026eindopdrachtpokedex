import './navBar.css' ;
import {NavLink} from "react-router-dom";


function NavBar(){

    return (
        <>
            <nav className="navbar">
            <h3>Active page</h3>
                <ul className="navbar-list">
                    <li><NavLink to="/" className="">Pokédex</NavLink></li>
                    <li><NavLink to="myteams" className="">My Teams</NavLink></li>
                    <li><NavLink to="battleadvice" className="">Battle Advice</NavLink></li>
                    <li><NavLink to="favorites" className="">Favorites</NavLink></li>
                    <li><NavLink to="account" className="">Account</NavLink></li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;