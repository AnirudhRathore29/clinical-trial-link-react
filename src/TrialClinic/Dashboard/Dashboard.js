import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import DashboardInfoBx from '../../views/Components/DashboardInfoBx/DashboardInfoBx'
import ListBox from '../../views/Components/ListBox/ListBox';
import WelcomeBx from '../../views/Components/WelcomeBx/WelcomeBx';
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../Patient/Dashboard/Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { TrialClinicDashboard } from '../../redux/actions/TrialClinicAction';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ClinicDashboard = () => {
    const dispatch = useDispatch()
    const DashboardSelector = useSelector((state) => state.trial_clinic.dashboard.data);
    const isLoading = useSelector((state) => state.trial_clinic);
    const options = {
        items: 2,
        loop: false,
        nav: false,
        dots: true,
        margin: 30
    };

    useEffect(() => {
        dispatch(TrialClinicDashboard())
    }, [dispatch]);

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
                                URL="/trial-clinic/trial-requests"
                                icon={<box-icon type='solid' name='file-plus' size="40px" color="#356AA0"></box-icon>}
                                title="New Appointment Requests"
                                info={DashboardSelector !== undefined && DashboardSelector.data.totalPendingRequests !== null ? DashboardSelector.data.totalPendingRequests : "0"}
                            />
                        </div>
                        <div className="col-lg-6">
                            <DashboardInfoBx
                                className="thirdColor"
                                URL="/trial-clinic/trial-applications"
                                icon={<box-icon type='solid' name='badge-check' size="40px" color="#ffffff"></box-icon>}
                                title="Clinical Studies"
                                info={DashboardSelector !== undefined && DashboardSelector.data.totalApprovedRequestBySponsor !== null ? DashboardSelector.data.totalApprovedRequestBySponsor : "0"}
                            />
                        </div>
                    </div>

                    <div className='row dashboard-col'>
                        <div className='col-12'>
                            {DashboardSelector && DashboardSelector?.data?.sponsors?.length !== 0 &&
                                <div className="heading-bx">
                                    <h1> Trial Sponsors/CRO </h1>
                                    <Link to="/trial-clinic/sponsors-listing" className='btn-text'>See All</Link>
                                </div>
                            }
                            {!isLoading.loading ?
                                <OwlCarousel {...options}>
                                    {DashboardSelector && DashboardSelector?.data?.sponsors?.map((value, index) => {
                                        return (
                                            <div className='item' key={index}>
                                                <Link to={"/trial-clinic/sponsors-details/" + value.id}>
                                                    <ListBox
                                                        imgUrl={value.listing_image}
                                                        title={value.sponsor_name}
                                                        location={value.address}
                                                        state={value.state_info.name}
                                                        description={value.user_meta_info !== null ? value.user_meta_info.brief_intro : null}
                                                        distance={value.distance > 0 ? value.distance.toFixed(3) + " " + "Mi" : "0.00 Mi"}
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

                        {/* <div className='col-lg-6 offers-slider'>
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
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClinicDashboard;
