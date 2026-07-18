import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import Account from "./pages/account/account.jsx";
import Favorites from "./pages/favorites/favorites.jsx";
import MyTeams from "./pages/myTeams/myTeams.jsx";
import Pokedex from "./pages/pokédex/pokedex.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import NavBar from "./Components/navbar/navBar.jsx";
import Footer from "./Components/footer/footer.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUP from "./pages/SignUp/SignUp.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {
    const { isAuth } = useContext(AuthContext);



  return (
    <>
        <div className="page-wrapper">
            <NavBar />
                <Routes>
                    <Route path="/" element={<Pokedex />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUP />} />
                    <Route path="account" element={isAuth ? <Account /> : <Navigate to="/signin" />} />
                    <Route path="favorites" element={isAuth ? <Favorites /> : <Navigate to="/signup"/>} />
                    <Route path="myteams" element={isAuth ? <MyTeams /> : <Navigate to="/signup"/>} />
                </Routes>
            <Footer />
        </div>
    </>
  )
}

export default App
