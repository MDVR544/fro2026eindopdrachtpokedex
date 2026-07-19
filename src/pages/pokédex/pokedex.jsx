import './pokedex.css' ;
import {useEffect, useState} from "react";
import axios from 'axios';
import SmallInfoCard from "../../Components/infoCardTile/infoCardTile.jsx";
import Button from "../../Components/normal button/normal button.jsx";
import FilterSection from "../../Components/FilterSection/filterSection.jsx";

function Pokedex(){
    const pokemonApi = import.meta.env.VITE_API_POKEMON;
    const typeApi = import.meta.env.VITE_API_TYPE;

    const [pokemon, setPokemons] = useState({});
    const [filtersActive, toggleFiltersActive] = useState (false);
    const [searchInput, setSearchInput] = useState ("");
    const [searchResult, setSearchResult] = useState(null)
    const [type, setType] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [typeFilteredPokemon, setTypeFilteredPokemon] = useState ([]);
    const [typeToCounter, setTypeToCounter] = useState("");
    const [strengths, setStrengths] = useState([])
    const [weaknesses, setWeaknesses] = useState ([]);
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
                const {data} = await axios.get(`${typeApi}?limit=18&offset=0`, {
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

        async function fetchTypeFilteredData(selectedType) {

            if (!selectedType) return;

            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(`${typeApi}${selectedType}`, {
                });
                setSearchResult(null);
                toggleFiltersActive(true);
                setTypeFilteredPokemon(data.pokemon);
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
        fetchTypeFilteredData(selectedType);

        return function cleanup() {
            controller.abort();
        }
    }, [selectedType]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCounterTypeData(typeToCounter) {

            if (!typeToCounter) return;

            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(`${typeApi}${typeToCounter}`, {
                });
                setSearchResult(null);
                toggleFiltersActive(true);
                setStrengths(data.damage_relations.double_damage_to)
                setWeaknesses(data.damage_relations.double_damage_from);
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
        fetchCounterTypeData(typeToCounter);

        return function cleanup() {
            controller.abort();
        }
    }, [typeToCounter]);

    async function searchPokemon(searchInput) {
        toggleLoading(true);
        toggleError(false);

        try {
            const {data} = await axios.get(`${pokemonApi}/${searchInput}`, {
            });
            toggleFiltersActive(true);
            console.log(data)
            setSearchResult(data);
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
}

function resetBattleAdvise(){
        setTypeToCounter("");
    }

    return (
        <div className="pokedex-page">
            <FilterSection
                name= 'search-pokemon'
                label='search-name'
                inputType= 'text'
                placeholder='pokemon name'
                value= {searchInput}
                changeHandler= {setSearchInput}
                searchPokemon={searchPokemon}
                typeData={type}
                setSelectedType={setSelectedType}
                setTypeToCounter={setTypeToCounter}
                resetTypeSearch={resetTypeSearch}
                typeToCounter={typeToCounter}
                weaknesses={weaknesses}
                strengths={strengths}
                resetBattleAdvise={resetBattleAdvise}
            />
            <div className="info-content">
                <section>
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