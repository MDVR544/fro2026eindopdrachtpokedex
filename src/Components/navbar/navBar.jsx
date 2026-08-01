import './navBar.css' ;
import {NavLink, useLocation} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import GetCurrentPage from "../../helpers/getCurrentPage/getCurrentPage.jsx";
import Pokeball from "../pokeball/pokeball.jsx";


function NavBar(){
    const { isAuth, logout } = useContext(AuthContext);
    const currentPage = useLocation()
    return (
        <>
            <nav className="navbar-wrapper">
            <h3 className="page-logger">{GetCurrentPage(currentPage.pathname)}</h3>

                    { isAuth === true ? (
                        <div className="navBar-view-logged-in" >
                            <ul className="navBar-list-logged-in">
                                <li className="navbar-element-red">
                                    <p className="circle-red">o</p>
                                    <NavLink to="/" className="">
                                        Pokédex
                                    </NavLink>
                                </li>
                                <li className="navbar-element-yellow">
                                    <p className="circle-yellow">o</p>
                                    <NavLink to="myteams" className="">
                                        My Teams
                                    </NavLink>
                                </li>
                                <li className="navbar-element-green">
                                    <p className="circle-green">o</p>
                                    <NavLink to="account" className="">
                                        Account
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        ):
                        <div className="navBar-view-logged-out">
                            <ul className="navBar-list-logged-out">
                                <li className="navbar-element-red">
                                    <p className="circle-red">o</p>
                                    <NavLink to="/" className="">
                                        Pokédex</NavLink>
                                </li>
                                <li className="navbar-element-green">
                                    <p className="circle-green">o</p>
                                    <NavLink to="signin" className="">
                                        Sign In</NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                    <div className="logout-btn">
                {isAuth === true &&
                    <Pokeball type="button" onClick={logout}>Logout</Pokeball>
                }
                    </div>
            </nav>
        </>
    );
}

export default NavBar;