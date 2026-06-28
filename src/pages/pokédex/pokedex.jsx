import './pokedex.css' ;
import Button from "../../Components/normal button/normal button.jsx";
import Pokeball from "../../Components/pokéball/pokéball.jsx";
import TypeButton from "../../Components/typeButton/typeButton.jsx";
import {FullInfoCard, SmallInfoCard} from "../../Components/infoCard/infoCard.jsx";


function Pokedex(){

    return (
        <>
            <h1>Pokédex page</h1>
            <div>
            <FullInfoCard />
            <SmallInfoCard />
            </div>
        </>
    );
}

export default Pokedex