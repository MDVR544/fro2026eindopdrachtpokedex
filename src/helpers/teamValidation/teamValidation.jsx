
function teamValidation(checkedTeam){

        const filteredData = checkedTeam.data.filter((pokemonTeam)=> {
        return Number(pokemonTeam.teamId) === Number(checkedTeam.selectedTeam);
        });

    const specifiekPokemon = filteredData.find((pokemon)=>{
        return Number(pokemon.pokemonId) === Number(checkedTeam.pokemonId);
    });

    const fullTeam = filteredData.length >= 6;
    const existingPokemon = Boolean(specifiekPokemon);

    return {
        fullTeam,
        existingPokemon
    };
}

export default teamValidation
