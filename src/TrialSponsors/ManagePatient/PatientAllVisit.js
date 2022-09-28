import { useParams } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import '../../Patient/MyAppointments/MyAppointments.css';
import '../../Patient/ClinicListing/ClinicListing.css'
import '../../TrialClinic/TrialRequests/TrialRequests.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../views/Components/Common/Buttons/Buttons';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import moment from 'moment';
import { SponsorPatientAllVisitAction } from '../../redux/actions/TrialSponsorAction';

const SponsorPatientAllVisit = () => {
    const PatientAllVisitList = useSelector(state => state.My_trials.patient_all_visit)
    const isLoading = useSelector(state => state.My_trials)

    const [SelectedTabState, setSelectedTabState] = useState("Screening");
    const [ListSelectorState, setListSelectorState] = useState(undefined);
    const [LoadMoreState, setLoadMoreState] = useState(1)

    const dispatch = useDispatch();
    const { id } = useParams();

    console.log("PatientAllVisitList", PatientAllVisitList);
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
        dispatch(SponsorPatientAllVisitAction({ page: LoadMoreState, patient_appointment_id: id, visit_type: SelectedTabState }))
    }, [dispatch, SelectedTabState, LoadMoreState])

    useEffect(() => {
        setListSelectorState(PatientAllVisitList)
    }, [PatientAllVisitList])

    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Patient All Visits <span></span> </h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="Screening" className="pricing-tabs" id="plans-tabs" onSelect={SelectedTab}>
                                <Tab eventKey="Screening" title="Screening">
                                    <div className='row'>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState.length > 0 ?
                                                ListSelectorState.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-4' key={index}>
                                                            <div className='patientVisit'>
                                                                <h3><strong>Visit Number :</strong> {value.visit_number}</h3>
                                                                <p>{moment(value.appointment_date).format("MMMM DD, YYYY")},
                                                                    ({value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to {value.trial_clinic_appointment_slot_info.booking_slot_info.to_time})</p>
                                                                <p className='mb-0'>{value.visit_note}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <NoDataFound />
                                            :
                                            [1, 2, 3,].map((_, index) => {
                                                return (
                                                    <div className='col-lg-4 mb-5' key={index}>
                                                        <Skeleton height={100} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {ListSelectorState && ListSelectorState.length > 16 &&
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
                                <Tab eventKey="Trial Process" title="Trial">
                                    <div className='row'>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState.length > 0 ?
                                                ListSelectorState.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-4' key={index}>
                                                            <div className='patientVisit'>
                                                                <h3><strong>Visit Number :</strong> {value.visit_number}</h3>
                                                                <p>{moment(value.appointment_date).format("MMMM DD, YYYY")},
                                                                    ({value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to {value.trial_clinic_appointment_slot_info.booking_slot_info.to_time})</p>
                                                                {
                                                                    value.status === 0 ?
                                                                        <span className='badge badge-primary d-inline-block mb-3'>Pending</span> :
                                                                        value.status === 4 ?
                                                                            <span className='badge badge-success d-inline-block mb-3'>Completed</span> :
                                                                            value.status === 5 ?
                                                                                <span className='badge badge-danger d-inline-block mb-3'>Incomplete</span> :
                                                                                value.status === 7 ?
                                                                                    <span className='badge badge-danger d-inline-block mb-3'>Early Termination</span> :
                                                                                    null
                                                                }
                                                                <p className='mb-0'>{value.visit_note}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <NoDataFound />
                                            :
                                            [1, 2, 3,].map((_, index) => {
                                                return (
                                                    <div className='col-lg-4 mb-5' key={index}>
                                                        <Skeleton height={100} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {ListSelectorState && ListSelectorState.length > 16 &&
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

export default SponsorPatientAllVisit;
