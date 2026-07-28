import './pokeball.css';

function Pokeball( {children, type, onClick}){

    return(
        <button
            className="Pokéball"
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Pokeball