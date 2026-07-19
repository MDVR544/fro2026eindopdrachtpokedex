import './infoCardPopup.css';
import SetFavorite from "../../helpers/setFavorite/setFavorite.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function InfoCardPopup(props) {
    const { isAuth } = useContext(AuthContext);

    return(props.trigger) ? (
<>
    <div className="large-view">
    <article className="large-view-content">
        {props.children}
    </article>

        <button className="btn-close" type="button" onClick={() => props.setTrigger(false)}>
            X
        </button>
        { isAuth &&
            <SetFavorite
            pokemonId={props.pokemonId}
        />
        }
    </div>
</>
    ) : "";
}

export default InfoCardPopup