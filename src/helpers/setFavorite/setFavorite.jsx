import './setFavorite.css';
import axios from "axios";
import {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext.jsx";
// post request maken die een pokemon toevoegt aan de data base
// pokemon id en ingelogde userId meegeven.


function SetFavorite(pokemonId){
    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [isFavorite, toggleIsFavorite] = useState(false);

    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    async function favorite( {pokemonId} ) {
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

                {toggleIsFavorite(false)};
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
                {toggleIsFavorite(true)};
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
        <>
            <button className="btn-fav" type="button" onClick={()=> {(favorite(pokemonId))}}>
                {isFavorite ? "Delete Favorite" : "Favorite"}
            </button>

            {loading && <p>Adding pokemon to your favorites...</p>}
            {error && <p >Something went wrong making this pokemon your favorite</p>}
        </>
    );
}

export default SetFavorite

