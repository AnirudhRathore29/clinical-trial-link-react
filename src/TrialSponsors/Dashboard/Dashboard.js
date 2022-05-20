

import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import DashboardInfoBx from '../../views/Components/DashboardInfoBx/DashboardInfoBx'
import ListBox from '../../views/Components/ListBox/ListBox';
import WelcomeBx from '../../views/Components/WelcomeBx/WelcomeBx';
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../Patient/Dashboard/Dashboard.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SponsorDashboard } from '../../redux/actions/TrialSponsorAction';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

var loadingTechSkeleton = [];
const SponsorsDashboard = () => {
    const DashboardData = useSelector((state) => state.My_trials.dashboard.data);
    const isLoading = useSelector((state) => state.My_trials);
    const options = {
        items: 2,
        margin: 30,
        loop: true,
        nav: false,
        dots: true
    };

    console.log("DashboardData", DashboardData);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(SponsorDashboard())
    }, []);

    useEffect(() => {
        for (let i = 0; i < 12; i++) {
            return (
                loadingTechSkeleton.push(
                    <div className='col-lg-6' key={i}>
                        <Skeleton height={150} borderRadius="1rem" style={{ marginBottom: 20 }} />
                    </div>
                )
            )
        }
    })

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
                                info={DashboardData !== undefined && DashboardData.data.totalAvailableTrials !== null ? DashboardData.data.totalAvailableTrials : "0"}
                            />
                        </div>
                    </div>
                    <div className='row dashboard-col'>
                        <div className='col-lg-12'>
                            <div className="heading-bx">
                                <h1>Trial Clinics</h1>
                                <Link to="/trial-sponsors/clinic-listing" className='btn-text'>See All</Link>
                            </div>
                            {
                                !isLoading.loading ?
                                    <OwlCarousel {...options}>
                                        {DashboardData && DashboardData.data.trialClinics.map((value, index) => {
                                            return (
                                                <div className='item' key={index}>
                                                    <Link to="/trial-sponsors/clinic-details">
                                                        <ListBox
                                                            imgUrl="clinic-img3.jpg"
                                                            title={value.clinic_name}
                                                            location={value.address}
                                                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                                            distance="5000.52 Mi"
                                                        />
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </OwlCarousel>
                                    :
                                    <div className='row'>
                                        {
                                            [1, 2].map((value, index) => {
                                                return (
                                                    <div className='col-lg-6' key={index}>
                                                        <Skeleton height={200} borderRadius="1rem" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SponsorsDashboard;
