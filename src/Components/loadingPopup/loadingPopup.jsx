import './loadingPopup.css';


function LoadingPopup(){

    return(
        <div className="loading-screen">
            <div className="loading-content">
                <div className="spinningPokeball"></div>
                <p>Loading...</p>
            </div>
        </div>
    );
}

export default LoadingPopup
