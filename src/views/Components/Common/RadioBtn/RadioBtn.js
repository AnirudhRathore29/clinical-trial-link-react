import './RadioBtn.css';

const RadioBtn = ({className, type, name, labelText, defaultChecked, onChange, value}) => {
    return (
        <label className={`radio-check-btn ${className}`}>
            <input type={type} name={name} defaultChecked={defaultChecked} onChange={onChange} value={value} />
            <span><i></i> {labelText}</span>
        </label>
    )
}

export default RadioBtn;