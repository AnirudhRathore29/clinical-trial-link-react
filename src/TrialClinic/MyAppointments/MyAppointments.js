import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import MyAppointmentBx from '../../views/Components/MyAppointmentBx/MyAppointmentBx';
import '../../Patient/MyAppointments/MyAppointments.css';
import '../../Patient/ClinicListing/ClinicListing.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyAppointmentListAction } from '../../redux/actions/TrialClinicAction';
import Button from '../../views/Components/Common/Buttons/Buttons';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ClinicMyAppointments = () => {
    const AppointmentListSelector = useSelector(state => state.trial_clinic.clinic_appointment_list)
    const isLoading = useSelector(state => state.trial_clinic)

    const [SelectedTabState, setSelectedTabState] = useState("Current");
    const [ListSelectorState, setListSelectorState] = useState(undefined);
    const [LoadMoreState, setLoadMoreState] = useState(1)

    const dispatch = useDispatch();

    console.log("AppointmentListSelector", AppointmentListSelector);
    console.log("SelectedTabState", SelectedTabState);
    console.log("ListSelectorState", ListSelectorState);

    const SelectedTab = (key) => {
        setListSelectorState(undefined)
        setSelectedTabState(key);
    }

    const handleLoadMore = (key) => {
        setLoadMoreState(LoadMoreState + 1)
        setSelectedTabState(key)
    }

    useEffect(() => {
        dispatch(MyAppointmentListAction({ page: LoadMoreState, application_tab: SelectedTabState }))
    }, [dispatch, SelectedTabState, LoadMoreState])

    useEffect(() => {
        setListSelectorState(AppointmentListSelector)
    }, [AppointmentListSelector])

    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Appointments <span></span> </h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="Current" className="pricing-tabs" id="plans-tabs" onSelect={SelectedTab}>
                                <Tab eventKey="Current" title="Current">
                                    <div className='row'>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState.data.length > 0 ?
                                                ListSelectorState.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <Link to={`/trial-clinic/patient-list/${value.id}`}>
                                                                <MyAppointmentBx
                                                                    imgUrl={value.sponsor_user_info.listing_image}
                                                                    title={value.sponsor_user_info.sponsor_name}
                                                                    status="Recruiting"
                                                                    statusClass="primary"
                                                                    location={`${value.sponsor_user_info.address}, ${value.sponsor_user_info.state_info.name}`}
                                                                    description={value.clinic_trial_info.trial_name}
                                                                />
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <NoDataFound />
                                            :
                                            [1, 2, 3, 4].map((_, index) => {
                                                return (
                                                    <div className='col-lg-6 mb-5' key={index}>
                                                        <Skeleton height={200} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {ListSelectorState && ListSelectorState.data.length > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore("Current")}
                                                disabled={ListSelectorState.last_page === ListSelectorState.current_page}
                                                hasSpinner={isLoading && isLoading.loading}
                                            />
                                        </div>
                                    }
                                </Tab>
                                <Tab eventKey="Past" title="Past">
                                    <div className='row'>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState.data.length > 0 ?
                                                ListSelectorState.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <Link to={`/trial-clinic/patient-list-past/${value.id}`}>
                                                                <MyAppointmentBx
                                                                    imgUrl={value.sponsor_user_info.listing_image}
                                                                    title={value.sponsor_user_info.sponsor_name}
                                                                    status={
                                                                        value.is_recruiting === 0 ? "Not Recruiting" :
                                                                                value.is_recruiting === 2 ? "Rejected" :
                                                                                    value.is_recruiting === 3 ? "Completed" :
                                                                                        null
                                                                    }
                                                                    statusClass={
                                                                        value.is_recruiting === 0 ? "danger" :
                                                                                value.is_recruiting === 2 ? "danger" :
                                                                                    value.is_recruiting === 3 ? "success" :
                                                                                        null
                                                                    }
                                                                    location={`${value.sponsor_user_info.address}, ${value.sponsor_user_info.state_info.name}`}
                                                                    description={value.clinic_trial_info.trial_name}
                                                                />
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <NoDataFound />
                                            :
                                            [1, 2, 3, 4].map((_, index) => {
                                                return (
                                                    <div className='col-lg-6 mb-5' key={index}>
                                                        <Skeleton height={200} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {ListSelectorState && ListSelectorState.data.length > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore("Current")}
                                                disabled={ListSelectorState.last_page === ListSelectorState.current_page}
                                                hasSpinner={isLoading && isLoading.loading}
                                            />
                                        </div>
                                    }
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClinicMyAppointments;
