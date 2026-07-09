import './pokedex.css' ;
import {useEffect, useState} from "react";
import axios from 'axios';
import SmallInfoCard from "../../Components/infoCardTile/infoCardTile.jsx";
import Button from "../../Components/normal button/normal button.jsx";
import FilterSection from "../../Components/FilterSection/filterSection.jsx";



function Pokedex(){
    const pokemonApi = import.meta.env.VITE_API_POKEMON;
    const typeApi = import.meta.env.VITE_API_TYPE;

    // const baseUrlAPi= import.meta.env.VITE_API_BASE_URL


    const [pokemon, setPokemons] = useState({
        results: []
    });
    const [filteredPokemon, setFilteredPokemon] = useState ([])
    const [searchInput, setSearchInput] = useState ("");
    const [searchResult, setSearchResult] = useState(null)
    const [type, setType] = useState("");
    const [currentType, setCurrentType] = useState("");
    const [endpoint, setEndpoint] = useState(pokemonApi);
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

    useEffect(() => {
        const controller = new AbortController();

        async function fetchTypeData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(typeApi, {
                });
                setType(data);
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
        fetchTypeData();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchFilteredData(currentType) {

            if (!currentType) return;

            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(`${typeApi}${currentType}`, {
                });
                setFilteredPokemon(data.pokemon);
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
        fetchFilteredData(currentType);

        return function cleanup() {
            controller.abort();
        }
    }, [currentType]);


    async function searchPokemon(input) {
        toggleLoading(true);
        toggleError(false);

        try {
            const {data} = await axios.get(`${pokemonApi}/${input}`, {
            });
            setSearchResult({
                results: [
                    {
                        name: data.name,
                        url: `${pokemonApi}/${data.id}`
                    }
                ]
            });
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

    return (
        <div className="pokedex-page">
            <FilterSection
                name= 'search-pokemon'
                inputType= 'text'
                placeholder='pokemon name'
                value= {searchInput}
                changeHandler= {setSearchInput}
                searchPokemon={searchPokemon}
                typeData={type}
                setCurrentType={setCurrentType}
            />
            <div className="info-content">
                <section>
                  {pokemon &&
                    <article className="pokemon-tiles">


                        {searchResult ?
                            (<SmallInfoCard key={searchResult.results[0].name} endpoint={searchResult.results[0].url}/>
                            ) :
                            filteredPokemon.length > 0 ? (
                                filteredPokemon.map((pokemon) => {

                                    return <SmallInfoCard key={pokemon.pokemon.name} endpoint={pokemon.pokemon.url}/>
                                })
                                ) :
                                pokemon.results.map((pokemon) => {
                                    return <SmallInfoCard key={pokemon.name} endpoint={pokemon.url}/>
                        })}
                    </article>
                }
                    {!searchResult &&
                        <div className="navigation-buttons">
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
                    </div> }
                {loading && <p>Loading...</p>}
                {pokemon.length === 0 && error && <p>Er ging iets mis bij het zoeken van de Pokémons...</p>}
                </section>
            </div>
        </div>
    );
}

export default Pokedex