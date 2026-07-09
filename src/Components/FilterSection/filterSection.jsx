import './filterSection.css';
import InputField from "../inputField/inputField.jsx";
import GetType from "../../helpers/getType/getType.jsx";


function FilterSection({ name,
                           inputType,
                           label,
                           value,
                           changeHandler,
                           placeholder,
                           searchPokemon,
                           typeData,
                           setSelectedType,
                           resetFilters,
                           })
{
    function handleSubmit(e) {
        e.preventDefault();
        searchPokemon(value);
    }

    return (
    <>
        <div className="filter-side-bar">
            <div className="searchSelection">
                <h1>Search Pokémon</h1>

                <form onSubmit={handleSubmit}>
                <InputField
                    label={label}
                    name={name}
                    inputType={inputType}
                    placeholder={placeholder}
                    value={value}
                    changeHandler={changeHandler}
                    searchPokemon={searchPokemon}
                />

                    <div className="typeSelection">
                        <h4>type</h4>
                        {typeData &&
                            typeData.results.map((type) => {
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
                    <button type= 'submit'>
                        Search
                    </button>
                    <button
                        type= 'button'
                        onClick={()=> resetFilters()}
                    >
                        reset
                    </button>
                </form>
            </div>
        </div>
    </>
    );
}

export default FilterSection;