import './pokedex.css' ;
import {useEffect, useState} from "react";
import axios from 'axios';
import SmallInfoCard from "../../Components/infoCard/infoCards.jsx";
import Button from "../../Components/normal button/normal button.jsx";



function Pokedex(){
    const [pokemon, setPokemons] = useState([]);
    const [endpoint, setEndpoint] = useState(import.meta.env.VITE_API_POKEMON);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPokemonData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(endpoint, {
                    signal: controller.signal,
                });
                setPokemons(data);
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
        fetchPokemonData();

        return function cleanup() {
            controller.abort();
        }
    }, [endpoint]);


    return (
        <>
            {pokemon &&
                <div className="pokemon-overview">
                    {pokemon.results && pokemon.results.map((pokemon) => {
                        return <SmallInfoCard key={pokemon.name} endpoint={pokemon.url}/>
                    })}
                </div>
            }
            {loading && <p>Loading...</p>}
            {pokemon.length === 0 && error && <p>Er ging iets mis bij het zoeken van de Pokémons...</p>}

            <section className="navigation-buttons">
                <Button
                    disabled={!pokemon.previous}
                    clickHandler={() => setEndpoint(pokemon.previous)}
                >
                    Vorige
                </Button>
                <Button
                    disabled={!pokemon.next}
                    clickHandler={() => setEndpoint(pokemon.next)}
                >
                    Volgende
                </Button>
            </section>
        </>
    );
}

export default Pokedex