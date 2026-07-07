import './filterSection.css';
import TypeButton from "../typeButton/typeButton.jsx";
import Pokeball from "../pokeball/pokeball.jsx";
import InputField from "../inputField/inputField.jsx";


function FilterSection({ name, inputType, label, value, changeHandler, placeholder, searchPokemon}) {


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