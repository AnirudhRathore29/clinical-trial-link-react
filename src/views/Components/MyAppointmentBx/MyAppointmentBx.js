import { getImageUrl } from '../../../redux/constants';
import './MyAppointmentBx.css';

const MyAppointmentBx = ({ className, imgUrl, visitNumber, onClick, title, time, location, state, status, statusClass, description }) => {
    return (
        <>
            <div
                className={`my-appointment-bx ${className}`}
                onClick={onClick}
            >
                <div className='my-appointment-img'>
                    <img src={imgUrl !== null ? getImageUrl() + imgUrl : "/images/placeholder-img.jpg"} alt="clinic-img" />
                </div>
                <div className='my-appointment-info'>
                    <h2>{title}</h2>
                    <span className={`badge badge-${statusClass} d-inline-block mb-3`}>{status}</span>
                    {visitNumber &&
                        <p className='location'><strong>Visit Number :</strong> {visitNumber}</p>
                    }
                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> {location}, {state}</p>
                    {time &&
                        <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> {time}</p>
                    }
                    {description &&
                        <p className='description'>{description}</p>
                    }
                </div>
            </div>
        </>
    );
};

export default MyAppointmentBx;
