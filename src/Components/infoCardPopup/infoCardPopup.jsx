import './infoCardPopup.css';

function InfoCardPopup(props) {

    return(props.trigger) ? (
<>
    <div className="large-view">
    <article className="large-view-content">
        {props.children}
    </article>

        <button className="btn-close" type="button" onClick={() => props.setTrigger(false)}>
            X
        </button>
    </div>
</>
    ) : "";
}

export default InfoCardPopup