import './inputField.css';

function InputField({ name, inputType, label, value, changeHandler, placeholder}) {
    return (
        <>
            <label htmlFor={label}>
            <input
                name={name}
                id={label}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={(e) => changeHandler(e.target.value)}
            />
            </label>
        </>
    );
}

export default InputField;