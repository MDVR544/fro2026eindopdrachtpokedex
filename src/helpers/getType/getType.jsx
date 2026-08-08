

function GetType(type){
    switch(type) {
        case 'bug':
            return 'bug'
        case 'dark':
            return 'dark'
        case 'dragon':
            return 'dragon'
        case 'electric':
            return 'electric'
        case 'fairy':
            return 'fairy'
        case 'fighting':
            return 'fighting'
        case 'fire':
            return 'fire'
        case 'flying':
            return 'flying'
        case 'ghost':
            return 'ghost'
        case 'grass':
            return 'grass'
        case 'ground':
            return 'ground'
        case 'ice':
            return 'ice'
        case 'poison':
            return 'poison'
        case 'psychic':
            return 'psychic'
        case 'rock':
            return 'rock'
        case 'steel':
            return 'steel'
        case 'water':
            return 'water'
        default:
            return 'normal'
    }
}

export default GetType;