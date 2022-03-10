

import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import DashboardInfoBx from '../../views/Components/DashboardInfoBx/DashboardInfoBx'
import ListBox from '../../views/Components/ListBox/ListBox';
import WelcomeBx from '../../views/Components/WelcomeBx/WelcomeBx';
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../Patient/Dashboard/Dashboard.css';

const SponsorsDashboard = () => {
    const options = {
        items: 2,
        margin: 30,
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
                                URL="/trial-sponsors/trial-requests"
                                icon={<box-icon type='solid' name='file-plus' size="40px" color="#356AA0"></box-icon>}
                                title="New Trials Requested from Clinical Trial Sites"
                                info="20"
                            />
                        </div>
                        <div className="col-lg-6">
                            <DashboardInfoBx
                                className="thirdColor"
                                URL="/trial-sponsors/trials"
                                icon={<box-icon type='solid' name='badge-check' size="40px" color="#ffffff"></box-icon>}
                                title="Available Trials and Create New Trial"
                                info="10"
                            />
                        </div>
                    </div>

                    <div className='row dashboard-col'>
                        <div className='col-lg-12'>
                            <div className="heading-bx">
                                <h1>Trial Clinics</h1>
                            </div>
                            <OwlCarousel {...options}>
                                <div className='item'>
                                    <Link to="/trial-sponsors/clinic-details">
                                        <ListBox
                                            imgUrl="clinic-img3.jpg"
                                            title="ABF Pharmaceutical"
                                            location="San Diego, CA, United States"
                                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                            distance="5000.52 Mi"
                                        />
                                    </Link>
                                </div>
                                <div className='item'>
                                    <Link to="/trial-sponsors/clinic-details">
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
                                    <Link to="/trial-sponsors/clinic-details">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default SponsorsDashboard;
