import { Link } from 'react-router-dom'
import './Buttons.css';
import LoaderSpinner from '../Loader/LoaderSpinner';

const Button = (props) => {
    return (
        <>
            {
                props.isLink &&
                <Link
                    to={props.URL}
                    className={`btn btn-${props.BtnColor}`}
                >
                    {props.BtnText}
                    {props.hasIconImg && <img src={`/images/${props.IconImgPath}`} className="white-icon v-sub ms-2" width="23" alt="icon" />}
                </Link>
            }

            {
                props.isButton &&
                <button
                    type={props.BtnType}
                    className={`btn btn-${props.BtnColor}`}
                    onClick={props.onClick}
                    disabled={props.disabled}
                >
                    {props.BtnText}
                    {props.hasSpinner && <LoaderSpinner />}
                </button>
            }
        </>
    );
}

export default Button;