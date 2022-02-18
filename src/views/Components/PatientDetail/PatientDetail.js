import Button from "../Common/Buttons/Buttons";

const PatientDetail = ({ phoneNumber, gender, state, zipCode, dob, trialFor, seekingTrialsFor, condition, doctorProfileImg, doctorName, doctorPhoneNumber }) => {
    return (
        <>
            <div className='row patient-detail-row'>
                <div className='col-lg-6'>
                    <div>
                        <h4>Phone Number</h4>
                        <h2>{phoneNumber}</h2>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div>
                        <h4>Gender</h4>
                        <h2>{gender}</h2>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div>
                        <h4>State</h4>
                        <h2>{state}</h2>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div>
                        <h4>Zip Code</h4>
                        <h2>{zipCode}</h2>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div>
                        <h4>Date Of Birth</h4>
                        <h2>{dob}</h2>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div>
                        <h4>Trials for</h4>
                        <h2>{trialFor}</h2>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div>
                        <h4>Seeking Trials for</h4>
                        <h2>{seekingTrialsFor}</h2>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div>
                        <h4>Condition</h4>
                        <h2>{condition}</h2>
                    </div>
                </div>
            </div>
            <div className='invite-col'>
                <h2>Primary Physician Details</h2>
                <div className='invite-col-inner'>
                    <div className='doctor-img'>
                        <img src={`/images/${doctorProfileImg}`} alt="doctor" />
                    </div>
                    <div className='doctor-detail'>
                        <div>
                            <h2>{doctorName}</h2>
                            <p>{doctorPhoneNumber}</p>
                        </div>
                        <div>
                            <Button
                                isButton="true"
                                BtnColor="primary btn-sm"
                                BtnText="Invite"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientDetail;
