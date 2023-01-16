import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Button from '../../views/Components/Common/Buttons/Buttons';
import MyAppointmentBx from '../../views/Components/MyAppointmentBx/MyAppointmentBx';
import '../../Patient/MyAppointments/MyAppointments.css';
import '../../Patient/ClinicListing/ClinicListing.css'
import { useDispatch, useSelector } from 'react-redux';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useHistory } from 'react-router-dom';
import { PhysicianApprovedTrialsListAction } from '../../redux/actions/PhysicianAction';

const ApprovedTrials = () => {
    const AppointmentListSelector = useSelector(state => state.patient.appointment_list)
    const isLoading = useSelector(state => state.patient)

    const [SelectedTabState, setSelectedTabState] = useState("Current");
    const [ListSelectorState, setListSelectorState] = useState(undefined);
    const [LoadMoreState, setLoadMoreState] = useState(1)

    const dispatch = useDispatch();
    const history = useHistory();

    console.log("AppointmentListSelector", AppointmentListSelector && AppointmentListSelector.data);
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
        dispatch(PhysicianApprovedTrialsListAction({ page: LoadMoreState, application_tab: SelectedTabState }))
    }, [dispatch, SelectedTabState, LoadMoreState])

    useEffect(() => {
        setListSelectorState(AppointmentListSelector && AppointmentListSelector.data.data)
    }, [AppointmentListSelector])
    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Approved Trials</h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="Current" className="pricing-tabs" id="plans-tabs" onSelect={SelectedTab}>
                                <Tab eventKey="Current" title="Current">
                                    <div className='row'>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState?.data?.length > 0 ?
                                                ListSelectorState.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <MyAppointmentBx
                                                                onClick={ () => history.push(`/physician/approved-patient-list/${value.id}`) }
                                                                imgUrl={null}
                                                                title={value.trial_name}
                                                                status={
                                                                    value.status === 0 ? "Pending" :
                                                                        value.status === 1 ? "Recruiting" :
                                                                            value.status === 2 ? "StopRecruiting" :
                                                                                value.status === 3 ? "Rejected" :
                                                                                    null
                                                                }
                                                                statusClass={
                                                                    value.status === 0 ? "primary" :
                                                                        value.status === 1 ? "success" :
                                                                            value.status === 2 ? "danger" :
                                                                                value.status === 3 ? "danger" :
                                                                                    null
                                                                }
                                                                description={value.description}
                                                            />
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
                                    {ListSelectorState && ListSelectorState?.data?.length > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore("Pending")}
                                                disabled={ListSelectorState.last_page === ListSelectorState.current_page}
                                                hasSpinner={isLoading && isLoading.loading}
                                            />
                                        </div>
                                    }
                                </Tab>
                                <Tab eventKey="Past" title="Past">
                                    <div className='row'>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState?.data?.length > 0 ?
                                                ListSelectorState.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <MyAppointmentBx
                                                                onClick={ () => history.push(`/physician/approved-patient-list/${value.id}`) }
                                                                imgUrl={null}
                                                                title={value.trial_name}
                                                                status={
                                                                    value.status === 0 ? "Pending" :
                                                                        value.status === 1 ? "Recruiting" :
                                                                            value.status === 2 ? "StopRecruiting" :
                                                                                value.status === 3 ? "Rejected" :
                                                                                    null
                                                                }
                                                                statusClass={
                                                                    value.status === 0 ? "primary" :
                                                                        value.status === 1 ? "success" :
                                                                            value.status === 2 ? "danger" :
                                                                                value.status === 3 ? "danger" :
                                                                                    null
                                                                }
                                                                description={value.description}
                                                            />
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
                                    {ListSelectorState && ListSelectorState?.data?.length > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore("Past")}
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

export default ApprovedTrials;
