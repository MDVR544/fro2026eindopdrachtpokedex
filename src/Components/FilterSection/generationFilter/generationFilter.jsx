import './generationFilter.css'
import {useEffect, useState} from "react";
import axios from "axios";
import GenerationConverter from "../../../helpers/generationConverter/generationConverter.jsx";
import Pokeball from "../../pokeball/pokeball.jsx";

function GenerationFilter ({ toggleLoading,
                             toggleError,
                             setSearchResult,
                             toggleFiltersActive,
                             setSearchGeneration,
                             selectedGen,
                             setSelectedGen,
                             setTypeFilteredPokemon,
                             setSearchInput})
{
    const genApi = import.meta.env.VITE_API_GEN
    const [generations, setGenerations] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchGenData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(genApi, {
                });
                setGenerations(data.results);

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
        fetchGenData();

        return function cleanup() {
            controller.abort();
        }
    }, []);


    async function fetchGenFilteredData(e) {
        e.preventDefault();

            if (!selectedGen) return;

            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(`${genApi}${selectedGen}`, {
                });
                setSearchResult(null);
                toggleFiltersActive(true);
                setTypeFilteredPokemon([]);
                setSearchInput("");
                setSearchGeneration(data.pokemon_species);
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

return(
    <div className="generation-filter">
                <select
                    name="generation"
                    id="generation-select"
                    value={selectedGen}
                    onChange={(e)=>{setSelectedGen(e.target.value)}}
                >
                    <option value="">
                        choose a generation
                    </option>
                    {generations.map((generation)=>{
                        return <option
                            key={generation.name}
                            value={generation.name}
                        >
                            {GenerationConverter(generation.name)}
                        </option>
                    })}
                </select>
        <Pokeball
            type="button"
            onClick={(e)=>fetchGenFilteredData(e)}>
            search
        </Pokeball>
    </div>
)

}

export default GenerationFilter