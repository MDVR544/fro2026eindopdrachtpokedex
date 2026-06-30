import './infoCard.css';


function FullInfoCard(){

    return (
        <>
        <article className="fullInfoCard">
            <div className="topButtons">
                <button type="button"> add to favorites</button>
                <button type="button"> Close tab</button>
            </div>
            <div className="headerContent">
            <h2>Pokémon name</h2>
            <h3>pokémon number</h3>
            </div>

            <img alt="placeholder img" src="/" />
            <div className="typeContent">
            <p>Type 1</p>
            <p>Type 2</p>
            </div>

            <h4>About</h4>
            <div className="aboutContent">
            <ul>
                <li>weight</li>
                <li>height</li>
                <li>Pokémon move</li>
            </ul>
            </div>

            <p>informatie over de pokémon</p>

            <h4>Base Stats</h4>

            <ul className="baseStatsContent">
                <li>HP</li>
                <li>ATK</li>
                <li>DEF</li>
                <li>SATK</li>
                <li>SDEF</li>
                <li>SPD</li>
            </ul>

            <div className="bottomButtons">
            <button type="button">Add to favorites</button>
            <button type="button">Add to team</button>
            </div>
        </article>
        </>
    );
}


function SmallInfoCard(){

    return (
        <>
            <article className="smallInfoCard">
                <div className="topButtons">
                    <button type="button"> add to favorites</button>
                    <button type="button"> Close tab</button>
                </div>
                <div className="headerContent">
                    <h2>Pokémon name</h2>
                    <h3>pokémon number</h3>
                </div>

                <img alt="placeholder img" src="/" />
                <div className="typeContent">
                    <span>Type 1</span><span>Type 2</span>
                </div>
            </article>
        </>
    );
}

export {
    FullInfoCard,
    SmallInfoCard,
}