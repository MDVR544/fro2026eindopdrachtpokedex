import './pokedex.css' ;
import {useEffect, useState} from "react";
import axios from 'axios';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import SmallInfoCard from "../../Components/infoCardTile/infoCardTile.jsx";
import Button from "../../Components/normal button/normal button.jsx";
import FilterSection from "../../Components/FilterSection/filterSection.jsx";

function Pokedex(){
    const pokemonApi = import.meta.env.VITE_API_POKEMON;

    const [pokemon, setPokemons] = useState({});
    const [filtersActive, toggleFiltersActive] = useState (false);
    const [searchInput, setSearchInput] = useState ("");
    const [searchResult, setSearchResult] = useState(null)
    const [typeFilteredPokemon, setTypeFilteredPokemon] = useState ([]);
    const [searchGeneration, setSearchGeneration] = useState([]);
    const [selectedGen, setSelectedGen] = useState('');
    const [favoritePokemon, setFavoritePokemon] = useState([]);
    const [isChecked, setIsChecked] = useState(false)
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

    async function searchPokemon(searchInput) {
        toggleLoading(true);
        toggleError(false);

        try {
            const {data} = await axios.get(`${pokemonApi}${searchInput}`, {
            });
            toggleFiltersActive(true);
            console.log(data)
            setSearchResult(data);
            setIsChecked(false);
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

function resetTypeSearch(){
    setSearchResult(null);
    setTypeFilteredPokemon([]);
    toggleFiltersActive(false);
    setSearchInput("");
    setSearchGeneration([]);
    setSelectedGen('');
    setFavoritePokemon([])
}

    return (
        <div className="pokedex-page">
            <FilterSection
                name= 'search-pokemon'
                label='search-name'
                inputType= 'text'
                placeholder='pokemon name'
                value= {searchInput}
                toggleLoading={toggleLoading}
                loading={loading}
                toggleError={toggleError}
                changeHandler= {setSearchInput}
                searchPokemon={searchPokemon}
                resetTypeSearch={resetTypeSearch}
                setSearchResult={setSearchResult}
                toggleFiltersActive={toggleFiltersActive}
                setSearchGeneration={setSearchGeneration}
                selectedGen={selectedGen}
                setSelectedGen={setSelectedGen}
                setTypeFilteredPokemon={setTypeFilteredPokemon}
                setFavoritePokemon={setFavoritePokemon}
                setIsChecked={setIsChecked}
                isChecked={isChecked}
            />
            <div className="info-content">
                <section>
                    {loading && <p>Loading...</p>}
                    {Object.keys(pokemon).length > 0 &&
                    <article className="pokemon-tiles">
                        {searchResult ? (
                             <SmallInfoCard key={searchResult.name} endpoint={`${pokemonApi}/${searchResult.id}`}/>
                            ) :
                            typeFilteredPokemon.length > 0 ? (
                                typeFilteredPokemon.map((pokemon) => {
                                    return <SmallInfoCard key={pokemon.pokemon.name} endpoint={pokemon.pokemon.url}/>
                                })
                                    ) :
                                searchGeneration.length > 0 ? (
                                        searchGeneration.map((pokemon) => {
                                            return <SmallInfoCard key={pokemon.name} endpoint={`${pokemonApi}${pokemon.name}`}/>
                                        })
                                    ) :
                                    favoritePokemon.length > 0 ? (
                                    favoritePokemon.map((favoritePokemon) => {
                                        return <SmallInfoCard key={favoritePokemon.id} endpoint={`${pokemonApi}/${favoritePokemon.pokemonId}`}/>
                                        })
                                    ) :
                                pokemon.results.map((pokemon) => {
                                    return <SmallInfoCard key={pokemon.name} endpoint={pokemon.url}/>
                        })}
                    </article>
                }
                    {filtersActive === false &&
                        <div className="navigation-buttons">
                        <Button
                            disabled={!pokemon.previous}
                            clickHandler={() => setEndpoint(pokemon.previous)}
                        >
                            <SlArrowLeft />
                        </Button>
                        <Button
                            disabled={!pokemon.next}
                            clickHandler={() => setEndpoint(pokemon.next)}
                        >
                            <SlArrowRight />
                        </Button>
                    </div> }
                {pokemon.length === 0 && error && <p>Er ging iets mis bij het zoeken van deze Pokémon...</p>}
                </section>
            </div>
        </div>
    );
}

export default Pokedex