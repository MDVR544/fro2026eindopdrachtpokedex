import './favorites.css';
import {useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext.jsx";

function Favorites({   toggleError,
                       toggleLoading,
                       loading,
                       setFavoritePokemon,
                       resetTypeSearch,
                       toggleFiltersActive,
                       setIsChecked,
                       isChecked,
                       setSearchGeneration,
                       setSelectedGen,
                       setSearchResult,
                       setTypeFilteredPokemon,
                       setSearchInput
                   }){

    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;

    const { user  } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const controller = new AbortController();


        async function fetchFavPokemonData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(`${noviEndPoint}users/${user.id}/favorites`,
                    {
                        signal: controller.signal,

                        headers:
                            {
                                'novi-education-project-id': noviProjectId,
                                Authorization: `Bearer ${token}`,
                            }
                    });

                setFavoritePokemon(data);
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

    const checkHandler = () => {
        setIsChecked(!isChecked);
        const showFavorites = !isChecked;

        if (showFavorites === true) {
            fetchFavPokemonData();
            setTypeFilteredPokemon([]);
            toggleFiltersActive(true);
            setSearchResult("");
            setSearchInput("");
            setSearchGeneration([]);
            setSelectedGen('');
        } else {
            controller.abort();
            resetTypeSearch();
        }
    }
    return (
        <div className="toggle-favorites-wrapper">
            <label htmlFor="checkbox"
                   className="toggle-favorites-content"
            >
            Show Favorites </label>
            <input type="checkbox"
                   id="checkbox"
                   className="toggle-favorites-checkbox"
                   checked={isChecked}
                   disabled={loading}
                   onChange={checkHandler}
            />
        </div>
    );
}

export default Favorites;