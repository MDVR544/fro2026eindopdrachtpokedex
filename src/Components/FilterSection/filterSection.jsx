import './filterSection.css';
import InputField from "../inputField/inputField.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import GenerationFilter from "./generationFilter/generationFilter.jsx";
import TypeFilter from "./typeFilter/typeFilter.jsx";
import BattleAdvise from "./battleAdvise/battleAdvise.jsx";
import axios from "axios";

function FilterSection({   name,
                           inputType,
                           label,
                           value,
                           toggleLoading,
                            toggleError,
                           changeHandler,
                           placeholder,
                           searchPokemon,
                           resetTypeSearch,
                           setSearchResult,
                           toggleFiltersActive,
                           setSearchGeneration,
                           selectedGen,
                           setSelectedGen,
                           setTypeFilteredPokemon
                       })
{
    const { isAuth } = useContext(AuthContext);
    const typeApi = import.meta.env.VITE_API_TYPE;

    const [type, setType] = useState("");

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


    return (
    <>
        <div className="filter-side-bar">
            <div className="searchSelection">
                <h1>Search Pokémon</h1>
                <div>
                    <InputField
                        label={label}
                        name={name}
                        inputType={inputType}
                        placeholder={placeholder}
                        value={value}
                        changeHandler={changeHandler}
                    />
                    <button
                        type='button'
                        onClick={()=> {searchPokemon(value)}}
                    >
                         search
                    </button>
                    </div>
                <div>
                    <TypeFilter
                        toggleLoading={toggleLoading}
                        toggleError={toggleError}
                        setSearchResult={setSearchResult}
                        toggleFiltersActive={toggleFiltersActive}
                        setTypeFilteredPokemon={setTypeFilteredPokemon}
                        setSelectedGen={setSelectedGen}
                        type={type}
                        setSearchInput={changeHandler}
                    />
                    <GenerationFilter
                        toggleLoading={toggleLoading}
                        toggleError={toggleError}
                        setSearchResult={setSearchResult}
                        toggleFiltersActive={toggleFiltersActive}
                        setSearchGeneration={setSearchGeneration}
                        selectedGen={selectedGen}
                        setSelectedGen={setSelectedGen}
                        setTypeFilteredPokemon={setTypeFilteredPokemon}
                        setSearchInput={changeHandler}
                    />
                    <button
                        type= 'button'
                        onClick={()=> resetTypeSearch()}
                    >
                        reset search
                    </button>
                </div>
                { isAuth &&
                    <BattleAdvise
                        toggleLoading={toggleLoading}
                        toggleError={toggleError}
                        setSearchResult={setSearchResult}
                        toggleFiltersActive={toggleFiltersActive}
                        type={type}
                    />
                }
            </div>
        </div>
    </>
    );
}

export default FilterSection;