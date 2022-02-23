

import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import DashboardInfoBx from '../../views/Components/DashboardInfoBx/DashboardInfoBx'
import ListBox from '../../views/Components/ListBox/ListBox';
import WelcomeBx from '../../views/Components/WelcomeBx/WelcomeBx';
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../Patient/Dashboard/Dashboard.css';

const PhysicianDashboard = () => {
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
                        <div className="col-lg-6">
                            <DashboardInfoBx
                                className="secondaryColor"
                                URL="/physician/manage-patient"
                                icon={<box-icon name='user' size="40px" color="#ffffff"></box-icon>}
                                title="Total Patients"
                                info="20"
                            />
                        </div>
                        <div className="col-lg-6">
                            <DashboardInfoBx
                                className="thirdColor"
                                URL=""
                                icon={<box-icon type='solid' name='badge-check' size="40px" color="#ffffff"></box-icon>}
                                title="Requests Approved by the Trial Sponsors/CRO"
                                info="10"
                            />
                        </div>
                    </div>

                    <div className='row dashboard-col'>
                        <div className='col-lg-6'>
                            <div className="heading-bx">
                                <h1>Recommended Trials</h1>
                            </div>
                            <OwlCarousel {...options}>
                                <div className='item'>
                                    <Link to="/physician/clinic-details">
                                        <ListBox
                                            imgUrl="clinic-img3.jpg"
                                            title="Barnes Jewish Hospital"
                                            location="San Diego, CA, United States"
                                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                            distance="5000.52 Mi"
                                        />
                                    </Link>
                                </div>
                                <div className='item'>
                                    <Link to="/physician/clinic-details">
                                        <ListBox
                                            imgUrl="clinic-img2.jpg"
                                            title="Barnes Jewish Hospital"
                                            location="Atlanta, Georgia, United States"
                                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                            distance="5000.52 Mi"
                                        />
                                    </Link>
                                </div>
                                <div className='item'>
                                    <Link to="/physician/clinic-details">
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

export default PhysicianDashboard;
