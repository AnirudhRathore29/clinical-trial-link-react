import { Link } from 'react-router-dom';

const DashboardInfoBx = ({className, URL, icon, info, title}) => {
    return (
        <>
            <div className={`dashboard-info-bx ${className}`}>
                <Link to={URL}>
                    <span>
                        {icon}
                    </span>
                    <div>
                        <h2>{info}</h2>
                        <p>{title}</p>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default DashboardInfoBx
;
