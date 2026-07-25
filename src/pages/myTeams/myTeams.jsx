import './myTeams.css' ;
import {useContext, useEffect, useState} from "react";
 import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import SmallInfoCard from "../../Components/infoCardTile/infoCardTile.jsx";

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

// controle op bestaande team naam


// verwijder functie:
// 1. Zoek alle TeamPokemon-records met teamId.
// 2. Verwijder die TeamPokemon-records.
// 3. Verwijder daarna team.




function MyTeams(){
    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;
    const pokemonApi = import.meta.env.VITE_API_POKEMON;


    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [succesMessage, toggleSuccesMessage] = useState(false);
    const [teamName, setTeamName] = useState('')
    const [userTeams, setUserTeams] = useState([]);
    const [userPokemonTeams, setUserPokemonTeams] = useState([]);

    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            const newTeam = await axios.post(`${noviEndPoint}teams`, {
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
            toggleSuccesMessage(true);
            setUserTeams([...userTeams, newTeam.data]);

        } catch(e) {
            console.error(e);
            toggleError(true);
        }
        finally{
            toggleLoading(false);
        }
    }

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

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUserPokemonTeams() {
            toggleError(false);
            toggleLoading(true);

            try {
                const {data} = await axios.get(`${noviEndPoint}users/${user.id}/pokemonTeams` ,
                    {
                        headers:
                            {
                                'novi-education-project-id': noviProjectId,
                                Authorization: `Bearer ${ token }`,
                            }
                    });
                setUserPokemonTeams(data)

            } catch(e) {
                console.error(e);
                toggleError(true);

            }
            finally{
                toggleLoading(false);
            }
        }
        fetchUserPokemonTeams()
        return function cleanup() {
            controller.abort();
        }
    }, []);


    async function deleteUserTeam(teamId) {
        toggleError(false);
        toggleLoading(true);

        try {
            const pokemonFromTeam = userPokemonTeams.filter((pokemonTeam) => {
                return Number(pokemonTeam.teamId) === Number(teamId);
            });

            await Promise.all(
                pokemonFromTeam.map((pokemonTeam) => {
                    return axios.delete(
                        `${noviEndPoint}pokemonTeams/${pokemonTeam.id}`,
                        {
                            headers: {
                                'novi-education-project-id': noviProjectId,
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                })
            );

            await axios.delete(
                `${noviEndPoint}teams/${teamId}`,
                {
                    headers: {
                        'novi-education-project-id': noviProjectId,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUserPokemonTeams(userPokemonTeams.filter((pokemonTeam) => {
                    return Number(pokemonTeam.teamId) !== Number(teamId)
                    })
                );

            setUserTeams(userTeams.filter((team) => team.id !== teamId));
        } catch (e) {
            console.error(e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

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
                {succesMessage && <p>Team has been added</p>}
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
                    const filteredTeam = userPokemonTeams.filter((userPokemon) => {
                        return Number(userPokemon.teamId) === team.id;
                    });

                    return (
                        <div key={team.id}>
                                <h3>{team.name}</h3>
                            <button
                                type="button"
                                onClick={()=>{deleteUserTeam(team.id)}}
                                disabled={loading}
                            >
                                Delete team
                            </button>
                            <article className="pokemon-tiles">
                                {filteredTeam.map((pokemonTeam) => {
                                    return (
                                        <SmallInfoCard
                                            key={pokemonTeam.id}
                                            endpoint={`${pokemonApi}/${pokemonTeam.pokemonId}`}
                                        />
                                    );
                                })}
                            </article>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default MyTeams;