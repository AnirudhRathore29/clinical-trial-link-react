import './ListBox.css';
import { getImageUrl } from "./../../../redux/constants";

const ListBox = ({ className, imgUrl, location, state, description, title, distance, trialCount }) => {
    return (
        <div className={`clinic-list-bx ${className}`}>
            <div className='clinic-img'>
                <img src={imgUrl !== null ? imgUrl : "/images/placeholder-img.jpg"} alt="clinic-img" />
            </div>
            <div className='clinic-info'>
                <h2>{title}</h2>
                {trialCount !== undefined && <span className='badge badge-success mb-2'>Trials: {trialCount}</span>}
                <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> {location}, {state}</p>
                <p className='description'>{description}</p>
                {distance && <span className="away-from">{distance}</span>}
            </div>
        </div>
    );
};

export default ListBox;
