import './filterSection.css';
import TypeButton from "../typeButton/typeButton.jsx";
import Pokeball from "../pokeball/pokeball.jsx";

function FilterSection() {

    return (
    <>
        <div className="searchSelection">
            <h1>Search Pokémon</h1>
            <input type="text"/>
        </div>
        <div className="typeSelection">
            <h4>type</h4>
            <TypeButton />
        </div>
        <div className="filterButtons">
            <span>
                <Pokeball>
                    Search
                </Pokeball>
                <Pokeball>
                    Reset
                </Pokeball>
            </span>
        </div>
    </>

    );
}

export default FilterSection;