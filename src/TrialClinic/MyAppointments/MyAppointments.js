import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import MyAppointmentBx from '../../views/Components/MyAppointmentBx/MyAppointmentBx';
import '../../Patient/MyAppointments/MyAppointments.css';
import '../../Patient/ClinicListing/ClinicListing.css'

const ClinicMyAppointments = () => {
    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Appointments <span></span> </h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="current_appointment" className="pricing-tabs" id="plans-tabs">
                                <Tab eventKey="current_appointment" title="Current">
                                    <div className='row'>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img1.jpg"
                                                    title="Emerson Resources"
                                                    status="Recruiting"
                                                    statusClass="primary"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img2.jpg"
                                                    title="ABF Pharmaceutical"
                                                    status="Recruiting"
                                                    statusClass="primary"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img3.jpg"
                                                    title="Cambridge Biomedical"
                                                    status="Recruiting"
                                                    statusClass="primary"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img2.jpg"
                                                    title="ABF Pharmaceutical"
                                                    status="Recruiting"
                                                    statusClass="primary"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img1.jpg"
                                                    title="Emerson Resources"
                                                    status="Recruiting"
                                                    statusClass="primary"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img2.jpg"
                                                    title="Cambridge Biomedical"
                                                    status="Recruiting"
                                                    statusClass="primary"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img3.jpg"
                                                    title="ABF Pharmaceutical"
                                                    status="Recruiting"
                                                    statusClass="primary"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img2.jpg"
                                                    title="ABF Pharmaceutical"
                                                    status="Recruiting"
                                                    statusClass="primary"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="past_appointment" title="Past">
                                    <div className='row'>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list-past">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img1.jpg"
                                                    title="Barnes Jewish Hospital"
                                                    status="Cancel"
                                                    statusClass="danger"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list-past">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img2.jpg"
                                                    title="Barnes Jewish Hospital"
                                                    status="completed"
                                                    statusClass="success"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list-past">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img3.jpg"
                                                    title="Barnes Jewish Hospital"
                                                    status="completed"
                                                    statusClass="success"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list-past">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img1.jpg"
                                                    title="Barnes Jewish Hospital"
                                                    status="Cancel"
                                                    statusClass="danger"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list-past">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img1.jpg"
                                                    title="Barnes Jewish Hospital"
                                                    status="Cancel"
                                                    statusClass="danger"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list-past">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img2.jpg"
                                                    title="Barnes Jewish Hospital"
                                                    status="completed"
                                                    statusClass="success"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list-past">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img3.jpg"
                                                    title="Barnes Jewish Hospital"
                                                    status="completed"
                                                    statusClass="success"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <Link to="/trial-clinic/patient-list-past">
                                                <MyAppointmentBx
                                                    imgUrl="clinic-img1.jpg"
                                                    title="Barnes Jewish Hospital"
                                                    status="Cancel"
                                                    statusClass="danger"
                                                    location="Atlanta, Georgia, United States"
                                                    description="Bipolar Depression Study with 6 Month Open Label Therapy"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClinicMyAppointments;
