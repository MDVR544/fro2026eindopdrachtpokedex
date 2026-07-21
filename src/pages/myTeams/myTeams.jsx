import './myTeams.css' ;
import {useContext, useEffect, useState} from "react";
 import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";

// knop, "add to team"
// als je op de knop drukt komt er een scherm omhoog waar je een team naam kan invoeren,
// en als beschikbaar er een select functie is met alle beschikbare teams.
// team naam moet opgeslagen worden onder "teams" in backend
// op teams pagina moet dan weergegeven worden, pokemonTeams.

// in component infoCardPopUp een component maken "addToTeam" die dan een scherm omhoog geeft
// waar je uit de beschikbare teams kan kiezen.

// op teams pagina, formulier maken waar je een team kan aanmaken.

// add team name moet apart component worden.




// limiet aan aantal pokemons in 1 team:
// 1. Haal alle Pokémon van dit team op.
// 2. Tel hoeveel records er zijn.
// 3. Zijn het er al 6?
//     Ja → foutmelding.
//     Nee → nieuwe Pokémon toevoegen.

// verwijder functie:
// 1. Zoek alle TeamPokemon-records met teamId.
// 2. Verwijder die TeamPokemon-records.
// 3. Verwijder daarna team.

function MyTeams(){
    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [teamName, setTeamName] = useState('')
    const [userTeams, setUserTeams] = useState([]);

    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);



    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post(`${noviEndPoint}teams`, {
                    name: teamName,
                    userId: user.id
                },
                {
                    headers:
                        {
                            'novi-education-project-id': noviProjectId,
                            Authorization: `Bearer ${ token }`,
                        }}
            );

        } catch(e) {
            console.error(e);
            toggleError(true);
        }
        finally{
            toggleLoading(false);
        }
    }

    //------------------------------------------------------------------------------------------
    useEffect(() => {
        const controller = new AbortController();


    async function fetchUserTeams() {
        toggleError(false);
        toggleLoading(true);

        try {
            const {data} = await axios.get(`${noviEndPoint}users/${user.id}/teams` ,
                {
                    headers:
                        {
                            'novi-education-project-id': noviProjectId,
                            Authorization: `Bearer ${ token }`,
                        }
                });
            setUserTeams(data)

        } catch(e) {
            console.error(e);
            toggleError(true);

        }
        finally{
            toggleLoading(false);
        }
    }
        fetchUserTeams()
        return function cleanup() {
            controller.abort();
        }
    }, []);


    //------------------------------------------------------------------------------------------

    return (
        <>
            <h1>My Teams page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="team-name-field">
                    <input
                        type="name"
                        id="team-name-field"
                        name="teamName"
                        placeholder="add team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </label>

                {error && <p>This team already exist, please select a different team name</p>}

                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    Create team
                </button>
            </form>

            <div>
                {userTeams.map((team) => {
                    return  <h3 key={team.id}>{team.name}</h3>
                })}

            </div>

        </>
    );
}

export default MyTeams;