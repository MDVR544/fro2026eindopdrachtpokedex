import './pokeball.css';

function Pokeball( {children}){

    return(
        <button
            className="Pokéball"
            type="submit"
        >
            {children}
        </button>
    );
}

export default Pokeball