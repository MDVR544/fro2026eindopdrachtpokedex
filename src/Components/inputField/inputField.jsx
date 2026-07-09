import './inputField.css';

function InputField({ name, inputType, label, value, changeHandler, placeholder}) {
    return (
        <>
            <label>{label}</label>
            <input
                name={name}
                id={name}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={(e) => changeHandler(e.target.value)}
            />
        </>
    );
}

export default InputField;