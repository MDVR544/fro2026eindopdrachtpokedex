import './myTeams.css' ;
import {useContext, useEffect, useState} from "react";
 import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import SmallInfoCard from "../../Components/infoCardTile/infoCardTile.jsx";
import Pokeball from "../../Components/pokeball/pokeball.jsx";

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

    async function deletePokemonFromTeam(teamId, pokemonId) {
        toggleError(false);
        toggleLoading(true);

        try {
            const deletePokemonId = userPokemonTeams.find((pokemonTeam) => {
                return (
                    Number(pokemonTeam.teamId) === Number(teamId) &&
                    Number(pokemonTeam.pokemonId) === Number(pokemonId)
                );
            });

                await axios.delete(
                    `${noviEndPoint}pokemonTeams/${deletePokemonId.id}`,
                    {
                        headers: {
                            'novi-education-project-id': noviProjectId,
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            setUserPokemonTeams(userPokemonTeams.filter((pokemonTeam) => {
                   return   pokemonTeam.id !== deletePokemonId.id
                })
            );
        } catch (e) {
            console.error(e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }


    return (
        <div className="my-teams-page-content">
            <div className="add-team-container">
                <p>Want to prepare for your next adventure or you want to see how your perfect team would look?
                then start here with creating your team! click on the pokémon card to add them to your created team.</p>
            <form
                onSubmit={handleSubmit}
                className="form-create-team"
            >
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
                <Pokeball
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    Create team
                </Pokeball>

            </form>
            </div>
            <div>
                {userTeams.map((team) => {
                    const filteredTeam = userPokemonTeams.filter((userPokemon) => {
                        return Number(userPokemon.teamId) === team.id;
                    });

                    return (
                        <div
                            key={team.id}
                            className="team-container"
                        >
                            <div className="team-container-header-content">
                                <h1>{team.name}</h1>
                            <Pokeball
                                type="button"
                                className="delete-team-button"
                                onClick={()=>{deleteUserTeam(team.id)}}
                                disabled={loading}
                            >
                                Delete team
                            </Pokeball>
                            </div>
                            <article className="pokemon-tiles">
                                {filteredTeam.map((pokemonTeam) => {
                                    return (
                                        <div
                                            key={pokemonTeam.id}
                                            className="pokemon-tiles-teams"
                                        >
                                        <SmallInfoCard
                                            endpoint={`${pokemonApi}/${pokemonTeam.pokemonId}`}
                                            showDeleteButton
                                            deleteFromTeam={() => {
                                                deletePokemonFromTeam(team.id, pokemonTeam.pokemonId);
                                            }}
                                        />
                                        </div>
                                    );
                                })}
                            </article>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MyTeams;