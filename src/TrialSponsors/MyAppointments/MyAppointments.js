import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial';
import '../../Patient/MyFavorites/MyFavorites.css';

const SponsorsMyAppointments = () => {

    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Appointments</h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="current_appointment" className="pricing-tabs" id="plans-tabs">
                                <Tab eventKey="current_appointment" title="Current">
                                    <div className='row text-start'>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="past_appointment" title="Past">
                                    <div className='row text-start'>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-primary'><box-icon name='check' size="18px" color="#ffffff"></box-icon> Completed</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-primary'><box-icon name='check' size="18px" color="#ffffff"></box-icon> Completed</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-primary'><box-icon name='check' size="18px" color="#ffffff"></box-icon> Completed</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-primary'><box-icon name='check' size="18px" color="#ffffff"></box-icon> Completed</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-primary'><box-icon name='check' size="18px" color="#ffffff"></box-icon> Completed</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
                                                />
                                            </Link>
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <Link to="/trial-sponsors/appointments-clinics">
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    title="Depression Associated with Bipolar Disorder"
                                                    status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                                    dateTime="Jan 25, 2022 (09:00 AM)"
                                                    trialAmount="To be Decided by Company"
                                                    ShareFav="false"
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

export default SponsorsMyAppointments;
