import './filterSection.css';
import InputField from "../inputField/inputField.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import GenerationFilter from "./generationFilter/generationFilter.jsx";
import TypeFilter from "./typeFilter/typeFilter.jsx";
import BattleAdvise from "./battleAdvise/battleAdvise.jsx";
import axios from "axios";
import Pokeball from "../pokeball/pokeball.jsx";
import Favorites from "./favorites/favorites.jsx";

function FilterSection({   name,
                           inputType,
                           label,
                           value,
                           toggleLoading,
                           loading,
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
                           setTypeFilteredPokemon,
                           setFavoritePokemon,
                           setIsChecked,
                           isChecked
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
                <h2>Search Pokémon</h2>
                <div className="search-content">
                    <InputField
                        label={label}
                        name={name}
                        inputType={inputType}
                        placeholder={placeholder}
                        value={value}
                        changeHandler={changeHandler}
                    />
                    <Pokeball
                        type="button"
                        onClick={() => searchPokemon(value)}
                    >
                        Search
                    </Pokeball>
                    </div>
                </div>
                <div  className="filter-content">
                    <TypeFilter
                        toggleLoading={toggleLoading}
                        toggleError={toggleError}
                        setSearchResult={setSearchResult}
                        toggleFiltersActive={toggleFiltersActive}
                        setTypeFilteredPokemon={setTypeFilteredPokemon}
                        setSelectedGen={setSelectedGen}
                        type={type}
                        setSearchInput={changeHandler}
                        setIsChecked={setIsChecked}
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
                        setIsChecked={setIsChecked}
                    />
                    { isAuth &&
                        <Favorites
                            toggleLoading={toggleLoading}
                            toggleError={toggleError}
                            setFavoritePokemon={setFavoritePokemon}
                            resetTypeSearch={resetTypeSearch}
                            toggleFiltersActive={toggleFiltersActive}
                            loading={loading}
                            setIsChecked={setIsChecked}
                            isChecked={isChecked}
                            setSearchResult={setSearchResult}
                            setSearchGeneration={setSearchGeneration}
                            setSelectedGen={setSelectedGen}
                            setTypeFilteredPokemon={setTypeFilteredPokemon}
                            setSearchInput={changeHandler}
                        />
                    }
                </div>
            <div className="btn-reset">
                <Pokeball
                    type= 'button'
                    onClick={()=> resetTypeSearch()}>
                    reset search
                </Pokeball>
            </div>
                <div className="auth-content">
                { isAuth &&
                    <BattleAdvise
                        toggleLoading={toggleLoading}
                        toggleError={toggleError}
                        type={type}
                    />
                }
                </div>
            </div>

    </>
    );
}

export default FilterSection;