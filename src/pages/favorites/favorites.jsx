import './favorites.css' ;
import SmallInfoCard from "../../Components/infoCardTile/infoCardTile.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";

function Favorites(){
    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;
    const pokemonApi = import.meta.env.VITE_API_POKEMON;

    const [favoritePokemon, setFavoritePokemon] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    const { user  } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchFavPokemonData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(`${noviEndPoint}users/${user.id}/favorites` ,
                 {
                    signal: controller.signal,
                    headers:
                        {
                            'novi-education-project-id': noviProjectId,
                            Authorization: `Bearer ${ token }`,
                        }
                });
                setFavoritePokemon(data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled...');
                } else {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }
        fetchFavPokemonData();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return (
        <>
            <h1>Favorites page</h1>
                <section>
                    {Object.keys(favoritePokemon).length > 0 ? (
                        <article className="pokemon-tiles">
                            {favoritePokemon &&
                                favoritePokemon.map((favoritePokemon) => {
                                        return <SmallInfoCard key={favoritePokemon.id} endpoint={`${pokemonApi}/${favoritePokemon.pokemonId}`}/>
                                    })}
                        </article>
                    ):
                        (
                            <p>No favorites selected</p>
                        )
                    }
                    {loading && <p>Getting your favorite Pokémons</p>}
                    {favoritePokemon.length === 0 && error && <p>Something went wrong when loading your favorites</p>}
                </section>
        </>
    );
}

export default Favorites;