import './PatientListBx.css';

const PatientListBx = ({ imgUrl, description, patientName, status, statusClass, onClick }) => {
    return (
        <>
            <div className='patient-list-bx' onClick={onClick}>
                <div className='patient-img'>
                    <img src={`/images/${imgUrl}`} alt="patient" />
                </div>
                <div className='patient-details'>
                    <h2>{patientName}</h2>
                    <span className={`badge badge-${statusClass}`}>{status}</span>
                    <p>{description}</p>
                </div>
            </div>
        </>
    );
};

export default PatientListBx;
