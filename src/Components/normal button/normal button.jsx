import "./normal button.css";

function Button({ children, type = "button", disabled, clickHandler }) {
    return (
        <button
            type={type}
            className="normalButton"
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
export default Button