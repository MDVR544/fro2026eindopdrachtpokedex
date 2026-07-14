import './filterSection.css';
import InputField from "../inputField/inputField.jsx";
import GetType from "../../helpers/getType/getType.jsx";

function FilterSection({ name,
                         inputType,
                         label,
                         value,
                         changeHandler,
                         placeholder,
                         searchPokemon,
                         typeData,
                         setSelectedType,
                         setTypeToCounter,
                         typeToCounter,
                         weaknesses,
                         strengths,
                         resetTypeSearch,
                         resetBattleAdvise,
                         })
{

    return (
    <>
        <div className="filter-side-bar">
            <div className="searchSelection">
                <h1>Search Pokémon</h1>
                <div>
                    <InputField
                        label={label}
                        name={name}
                        inputType={inputType}
                        placeholder={placeholder}
                        value={value}
                        changeHandler={changeHandler}
                    />
                    <button type='button' onClick={()=> {searchPokemon(value)}}>
                         search
                    </button>
                </div>
                    <div className="typeSelection">
                        <h4>type</h4>
                        {typeData &&
                            typeData.results.map((type) => {
                                return(
                                    <button
                                        key={type.name}
                                        className={GetType(type.name)}
                                        type="button"
                                        onClick={()=> {setSelectedType(type.name)}}
                                    >
                                        {type.name}
                                    </button>
                                );
                            })
                        }
                    </div>
                <button
                    type= 'button'
                    onClick={()=> resetTypeSearch()}
                >
                    reset search
                </button>
                    <div className="battle-advise-section">
                        <h1>Battle Advise</h1>
                        <div className="typeSelection">
                            <h4>type</h4>
                                {typeData &&
                                    typeData.results.map((type) => {
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
                    </div>
                    <button
                        type= 'button'
                        onClick={()=> resetBattleAdvise()}
                    >
                        reset advise
                    </button>
            </div>
        </div>
    </>
    );
}

export default FilterSection;