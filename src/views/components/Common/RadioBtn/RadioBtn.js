import './RadioBtn.css';

const RadioBtn = ({className, type, name, labelText, defaultChecked, onChange}) => {
    return (
        <label className={`radio-check-btn ${className}`}>
            <input type={type} name={name} defaultChecked={defaultChecked} onChange={onChange} />
            <span><i></i> {labelText}</span>
        </label>
    )
}

export default RadioBtn;