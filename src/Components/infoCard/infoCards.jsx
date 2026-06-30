import './infoCards.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import GetType from "../../helpers/getType/getType.jsx";

function SmallInfoCard({endpoint}){
    const [pokemon, setPokemon] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPokemonData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const { data } = await axios.get(endpoint, {
                    signal: controller.signal,
                });
                setPokemon(data);
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

        if (endpoint) {
            fetchPokemonData();
        }

        return () => {
            console.log('unmount effect is triggered');
            controller.abort();
        }

    }, []);

    return (
        <>
            <article className="pokemon-small-card">
                {Object.keys(pokemon).length > 0 &&
                    <div className="pokemon-small-card-content">
                        <h2>{pokemon.name} {pokemon.id}</h2>
                            <img
                            alt="Afbeelding pokémon"
                            src={pokemon.sprites.front_default}
                            />
                        <ul>
                            {pokemon.types.map((type) => {
                                return (
                                    <li className={GetType(type.type.name)} key={`${type.type.name}-${pokemon.name}`}>
                                        {type.type.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                }
                {loading && <p>Loading...</p>}
                {Object.keys(pokemon).length === 0 && error && <p>Er ging iets mis bij het zoeken van de Pokémons...</p>}
            </article>
        </>
    );
}



export default SmallInfoCard
