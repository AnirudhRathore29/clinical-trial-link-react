

import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import DashboardInfoBx from '../../views/Components/DashboardInfoBx/DashboardInfoBx'
import ListBox from '../../views/Components/ListBox/ListBox';
import WelcomeBx from '../../views/Components/WelcomeBx/WelcomeBx';
import 'owl.carousel/dist/assets/owl.carousel.css';
import './Dashboard.css';
import '../ClinicListing/ClinicListing.css';

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

                    <WelcomeBx />

                    <div className="row dashboard-col">
                        <div className="col-lg-4">
                            <DashboardInfoBx
                                className="thirdColor"
                                URL="/patient/my-appointments"
                                icon={<box-icon name='calendar' type='solid' size="40px" color="#ffffff"></box-icon>}
                                title="My Appointments"
                                info="25"
                            />
                        </div>
                        <div className="col-lg-4">
                            <DashboardInfoBx
                                className="secondaryColor"
                                URL="/patient/payment-history"
                                icon={<box-icon name='money' size="40px" color="#356AA0"></box-icon>}
                                title="Compensation Received"
                                info="$555.00"
                            />
                        </div>
                        <div className="col-lg-4">
                            <DashboardInfoBx
                                className="primaryColor"
                                URL="/patient/my-favorites"
                                icon={<box-icon type='solid' size="40px" color="#ffffff" name='happy-heart-eyes'></box-icon>}
                                title="My Favorites Trials"
                                info="15"
                            />
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
                                        <ListBox
                                            imgUrl="clinic-img1.jpg"
                                            title="Barnes Jewish Hospital"
                                            location="Atlanta, Georgia, United States"
                                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                            distance="5000.52 Mi"
                                        />
                                    </Link>
                                </div>
                                <div className='item'>
                                    <Link to="/patient/trial-clinic-details">
                                        <ListBox
                                            imgUrl="clinic-img1.jpg"
                                            title="Barnes Jewish Hospital"
                                            location="Atlanta, Georgia, United States"
                                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                            distance="5000.52 Mi"
                                        />
                                    </Link>
                                </div>
                                <div className='item'>
                                    <Link to="/patient/trial-clinic-details">
                                        <ListBox
                                            imgUrl="clinic-img1.jpg"
                                            title="Barnes Jewish Hospital"
                                            location="Atlanta, Georgia, United States"
                                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                            distance="5000.52 Mi"
                                        />
                                    </Link>
                                </div>
                            </OwlCarousel>
                        </div>

                        <div className='col-lg-6 offers-slider'>
                            <div className="heading-bx">
                                <h1>Related Clinical Trials</h1>
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
