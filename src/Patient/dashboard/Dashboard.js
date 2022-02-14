

import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import './Dashboard.css'
import '../clinicListing/ClinicListing.css'

const PatientDashboard = () => {
    const options = {
        items: 1,
        loop: true,
        nav: false,
        dots: true
    };

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Dashboard</h1>
                    </div>

                    <div className='repeat-white-bx welcome-msg-bx dashboard-col'>
                        <h2>Welcome to Clinical Trial Link <img src="/images/confetti-icon.svg" alt="confetti" width={50} /></h2>
                        <p>Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.</p>
                    </div>

                    <div className="row dashboard-col">
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

                    <div className='row dashboard-col'>
                        <div className='col-lg-6'>
                            <div className="heading-bx">
                                <h1>Recommended Clinics</h1>
                            </div>
                            <OwlCarousel {...options}>
                                <div className='item'>
                                    <Link to="/patient/trial-clinic-details">
                                        <div className='clinic-list-bx'>
                                            <div className='clinic-img'>
                                                <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                            </div>
                                            <div className='clinic-info'>
                                                <h2>Barnes Jewish Hospital</h2>
                                                <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,</p>
                                                <span className="away-from">5000.52 Mi</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='item'>
                                    <Link to="/patient/trial-clinic-details">
                                        <div className='clinic-list-bx'>
                                            <div className='clinic-img'>
                                                <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                            </div>
                                            <div className='clinic-info'>
                                                <h2>Barnes Jewish Hospital</h2>
                                                <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,</p>
                                                <span className="away-from">5000.52 Mi</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='item'>
                                    <Link to="/patient/trial-clinic-details">
                                        <div className='clinic-list-bx'>
                                            <div className='clinic-img'>
                                                <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                            </div>
                                            <div className='clinic-info'>
                                                <h2>Barnes Jewish Hospital</h2>
                                                <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,</p>
                                                <span className="away-from">5000.52 Mi</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </OwlCarousel>
                        </div>

                        <div className='col-lg-6 offers-slider'>
                            <div className="heading-bx">
                                <h1>Offers</h1>
                            </div>
                            <OwlCarousel {...options}>
                                <div className='item'>
                                    <Link to="/">
                                        <img src="/images/offers-img1.jpg" alt="offers" />
                                    </Link>
                                </div>
                                <div className='item'>
                                    <Link to="/">
                                        <img src="/images/offers-img1.jpg" alt="offers" />
                                    </Link>
                                </div>
                                <div className='item'>
                                    <Link to="/">
                                        <img src="/images/offers-img1.jpg" alt="offers" />
                                    </Link>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientDashboard;
