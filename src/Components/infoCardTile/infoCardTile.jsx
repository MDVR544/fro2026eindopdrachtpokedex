import './infoCardTile.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import GetType from "../../helpers/getType/getType.jsx";
import IdFormater from "../../helpers/idFormater/idFormater.jsx";
import InfoCardPopup from "../infoCardPopup/infoCardPopup.jsx";

function SmallInfoCard({endpoint}){
    const [pokemon, setPokemon] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [fullInfo, toggleFullInfo] = useState(false);


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

    }, [endpoint]);


    return (
        <>
            <article className="pokemon-small-card">
                {Object.keys(pokemon).length > 0 &&
                    <button className="btn-large-view" type='button' onClick={() =>
                        toggleFullInfo(true,
                        )}>
                        <div className="pokemon-small-card-content">
                            <div className="card-header-info">
                            <h2>{pokemon.name}</h2>
                            <h3> {IdFormater(pokemon.id)} </h3>
                            </div>
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
                    </button>
                }
                {loading && <p>Loading...</p>}
                {Object.keys(pokemon).length === 0 && error && <p>Er ging iets mis bij het zoeken van de Pokémons...</p>}
            </article>

            <InfoCardPopup
                trigger = {fullInfo}
                setTrigger={toggleFullInfo}
                pokemonId={pokemon.id}
            >
                {Object.keys(pokemon).length > 0 &&
                <div className="pokemon-small-card-content">
                    <div className="card-header-info">
                        <h2>{pokemon.name}</h2>
                        <h3> {IdFormater(pokemon.id)} </h3>
                    </div>
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
                    <h4>About</h4>
                    <ul>
                        <li>Weight: {pokemon.weight}</li>
                        <li>Height: {pokemon.height}</li>
                    </ul>
                    <h4>Base Stats</h4>
                    <div className="stats-content">
                        <ul>
                            {pokemon.stats.map((stat) => (
                                <li key={stat.stat.name}>
                                    {stat.stat.name}: {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ul>
                        {pokemon.abilities.map((ability) => {
                            return (
                                <li key={`${ability.ability.name}-${pokemon.name}`}>
                                    {ability.ability.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                }
                {loading && <p>Loading...</p>}
                {Object.keys(pokemon).length === 0 && error && <p>Er ging iets mis bij het zoeken van de Pokémons...</p>}
            </InfoCardPopup>
        </>
    );
}



export default SmallInfoCard
