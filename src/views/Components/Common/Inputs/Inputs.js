import './Inputs.css';


export const InputText = (props) => {
    return (
        <div className={`form-group ${props.FormGroupClass}`}>
            <label>
                {props.labelText}
                {
                    props.required &&
                    <span className="text-danger"> *</span>
                }
            </label>
            <div className={props.isPassword && "hasIcon"}>
                <input
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    className={`form-control ${props.className}`}
                    placeholder={props.placeholder}
                    id={props.id}
                    onChange={props.onChange}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    hidden={props.isHidden}
                    disabled={props.isDisabled}
                    required={props.required}
                    autoComplete="off"
                    min={props.min}
                    max={props.max}
                />
                {
                    props.isPassword &&
                    <span
                        className={props.ChangeClass}
                        onClick={props.onClick}
                    >
                    </span>
                }
            </div>
        </div>
    );
}

export const SelectBox = (props) => {
    return (
        <div className={`form-group ${props.FormGroupClass}`}>
            <label>
                {props.labelText}
                {
                    props.required &&
                    <span className="text-danger"> *</span>
                }
            </label>
            <select
                name={props.name}
                className={`form-control ${props.className}`}
                id={props.id}
                onChange={props.onChange}
                required={props.required}
            >
                {
                    props.optionData
                }
            </select>
        </div>
    );
}

export const TextArea = (props) => {
    return (
        <div className={`form-group ${props.FormGroupClass}`}>
            <label>
                {props.labelText}
                {
                    props.required &&
                    <span className="text-danger"> *</span>
                }
            </label>
            <textarea
                name={props.name}
                id={props.id}
                className={`form-control ${props.className}`}
                placeholder={props.placeholder}
            ></textarea>
        </div>
    );
}