const ClinicTrial = ({ onClick, title, description, status, iconType, iconColor, className, ShareFav, dateTime, trialAmount }) => {
    return (
        <>
            <div className={`item clinicalTrial-bx ${className}`} onClick={onClick}>
                <h2>{title}</h2>
                { description &&
                    <p className="description">{description}</p>
                }
                { dateTime &&
                    <p className="hasIcon-p"><box-icon name='calendar' color="#356AA0" size="20px"></box-icon> {dateTime}</p>
                }
                { trialAmount &&
                    <p className="hasIcon-p"><box-icon name='dollar-circle' color="#356AA0" size="20px"></box-icon> {trialAmount}</p>
                }
                <div className='clinicalTrial-bx-ftr'>
                    {status}
                    {
                        ShareFav ?
                        null
                        :
                        <div>
                            <button className='icon-btn'><box-icon name='heart' type={iconType} color={iconColor}></box-icon></button>
                            <button className='icon-btn'><box-icon name='share-alt' color={iconColor}></box-icon></button>
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