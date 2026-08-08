

function IdFormater(id) {
    const pokeID = String(id).padStart(4,'0');
    return `#${pokeID}`;
}

export default IdFormater