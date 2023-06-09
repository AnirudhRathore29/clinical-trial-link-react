import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import DashboardInfoBx from '../../views/Components/DashboardInfoBx/DashboardInfoBx'
import ListBox from '../../views/Components/ListBox/ListBox';
import WelcomeBx from '../../views/Components/WelcomeBx/WelcomeBx';
import 'owl.carousel/dist/assets/owl.carousel.css';
import './Dashboard.css';
import '../ClinicListing/ClinicListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { PatientDashboardAction } from '../../redux/actions/PatientAction';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PatientDashboard = () => {
    const dispatch = useDispatch()
    const dashBoardSelector = useSelector(state => state.patient.dashboard_patient.data)
    const loadingSelector = useSelector(state => state.patient)
    useEffect(() => {
        dispatch(PatientDashboardAction())
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
                        <div className="col-lg-4">
                            <DashboardInfoBx
                                className="thirdColor"
                                URL="/patient/my-appointments"
                                icon={<box-icon name='calendar' type='solid' size="40px" color="#ffffff"></box-icon>}
                                title="My Studies"
                                info={dashBoardSelector !== undefined && dashBoardSelector.data.myAppointments !== null ? dashBoardSelector.data.myAppointments : "0"}
                            />
                        </div>
                        <div className="col-lg-4">
                            <DashboardInfoBx
                                className="secondaryColor"
                                URL="/patient/payment-history"
                                icon={<box-icon name='money' size="40px" color="#356AA0"></box-icon>}
                                title="Compensation Received"
                                info={dashBoardSelector !== undefined && dashBoardSelector.data.totalReceivedCompensation !== null ? "$" + dashBoardSelector.data.totalReceivedCompensation : "$0"}
                            />
                        </div>
                        <div className="col-lg-4">
                            <DashboardInfoBx
                                className="primaryColor"
                                URL="/patient/my-favorites"
                                icon={<box-icon type='solid' size="40px" color="#ffffff" name='happy-heart-eyes'></box-icon>}
                                title="My Favorites Trials"
                                info={dashBoardSelector !== undefined && dashBoardSelector.data.totalFavTrials !== null ? dashBoardSelector.data.totalFavTrials : "0"}
                            />
                        </div>
                    </div>

                    <div className='row dashboard-col'>
                        <div className='col-lg-6'>
                            {dashBoardSelector && dashBoardSelector.data.trialClinics?.length !== 0 &&
                                <div className="heading-bx">
                                    <h1>Recommended Clinics</h1>
                                    <Link to="/patient/clinic-listing" className='btn-text'>See All</Link>
                                </div>
                            }
                            {!loadingSelector.loading ?
                                <OwlCarousel {...options}>
                                    {dashBoardSelector && dashBoardSelector.data.trialClinics.map((value, index) => {
                                        return (
                                            <div className='item' key={index}>
                                                <Link to={"/patient/trial-clinic-details/" + value.id}>
                                                    <ListBox
                                                        imgUrl={value.listing_image}
                                                        title={value.clinic_name}
                                                        location={value.address}
                                                        state={value.state_info.name}
                                                        description={value.user_meta_info.brief_intro}
                                                        distance={value.distance > 0 ? value.distance.toFixed(3) + " " + "Mi" : "0.00 Mi"}
                                                        trialCount={value?.trials_count}
                                                    />
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </OwlCarousel>
                                :
                                <Skeleton height={200} borderRadius="1rem" />
                            }
                        </div>

                        <div className='col-lg-6 offers-slider'>
                            {dashBoardSelector && dashBoardSelector?.data?.advertisements?.length !== 0 &&
                                <div className="heading-bx">
                                    <h1> Related Clinical Trials </h1>
                                </div>
                            }
                            {!loadingSelector.loading ?
                                <OwlCarousel {...options}>
                                    {dashBoardSelector && dashBoardSelector?.data?.advertisements.map((value, index) => {
                                        return (
                                            <div className='item' key={index}>
                                                <a href={value?.link_url} target="_blank">
                                                    <img src={value?.image} alt={value?.title} />
                                                </a>
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

export default PatientDashboard;
