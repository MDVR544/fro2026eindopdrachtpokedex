import './filterSection.css';
import Pokeball from "../pokeball/pokeball.jsx";
import InputField from "../inputField/inputField.jsx";
import GetType from "../../helpers/getType/getType.jsx";


function FilterSection({ name, inputType, label, value, changeHandler, placeholder, searchPokemon, typeData, setCurrentType}) {


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
                    <Pokeball type= 'submit'>
                        Search
                    </Pokeball>
                </form>
            </div>



            <div className="typeSelection">
                <h4>type</h4>
                {typeData &&
                    typeData.results.map((type) => {
                return(
                <button
                    key={type.name}
                    className={GetType(type.name)}
                    type="button"
                    onClick={()=> {setCurrentType(type.name)}}>
                    {type.name}
                </button>
                    );
                })
            }
            </div>
            <div className="filterButtons">
                <span>

                    <Pokeball>
                        Reset
                    </Pokeball>
                </span>
            </div>
        </div>
    </>
    );
}

export default FilterSection;