import './App.css'
import axios from 'axios';
import {Routes, Route} from "react-router-dom";
import Account from "./pages/account/account.jsx";
import BattleAdvice from "./pages/battleAdvice/battleAdvice.jsx";
import Favorites from "./pages/favorites/favorites.jsx";
import MyTeams from "./pages/myTeams/myTeams.jsx";
import Pokedex from "./pages/pokédex/pokedex.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import NavBar from "./Components/navbar/navBar.jsx";
import Footer from "./Components/footer/footer.jsx";

function App() {
    // import.meta.env.VITE_API_KEY

  return (
    <>
    <NavBar />
        <Routes>
            <Route path="account" element={<Account/>} />
            <Route path="battleadvice" element={<BattleAdvice />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="myteams" element={<MyTeams />} />
            <Route path="/" element={<Pokedex />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
<Footer />
    </>
  )
}

export default App
