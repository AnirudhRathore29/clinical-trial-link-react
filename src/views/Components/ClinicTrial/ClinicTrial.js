const ClinicTrial = ({ onClick, title, description, status, iconType, iconColor, className, ShareFav }) => {
    return (
        <>
            <div className={`item clinicalTrial-bx ${className}`} onClick={onClick}>
                <h2>{title}</h2>
                <p>{description}</p>
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