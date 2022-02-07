

import { Link } from 'react-router-dom';

const PatientDashboard = () => {

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Dashboard</h1>
                    </div>
                    
                    <div className='repeat-white-bx welcome-msg-bx mb-5'>
                        <h2>Welcome to Clinical Trial Link <img src="/images/confetti-icon.svg" alt="confetti" width={50} /></h2>
                        <p>Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="dashboard-info-bx secondaryColor">
                                <Link to="">
                                    <span>
                                        <box-icon name='money' size="40px" color="#ffffff"></box-icon>
                                    </span>
                                    <div>
                                        <h2>$555.00</h2>
                                        <p>Total Compensation</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="dashboard-info-bx thirdColor">
                                <Link to="">
                                    <span>
                                        <box-icon name='calendar' type='solid' size="40px" color="#ffffff"></box-icon>
                                    </span>
                                    <div>
                                        <h2>25</h2>
                                        <p>My Appointments</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="dashboard-info-bx primaryColor">
                                <Link to="">
                                    <span>
                                        <box-icon name='money' size="40px" color="#ffffff"></box-icon>
                                    </span>
                                    <div>
                                        <h2>$555.00</h2>
                                        <p>Total Compensation</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='co-lg-6'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientDashboard;
