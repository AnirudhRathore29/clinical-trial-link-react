import './RadioBtn.css';

const RadioBtn = ({className, type, name, labelText, defaultChecked, onChange, value, checked}) => {
    return (
        <label className={`radio-check-btn ${className}`}>
            <input type={type} name={name} checked={checked} defaultChecked={defaultChecked} onChange={onChange} value={value} />
            <span><i></i> {labelText}</span>
        </label>
    )
}

export default RadioBtn;