import './infoCardPopup.css';
import SetFavorite from "../../helpers/setFavorite/setFavorite.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import AddPokemonToTeam from "../addPokemonToTeam/addPokemonToTeam.jsx";

function InfoCardPopup(props) {

    const { isAuth } = useContext(AuthContext);
    return(props.trigger) ? (
<>
    <div className="large-view">
    <article className="large-view-content">
        {props.children}
    </article>

        <button className="btn-close" type="button" onClick={() => props.setTrigger(false)}>
            X
        </button>
        { isAuth &&
            <div>
            <SetFavorite
            pokemonId={props.pokemonId}
            favPokemon={props.isFavorite}
            toggleIsFavorite={props.toggleIsFavorite}
            />
                <AddPokemonToTeam
                    pokemonId={props.pokemonId}

                />
            </div>
        }
    </div>
</>
    ) : "";
}

export default InfoCardPopup