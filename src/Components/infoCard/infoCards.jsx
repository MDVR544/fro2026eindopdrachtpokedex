import './infoCards.css';
import {useEffect, useState} from "react";
import axios from 'axios';

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
            <article className="poke-small-card">
                {console.log('Rerender is triggered')};
                {Object.keys(pokemon).length > 0 &&
                    <div>
                        <h2>{pokemon.name} {pokemon.id}</h2>
                        <button
                        type="button"
                        >
                            <img
                            alt="Afbeelding pokémon"
                            src={pokemon.sprites.front_default}
                            />
                        </button>
                        <ul>
                            {pokemon.types.map((type) => {
                                return (
                                    <li key={`${type.type.name}-${pokemon.name}`}>
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

function LargeInfoCard(){
    console.log('je hebt geklikt!')

    return (
        <>
            <article className="fullInfoCard">
                <div className="topButtons">
                    <button type="button"> add to favorites</button>
                    <button type="button"> Close tab</button>
                </div>
                <div className="headerContent">
                    <h2>Pokémon name</h2>
                    <h3>pokémon number</h3>
                </div>

                <img alt="placeholder img" src="/" />
                <div className="typeContent">
                    <p>Type 1</p>
                    <p>Type 2</p>
                </div>

                <h4>About</h4>
                <div className="aboutContent">
                    <ul>
                        <li>weight</li>
                        <li>height</li>
                        <li>Pokémon move</li>
                    </ul>
                </div>

                <p>informatie over de pokémon</p>

                <h4>Base Stats</h4>

                <ul className="baseStatsContent">
                    <li>HP</li>
                    <li>ATK</li>
                    <li>DEF</li>
                    <li>SATK</li>
                    <li>SDEF</li>
                    <li>SPD</li>
                </ul>

                <div className="bottomButtons">
                    <button type="button">Add to favorites</button>
                    <button type="button">Add to team</button>
                </div>
            </article>
        </>
    );
}

export {
    SmallInfoCard,
    LargeInfoCard,
}