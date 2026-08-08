

function GenerationConverter(generation){
    switch (generation) {
        case "generation-i":
            return "Generation 1";
        case "generation-ii":
            return "Generation 2";
        case "generation-iii":
            return "Generation 3";
        case "generation-iv":
            return "Generation 4";
        case "generation-v":
            return "Generation 5";
        case "generation-vi":
            return "Generation 6";
        case "generation-vii":
            return "Generation 7";
        case "generation-viii":
            return "Generation 8";
        case "generation-ix":
            return "Generation 9";
        default:
            return generation
    }
}

export default GenerationConverter