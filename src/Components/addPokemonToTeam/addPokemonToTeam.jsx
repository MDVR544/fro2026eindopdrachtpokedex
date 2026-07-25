import './addPokemonToTeam.css';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function AddPokemonToTeam({pokemonId}){
    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [succesMessage, toggleSuccesMessage] = useState(false);
    const [teamNames, setTeamNames] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(0);

    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUserTeamNames() {
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
                setTeamNames(data)

            } catch(e) {
                console.error(e);
                toggleError(true);

            }
            finally{
                toggleLoading(false);
            }
        }
        fetchUserTeamNames()
        return function cleanup() {
            controller.abort();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post(`${noviEndPoint}pokemonTeams`, {
                    teamId: selectedTeam,
                    pokemonId: pokemonId,
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
        } catch(e) {
            console.error(e);
            toggleError(true);
        }
        finally{
            toggleLoading(false);
        }
    }

    return  (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="team-id-field">
                    <select
                        name="teams"
                        id="teams-select"
                        onChange={(e)=>{setSelectedTeam(e.target.value)}}
                    >
                        <option value="">
                            choose a team
                        </option>
                        {teamNames.map((teamName)=>{
                            return <option
                                key={teamName.id}
                                value={teamName.id}>
                                        {teamName.name}
                                    </option>
                        })}
                    </select>
                </label>
                {succesMessage && <p>Pokemon has been added to your team.</p>}
                {error && <p>something went wrong adding pokemon to the team</p>}
                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    Add to team
                </button>
            </form>
        </div>
    )
}

export default AddPokemonToTeam
