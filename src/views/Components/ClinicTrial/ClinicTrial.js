import { useRef, useState } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSelector } from 'react-redux';

var jwt = require('jsonwebtoken');

const ClinicTrial = ({ onClick, onClickFav, id, title, description, status, iconType, iconColor, className, ShareFav, dateTime, trialAmount, favBtnDisable }) => {
    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)
    const isLoading = useSelector(state => state.patient.loading);
    // var url = profileDetails?.role === 2 ? "/patient/trial-listing/" : profileDetails?.role === 3 ? "/trial-clinic/sponsors-trial-listing/" : profileDetails?.role === 4 ? "/physician/trial-listing/" : null
    var url = "/patient/trial-listing/"


    const [tooltip, setTooltip] = useState(false);
    const target = useRef(null);

    console.log("iconType", iconType);
    console.log("profileDetails", profileDetails);
    console.log("location", window.location.origin);

    const ShareTrial = () => {
        setTooltip(!tooltip)
        console.log("navigator.clipboard", navigator.clipboard);
        navigator.clipboard
            .writeText(window?.location?.origin + url + id)
            .then(() => {
                setTimeout(() => {
                    setTooltip(false)
                }, 1000);
            })
            .catch(() => {
                alert("something went wrong");
            });
    }

    return (
        <>
            <div className={`item clinicalTrial-bx ${className}`}>
                <h2 onClick={onClick}>{title}</h2>
                {description &&
                    <p className="description" onClick={onClick}>{description}</p>
                }
                {dateTime &&
                    <p className="hasIcon-p"><box-icon name='calendar' color="#356AA0" size="20px"></box-icon> {dateTime}</p>
                }
                {trialAmount &&
                    <p className="hasIcon-p"><box-icon name='dollar-circle' color="#356AA0" size="20px"></box-icon> {trialAmount}</p>
                }
                <div className='clinicalTrial-bx-ftr'>
                    {status}
                    {
                        ShareFav ?
                            null
                            :
                            <div>
                                {favBtnDisable ? null : <button className='icon-btn' disabled={isLoading} onClick={onClickFav}><box-icon name='heart' type={iconType} color={iconColor}></box-icon></button>}
                                <button className='icon-btn' ref={target} onClick={ShareTrial}><box-icon name='share-alt' color={iconColor}></box-icon></button>

                                <Overlay target={target.current} show={tooltip} placement="top">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}> URL Copied! </Tooltip>
                                    )}
                                </Overlay>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}

ClinicTrial.defaultProps = {
    iconColor: "#ffffff"
}

export default ClinicTrial;