import GetType from "../../../helpers/getType/getType.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function BattleAdvise({ toggleLoading,
                        toggleError,
                        setSearchResult,
                        toggleFiltersActive,
                        type})
{
    const typeApi = import.meta.env.VITE_API_TYPE;

    const [strengths, setStrengths] = useState([])
    const [weaknesses, setWeaknesses] = useState ([]);
    const [typeToCounter, setTypeToCounter] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCounterTypeData(typeToCounter) {

            if (!typeToCounter) return;

            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await axios.get(`${typeApi}${typeToCounter}`, {
                });
                setSearchResult(null);
                toggleFiltersActive(true);
                setStrengths(data.damage_relations.double_damage_to)
                setWeaknesses(data.damage_relations.double_damage_from);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled...');
                } else {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }
        fetchCounterTypeData(typeToCounter);

        return function cleanup() {
            controller.abort();
        }
    }, [typeToCounter]);

    function resetBattleAdvise(){
        setTypeToCounter("");
    }

    return(
        <>
            <div className="battle-advise-section">
                <h1>Battle Advise</h1>
                <div className="typeSelection">
                    <h4>type</h4>
                    {type &&
                        type.results.map((type) => {
                            return(
                                <button
                                    key={type.name}
                                    className={GetType(type.name)}
                                    type="button"
                                    onClick={()=> {setTypeToCounter(type.name)}}
                                >
                                    {type.name}
                                </button>
                            );
                        })
                    }
                </div>
                <div className="notification-section">
                    {typeToCounter ? (
                            <div className="strengths-weaknesses">
                                <h3>Strengths</h3>
                                <p>{typeToCounter} type is strong against:</p>
                                <ul>
                                    {strengths.length > 0 ? (
                                            strengths.map((strength)=>{
                                                return(
                                                    <li key={strength.name}>
                                                        {strength.name}
                                                    </li>
                                                )
                                            })
                                        ) :
                                        <p>no types available</p>
                                    }
                                </ul>
                                <h3>weaknesses</h3>
                                <p>{typeToCounter} type is weak against:</p>
                                <ul>
                                    {weaknesses.length > 0 ? (
                                            weaknesses.map((weakness)=>{
                                                return(
                                                    <li key={weakness.name}>
                                                        {weakness.name}
                                                    </li>
                                                )
                                            })
                                        ) :
                                        <p>no types available</p>
                                    }
                                </ul>
                            </div>
                        ) :
                        <h3>Choose a type to see its strengths and weaknesses</h3>
                    }
                </div>
                <button
                    type= 'button'
                    onClick={()=> resetBattleAdvise()}
                >
                    reset advise
                </button>
            </div>
        </>
    )
}

export default BattleAdvise