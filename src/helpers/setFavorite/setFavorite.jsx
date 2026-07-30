import './setFavorite.css';
import axios from "axios";
import {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext.jsx";

function SetFavorite({pokemonId, favPokemon, toggleIsFavorite}){
    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);


    async function favorite( pokemonId ) {
        toggleError(false);
        toggleLoading(true);

        try {
            const {data} = await axios.get(`${noviEndPoint}users/${user.id}/favorites` ,
                {
                    headers:
                        {
                            'novi-education-project-id': noviProjectId,
                            Authorization: `Bearer ${ token }`,
                        }
                });

            const isAlreadyFavorite = data.find((favorite) => {
                return favorite.pokemonId === pokemonId;
            });

            if (isAlreadyFavorite) {
                await axios.delete(`${noviEndPoint}favorites/${isAlreadyFavorite.id}`,
                    {
                        headers:
                            {
                                'novi-education-project-id': noviProjectId,
                                Authorization: `Bearer ${ token }`,
                            }}
                );
                toggleIsFavorite(false)

            }else{

            await axios.post(`${noviEndPoint}favorites`, {
                    userId: user.id,
                    pokemonId: pokemonId
                },
                {
                    headers:
                        {
                            'novi-education-project-id': noviProjectId,
                            Authorization: `Bearer ${ token }`,
                        }}
            );
                toggleIsFavorite(true)

            }
        } catch(e) {
            console.error(e);
            toggleError(true);

        }
        finally{
            toggleLoading(false);
        }
    }

    return(
        <div className="add-fav-content">
            <button className="btn-fav" type="button" onClick={()=> {(favorite(pokemonId))}}>
                {favPokemon ? "Delete Favorite" : "Favorite"}
            </button>

            {loading && <p className="system-message">Adding pokemon to your favorites...</p>}
            {error && <p className="system-message">Something went wrong making this pokemon your favorite</p>}
        </div>
    );
}

export default SetFavorite

