import { useRef, useState } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { server } from '../../../redux/constants';

const ClinicTrial = ({ onClick, onClickFav, id, title, description, status, iconType, iconColor, className, ShareFav, dateTime, trialAmount, favBtnDisable }) => {
    const [tooltip, setTooltip] = useState(false);
    const target = useRef(null);

    console.log("iconType", iconType);

    const ShareTrial = () => {
        setTooltip(!tooltip)
        navigator.clipboard.writeText(server.frontBaseUrl + "patient/trial-clinic-details/" + id)
        setTimeout(() => {
            setTooltip(false)
        }, 1000);
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
                                { favBtnDisable ? null : <button className='icon-btn' onClick={onClickFav}><box-icon name='heart' type={iconType} color={iconColor}></box-icon></button> }
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