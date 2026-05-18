import './App.css'
import axios from 'axios';
import Button from "./Components/normal button/normal button.jsx";
import Pokeball from "./Components/pokéball/pokéball.jsx";
import DropdownMenu from "./Components/dropdown menu/dropdown menu.jsx";

function App() {
    // import.meta.env.VITE_API_KEY

  return (
    <>
        <Button />
        <Pokeball />
        <DropdownMenu />

    </>
  )
}

export default App
