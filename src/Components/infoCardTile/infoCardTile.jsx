import './infoCardTile.css';
import {useContext, useEffect, useState} from "react";
import axios from 'axios';
import GetType from "../../helpers/getType/getType.jsx";
import IdFormater from "../../helpers/idFormater/idFormater.jsx";
import InfoCardPopup from "../infoCardPopup/infoCardPopup.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function SmallInfoCard({endpoint}){

    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;

    const [pokemon, setPokemon] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [fullInfo, toggleFullInfo] = useState(false);
    const [isFavorite, toggleIsFavorite] = useState(false);

    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    async function getFavorites( pokemonId ) {
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

            (isAlreadyFavorite ? toggleIsFavorite(true): toggleIsFavorite(false))


        } catch(e) {
            console.error(e);
            toggleError(true);
        }
        finally{
            toggleLoading(false);
        }
    }


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
                getFavorites(data.id);
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
            <article className= {isFavorite ? "fav-pokemon-small-card" : "pokemon-small-card"}>
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
                isFavorite={isFavorite}
                toggleIsFavorite={toggleIsFavorite}
            >
                {Object.keys(pokemon).length > 0 &&
                <div className="pokemon-large-card-content">
                    <div className="top-card-content">
                    <div className="large-card-header-info">
                        <h2>{pokemon.name}</h2>
                        <h3> {IdFormater(pokemon.id)} </h3>
                    </div>
                    <img
                        alt="Afbeelding pokémon"
                        src={pokemon.sprites.front_default}
                    />
                        <div className="large-card-info-content">
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
                    </div>
                    <h4>About</h4>
                    <div className="about-content">
                        <ul>
                            <li>
                                <span className="about-value">{pokemon.weight / 10} kg</span>
                                <span className="about-name">Weight</span>
                            </li>
                            <li>
                                <span className="about-value">{pokemon.height / 10} m</span>
                                <span className="about-name">Height</span>
                            </li>
                        </ul>

                    </div>
                    <h4>Base Stats</h4>
                    <div className="stats-content">
                        <ul>
                            {pokemon.stats.map((stat) => (
                                <li key={stat.stat.name}>
                                    <span className="stat-name">{stat.stat.name}</span>
                                    <span className="stat-value">{stat.base_stat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h4>Abilities</h4>
                    <div className="ability-content">
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
                </div>
                }
                {loading && <p>Loading...</p>}
                {Object.keys(pokemon).length === 0 && error && <p>Er ging iets mis bij het zoeken van de Pokémons...</p>}
            </InfoCardPopup>
        </>
    );
}



export default SmallInfoCard
