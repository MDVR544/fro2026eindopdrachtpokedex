import './pokeball.css';

function Pokeball( {children, type}){

    return(
        <button
            className="Pokéball"
            type={type}
        >
            {children}
        </button>
    );
}

export default Pokeball