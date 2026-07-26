import './addPokemonToTeam.css';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import teamValidation from "../../helpers/teamValidation/teamValidation.jsx";


function AddPokemonToTeam({pokemonId}){
    const noviEndPoint = import.meta.env.VITE_NOVI_API;
    const noviProjectId = import.meta.env.VITE_NOVI_PROJECT_ID;

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [message, setMessage] = useState('');
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
            const {data} = await axios.get(`${noviEndPoint}users/${user.id}/pokemonTeams` ,
                {
                    headers:
                        {
                            'novi-education-project-id': noviProjectId,
                            Authorization: `Bearer ${ token }`,
                        }
                });
            const checkedTeam = {
                data,
                pokemonId,
                selectedTeam
            };

            const validationResult = teamValidation(checkedTeam);

            if (validationResult.fullTeam === true){
                setMessage('Maximum number of pokemons in one team has been reached')
            }else if(validationResult.existingPokemon === true){
                setMessage('This pokemon is already exist in selected team')
            }else {
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
            setMessage('Pokemon has been succesfully added to the team');
            }
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
                {message}
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
