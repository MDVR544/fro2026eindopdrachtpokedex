import './pokedex.css' ;
import {useEffect, useState} from "react";
import axios from 'axios';
import SmallInfoCard from "../../Components/infoCardTile/infoCardTile.jsx";
import Button from "../../Components/normal button/normal button.jsx";
import FilterSection from "../../Components/FilterSection/filterSection.jsx";



function Pokedex(){
    const pokemonApi = import.meta.env.VITE_API_POKEMON;
    const typeApi = import.meta.env.VITE_API_TYPE;
    // const genApi = import.meta.env.VITE_API_GEN;
    // const baseUrlAPi= import.meta.env.VITE_API_BASE_URL


    const [pokemon, setPokemons] = useState({});
    const [filtersActive, toggleFiltersActive] = useState (false);
    const [searchInput, setSearchInput] = useState ("");
    const [searchResult, setSearchResult] = useState(null)
    const [type, setType] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [typeFilteredPokemon, setTypeFilteredPokemon] = useState ([])
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
                // console.log(data.damage_relations.double_damage_from);
                // nieuwe usestate toCounterType setToCounterType en daar sla je data.damage_relations.double_damage_from in op
                // dit is een array met 3 objecten.
                // ipv gelijk de pokemon lijst aan te passen plaatsen we een tekst die aangeeft welke types sterk zijn tegen je geselecteerde type.
                // dit moet ook werken als je een pokemon zoekt.
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

    async function searchPokemon(input) {
        toggleLoading(true);
        toggleError(false);

        try {
            const {data} = await axios.get(`${pokemonApi}/${input}`, {
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
function resetFilters(){
    setSearchResult(null);
    setTypeFilteredPokemon([]);
    toggleFiltersActive(false);
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
                setSelectedType={setSelectedType}
                resetFilters={resetFilters}
            />
            <div className="info-content">
                <section>
                    {Object.keys(pokemon).length > 0 &&
                    <article className="pokemon-tiles">
                        {searchResult ?
                            (<SmallInfoCard key={searchResult.name} endpoint={`${pokemonApi}/${searchResult.id}`}/>
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