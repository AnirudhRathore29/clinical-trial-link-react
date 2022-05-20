import { Link } from 'react-router-dom';
import './ListBox.css';

const ListBox = ({ index, className, imgUrl, location, description, title, distance }) => {
    return (
        <Link to="/trial-clinic/sponsors-details" key={index}>
            <div className={`clinic-list-bx ${className}`}>
                <div className='clinic-img'>
                    <img src={`/images/${imgUrl}`} alt="clinic-img" />
                </div>
                <div className='clinic-info'>
                    <h2>{title}</h2>
                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> {location}</p>
                    <p className='description'>{description}</p>
                    <span className="away-from">{distance}</span>
                </div>
            </div>
        </Link>
    );
};

export default ListBox;
