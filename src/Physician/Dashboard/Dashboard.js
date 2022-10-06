

import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import DashboardInfoBx from '../../views/Components/DashboardInfoBx/DashboardInfoBx'
import ListBox from '../../views/Components/ListBox/ListBox';
import WelcomeBx from '../../views/Components/WelcomeBx/WelcomeBx';
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../Patient/Dashboard/Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PhysicianDashboardAction } from '../../redux/actions/PhysicianAction';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PhysicianDashboard = () => {
    const dispatch = useDispatch()
    const DashboardSelector = useSelector((state) => state.trial_clinic.dashboard.data);
    const isLoading = useSelector((state) => state.trial_clinic);

    console.log("DashboardSelector", DashboardSelector);

    useEffect(() => {
        dispatch(PhysicianDashboardAction())
    }, [dispatch]);

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
                                icon={<box-icon name='user' size="40px" color="#356AA0"></box-icon>}
                                title="Total Patients"
                                info={DashboardSelector !== undefined && DashboardSelector.data.totalPatientTrials}
                            />
                        </div>
                        <div className="col-lg-6">
                            <DashboardInfoBx
                                className="thirdColor"
                                URL=""
                                icon={<box-icon type='solid' name='badge-check' size="40px" color="#ffffff"></box-icon>}
                                title="Requests Approved by the clinical trial site"
                                info={DashboardSelector !== undefined && DashboardSelector.data.totalPatients}
                            />
                        </div>
                    </div>

                    <div className='row dashboard-col'>
                        <div className='col-lg-6'>
                            {DashboardSelector && DashboardSelector.data.relatedTrialClinicdata.length !== 0 &&
                                <div className="heading-bx">
                                    <h1> Recommended Trials </h1>
                                    <Link to="/physician/trial-listing" className='btn-text'>See All</Link>
                                </div>
                            }
                            {!isLoading.loading ?
                                <OwlCarousel {...options}>
                                    {DashboardSelector && DashboardSelector.data.relatedTrialClinicdata.map((value, index) => {
                                        return (
                                            <div className='item' key={index}>
                                                <Link to={"/physician/clinic-details/" + value.id}>
                                                    <ListBox
                                                        imgUrl={value.listing_image}
                                                        title={value.clinic_name}
                                                        location={value.address}
                                                        state={value.state_info.name}
                                                        description={value.user_meta_info !== null ? value.user_meta_info.brief_intro : null}
                                                    // distance="0 Mi"
                                                    />
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </OwlCarousel>

                                :
                                [1].map((_, index) => {
                                    return (
                                        <div className='w-100' key={index}>
                                            <Skeleton height={220} borderRadius="1rem" />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='col-lg-6 offers-slider'>
                            {DashboardSelector && DashboardSelector.data.advertisements.length !== 0 &&
                                <div className="heading-bx">
                                    <h1> Related Clinical Trials </h1>
                                    <Link to="/physician/trial-listing" className='btn-text'>See All</Link>
                                </div>
                            }
                            {!isLoading.loading ?
                                <OwlCarousel {...options}>
                                    {DashboardSelector && DashboardSelector.data.advertisements.map((value, index) => {
                                        return (
                                            <div className='item' key={index}>
                                                <Link to="/">
                                                    <img src="/images/offers-img1.jpg" alt="offers" />
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </OwlCarousel>

                                :
                                [1].map((_, index) => {
                                    return (
                                        <div className='w-100' key={index}>
                                            <Skeleton height={220} borderRadius="1rem" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhysicianDashboard;
