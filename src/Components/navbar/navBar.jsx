import './navBar.css' ;
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";


function NavBar(){
    const { isAuth, logout } = useContext(AuthContext);
    return (
        <>
            <nav className="navbar">
            <h3>Active page</h3>

                    { isAuth === true ? (
                        <div className="navBar-view-logged-in" >
                            <ul className="navBar-list-logged-in">
                            <li><NavLink to="/" className="">Pokédex</NavLink></li>
                            <li><NavLink to="myteams" className="">My Teams</NavLink></li>
                            <li><NavLink to="account" className="">Account</NavLink></li>
                            </ul>
                            <button type="button" onClick={logout}>Logout</button>
                        </div>
                        ):
                        <div className="navBar-view-logged-out">
                            <ul className="navBar-list-logged-out">
                            <li><NavLink to="/" className="">Pokédex</NavLink></li>
                            <li><NavLink to="signin" className="">Sign In</NavLink></li>
                            </ul>

                        </div>
                    }
            </nav>
        </>
    );
}

export default NavBar;