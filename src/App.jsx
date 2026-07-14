import './App.css'
import {Routes, Route} from "react-router-dom";
import Account from "./pages/account/account.jsx";
import Favorites from "./pages/favorites/favorites.jsx";
import MyTeams from "./pages/myTeams/myTeams.jsx";
import Pokedex from "./pages/pokédex/pokedex.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import NavBar from "./Components/navbar/navBar.jsx";
import Footer from "./Components/footer/footer.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUP from "./pages/SignUp/SignUp.jsx";

function App() {




  return (
    <>
        <div className="page-wrapper">
            <NavBar />
                <Routes>
                    <Route path="account" element={<Account/>} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUP />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="myteams" element={<MyTeams />} />
                    <Route path="/" element={<Pokedex />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            <Footer />
        </div>
    </>
  )
}

export default App
