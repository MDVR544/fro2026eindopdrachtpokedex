import GetType from "../../../helpers/getType/getType.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


function TypeFilter({ toggleLoading,
                      toggleError,
                      setSearchResult,
                      toggleFiltersActive,
                      setTypeFilteredPokemon,
                      setSelectedGen,
                      type,
                      setSearchInput})
{
    const typeApi = import.meta.env.VITE_API_TYPE;

    const [selectedType, setSelectedType] = useState("");

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
                setSelectedGen('');
                setSearchInput("");
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


    return(
    <div className="typeSelection">
        <h4>type</h4>
        {type &&
            type.results.map((type) => {
                return(
                    <button
                        key={type.name}
                        className={GetType(type.name)}
                        type="button"
                        onClick={()=> {setSelectedType(type.name)}}
                    >
                        {type.name}
                    </button>
                );
            })
        }
    </div>
    )
}

export default  TypeFilter

