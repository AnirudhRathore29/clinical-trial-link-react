import { useEffect, useState } from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap';
import { SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import Button from '../../views/Components/Common/Buttons/Buttons';
import MyAppointmentBx from '../../views/Components/MyAppointmentBx/MyAppointmentBx';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './MyAppointments.css';
import '../ClinicListing/ClinicListing.css'
import { useDispatch, useSelector } from 'react-redux';
import { CancelAppointmentAction, MyAppointmentsDetailAction, MyAppointmentsListAction } from '../../redux/actions/PatientAction';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { GetCancelReasonsAction } from '../../redux/actions/commonAction';

const PatientMyAppointments = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const location = useLocation()
    
    const GetCurrentRoleId = useSelector(state => state.auth.user.role)
    const AppointmentListSelector = useSelector(state => state.patient.appointment_list)
    const AppointmentDetailSelector = useSelector(state => state.patient.appointment_detail)
    const CancelAppointmentSelector = useSelector(state => state.patient.appointment_cancel)
    const GetCancelReasonsSelector = useSelector(state => state.common_data.data)
    const isLoading = useSelector(state => state.patient)

    var stateCurrentTab = location.state && location.state.charAt(0) + location.state.slice(1).toLowerCase()

    const [SelectedTabState, setSelectedTabState] = useState(location.state ? stateCurrentTab : "Pending");
    const [AppointmentDetailModal, setAppointmentDetailModal] = useState(false);
    const [AppointmentCancelModal, setAppointmentCancelModal] = useState(false);
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const [ListSelectorState, setListSelectorState] = useState(undefined);
    const [DetailSelectorState, setDetailSelectorState] = useState(undefined);
    const [LoadMoreState, setLoadMoreState] = useState(1)
    const [inputFields, SetInputFields] = useState({
        patient_appointment_id: '',
        default_cancel_reason_id: '',
        cancellation_detail: '',
        clinic_name: '',
        trial_name: '',
        trial_date_time: ''
    })

    console.log("AppointmentListSelector", AppointmentListSelector && AppointmentListSelector.data);
    console.log("SelectedTabState", SelectedTabState);
    console.log("ListSelectorState", ListSelectorState);
    console.log("DetailSelectorState", DetailSelectorState);
    console.log("GetCancelReasonsSelector", GetCancelReasonsSelector);
    console.log("CancelAppointmentSelector", CancelAppointmentSelector);
    console.log("AppointmentDetailSelector", AppointmentDetailSelector);
    console.log("inputFields", inputFields);

    const AppointmentDetailModalShow = (data) => {
        console.log("data", data);
        setAppointmentDetailModal(true);
        dispatch(MyAppointmentsDetailAction(data.patient_appointment_id))
        SetInputFields({
            ...inputFields,
            patient_appointment_id: data.patient_appointment_id,
            clinic_name: data.clinic_name,
            trial_name: data.trial_name,
            trial_date_time: data.trial_date_time
        })
    }
    const AppointmentDetailModalClose = () => {
        setAppointmentDetailModal(false);
        setDetailSelectorState(undefined)
    }
    const AppointmentCancelModalShow = () => {
        setAppointmentCancelModal(true);
        AppointmentDetailModalClose();
    }
    const AppointmentCancelModalClose = () => setAppointmentCancelModal(false);
    const ConfirmationModalShow = () => {
        setConfirmationModal(true);
        setAppointmentCancelModal();
    }
    const ConfirmationModalClose = () => {
        SetInputFields({
            patient_appointment_id: '',
            default_cancel_reason_id: '',
            cancellation_detail: '',
            clinic_name: '',
            trial_name: '',
            trial_date_time: ''
        })
        setConfirmationModal(false);
    }

    const SelectedTab = (key) => {
        setListSelectorState(undefined)
        setSelectedTabState(key);
    }

    const handleLoadMore = (key) => {
        setLoadMoreState(LoadMoreState + 1)
        setSelectedTabState(key)
    }

    const onchange = (e) => {
        const { name, value } = e.target
        SetInputFields((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const CancelAppointmentSubmit = () => {
        dispatch(CancelAppointmentAction(inputFields))
        console.log("canceldata", inputFields);
    }

    const handleRedirectUser2Chat = () => {
        history.push({
            pathname: "/patient/my-chats",
            state: {
                full_name: AppointmentDetailSelector.data.data.trial_clinic_user_info.clinic_name,
                id: AppointmentDetailSelector.data.data.id,
                profile_image: AppointmentDetailSelector.data.data.trial_clinic_user_info.listing_image,
            }
        })
    }

    useEffect(() => {
        dispatch(GetCancelReasonsAction(GetCurrentRoleId))
    }, [dispatch, GetCurrentRoleId])

    useEffect(() => {
        dispatch(MyAppointmentsListAction({ page: LoadMoreState, application_tab: SelectedTabState }))
    }, [dispatch, SelectedTabState, LoadMoreState])

    useEffect(() => {
        setListSelectorState(AppointmentListSelector && AppointmentListSelector.data.data)
    }, [AppointmentListSelector])

    useEffect(() => {
        setDetailSelectorState(AppointmentDetailSelector && AppointmentDetailSelector.data.data)
    }, [AppointmentDetailSelector])

    useEffect(() => {
        if (CancelAppointmentSelector.data !== undefined && CancelAppointmentSelector.data.status_code === 200) {
            setConfirmationModal(false)
            dispatch(MyAppointmentsListAction({ page: LoadMoreState, application_tab: SelectedTabState }))
        }
    }, [CancelAppointmentSelector])
    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Appointments</h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey={SelectedTabState} className="pricing-tabs" id="plans-tabs" onSelect={SelectedTab}>
                                <Tab eventKey="Pending" title="Pending">
                                    <div className='row'>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState.data.length > 0 ?
                                                ListSelectorState.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <MyAppointmentBx
                                                                onClick={() => AppointmentDetailModalShow({
                                                                    patient_appointment_id: value.id,
                                                                    clinic_name: value.trial_clinic_user_info.clinic_name,
                                                                    trial_name: value.clinic_trial_info.trial_name,
                                                                    trial_date_time: (`${moment(value.appointment_date).format("MMMM DD, YYYY")} ${value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to ${value.trial_clinic_appointment_slot_info.booking_slot_info.to_time}`)
                                                                })}
                                                                imgUrl={value.trial_clinic_user_info.listing_image}
                                                                title={value.clinic_trial_info.trial_name}
                                                                status={
                                                                    value.status === 0 ? "Pending" :
                                                                        value.status === 1 ? "Screening" :
                                                                            value.status === 2 ? "Rejected" :
                                                                                value.status === 3 ? "Cancelled" :
                                                                                    value.status === 4 ? "Not Eligible" :
                                                                                        value.status === 5 ? "Screening Pending Approval" :
                                                                                            value.status === 6 ? "Screening Approved" :
                                                                                                value.status === 8 ? "Incomplete" :
                                                                                                    value.status === 9 ? "End of Study" :
                                                                                                        value.status === 10 ? "Early Termination" :
                                                                                                            null
                                                                }
                                                                statusClass={
                                                                    value.status === 0 ? "primary" :
                                                                        value.status === 1 ? "primary" :
                                                                            value.status === 2 ? "danger" :
                                                                                value.status === 3 ? "danger" :
                                                                                    value.status === 4 ? "danger" :
                                                                                        value.status === 5 ? "primary" :
                                                                                            value.status === 6 ? "primary" :
                                                                                                value.status === 8 ? "danger" :
                                                                                                    value.status === 9 ? "danger" :
                                                                                                        value.status === 10 ? "danger" :
                                                                                                            null
                                                                }
                                                                visitNumber={value.visit_number}
                                                                location={value.trial_clinic_user_info.address}
                                                                time={`${moment(value.appointment_date).format("MMMM DD, YYYY")} ${value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to ${value.trial_clinic_appointment_slot_info.booking_slot_info.to_time}`}
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
                                    {ListSelectorState && ListSelectorState.data.length > 16 &&
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
                                <Tab eventKey="Current" title="Current">
                                    <div className='row'>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState.data.length > 0 ?
                                                ListSelectorState.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <MyAppointmentBx
                                                                onClick={() => AppointmentDetailModalShow({
                                                                    patient_appointment_id: value.id,
                                                                    clinic_name: value.trial_clinic_user_info.clinic_name,
                                                                    trial_name: value.clinic_trial_info.trial_name,
                                                                    trial_date_time: (`${moment(value.appointment_date).format("MMMM DD, YYYY")} ${value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to ${value.trial_clinic_appointment_slot_info.booking_slot_info.to_time}`)
                                                                })}
                                                                imgUrl={value.trial_clinic_user_info.listing_image}
                                                                title={value.clinic_trial_info.trial_name}
                                                                status={
                                                                    value.status === 0 ? "Pending" :
                                                                        value.status === 1 ? "Screening" :
                                                                            value.status === 2 ? "Rejected" :
                                                                                value.status === 3 ? "Cancelled" :
                                                                                    value.status === 4 ? "Not Eligible" :
                                                                                        value.status === 5 ? "Screening Pending Approval" :
                                                                                            value.status === 6 ? "Screening Approved" :
                                                                                                value.status === 8 ? "Incomplete" :
                                                                                                    value.status === 9 ? "End of Study" :
                                                                                                        value.status === 10 ? "Early Termination" :
                                                                                                            null
                                                                }
                                                                statusClass={
                                                                    value.status === 0 ? "primary" :
                                                                        value.status === 1 ? "primary" :
                                                                            value.status === 2 ? "danger" :
                                                                                value.status === 3 ? "danger" :
                                                                                    value.status === 4 ? "danger" :
                                                                                        value.status === 5 ? "primary" :
                                                                                            value.status === 6 ? "primary" :
                                                                                                value.status === 8 ? "danger" :
                                                                                                    value.status === 9 ? "danger" :
                                                                                                        value.status === 10 ? "danger" :
                                                                                                            null
                                                                }
                                                                visitNumber={value.visit_number}
                                                                location={value.trial_clinic_user_info.address}
                                                                time={`${moment(value.appointment_date).format("MMMM DD, YYYY")} ${value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to ${value.trial_clinic_appointment_slot_info.booking_slot_info.to_time}`}
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
                                                            <MyAppointmentBx
                                                                onClick={() => AppointmentDetailModalShow({
                                                                    patient_appointment_id: value.id,
                                                                    clinic_name: value.trial_clinic_user_info.clinic_name,
                                                                    trial_name: value.clinic_trial_info.trial_name,
                                                                    trial_date_time: (`${moment(value.appointment_date).format("MMMM DD, YYYY")} ${value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to ${value.trial_clinic_appointment_slot_info.booking_slot_info.to_time}`)
                                                                })}
                                                                imgUrl={value.trial_clinic_user_info.listing_image}
                                                                title={value.clinic_trial_info.trial_name}
                                                                status={
                                                                    value.status === 0 ? "Pending" :
                                                                        value.status === 1 ? "Screening" :
                                                                            value.status === 2 ? "Rejected" :
                                                                                value.status === 3 ? "Cancelled" :
                                                                                    value.status === 4 ? "Not Eligible" :
                                                                                        value.status === 5 ? "Screening Pending Approval" :
                                                                                            value.status === 6 ? "Screening Approved" :
                                                                                                value.status === 8 ? "Incomplete" :
                                                                                                    value.status === 9 ? "End of Study" :
                                                                                                        value.status === 10 ? "Early Termination" :
                                                                                                            null
                                                                }
                                                                statusClass={
                                                                    value.status === 0 ? "primary" :
                                                                        value.status === 1 ? "primary" :
                                                                            value.status === 2 ? "danger" :
                                                                                value.status === 3 ? "danger" :
                                                                                    value.status === 4 ? "danger" :
                                                                                        value.status === 5 ? "primary" :
                                                                                            value.status === 6 ? "primary" :
                                                                                                value.status === 8 ? "danger" :
                                                                                                    value.status === 9 ? "danger" :
                                                                                                        value.status === 10 ? "danger" :
                                                                                                            null
                                                                }
                                                                visitNumber={value.visit_number}
                                                                location={value.trial_clinic_user_info.address}
                                                                time={`${moment(value.appointment_date).format("MMMM DD, YYYY")} ${value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to ${value.trial_clinic_appointment_slot_info.booking_slot_info.to_time}`}
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
                                    {ListSelectorState && ListSelectorState.data.length > 16 &&
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

            <CommonModal className="custom-size-modal" show={AppointmentDetailModal} onHide={AppointmentDetailModalClose} keyboard={false}
                ModalTitle="Appointment Details"
                onClick={AppointmentDetailModalClose}
                ModalData={
                    DetailSelectorState !== undefined ?
                        <>
                            <div className='appointment-detail'>
                                <img src={DetailSelectorState.trial_clinic_user_info.listing_image !== null ? DetailSelectorState.trial_clinic_user_info.listing_image : "/images/placeholder-img.jpg"} alt="clinic-img" />
                                <div className=''>
                                    <h2>{DetailSelectorState.trial_clinic_user_info.clinic_name}</h2>
                                    {
                                        DetailSelectorState.status === 0 ? <span className='badge badge-primary d-inline-block mb-3'>Pending</span> :
                                            DetailSelectorState.status === 1 ? <span className='badge badge-primary d-inline-block mb-3'>Screening</span> :
                                                DetailSelectorState.status === 2 ? <span className='badge badge-danger d-inline-block mb-3'>Rejected</span> :
                                                    DetailSelectorState.status === 3 ? <span className='badge badge-danger d-inline-block mb-3'>Cancelled</span> :
                                                        DetailSelectorState.status === 4 ? <span className='badge badge-danger d-inline-block mb-3'>Not Eligible</span> :
                                                            DetailSelectorState.status === 5 ? <span className='badge badge-primary d-inline-block mb-3'>Screening Pending Approval</span> :
                                                                DetailSelectorState.status === 6 ? <span className='badge badge-primary d-inline-block mb-3'>Screening Approved</span> :
                                                                    DetailSelectorState.status === 8 ? <span className='badge badge-danger d-inline-block mb-3'>Incomplete</span> :
                                                                        DetailSelectorState.status === 9 ? <span className='badge badge-danger d-inline-block mb-3'>End of Study</span> :
                                                                            DetailSelectorState.status === 10 ? <span className='badge badge-danger d-inline-block mb-3'>Early Termination</span> :
                                                                                null
                                    }
                                    <p><strong>Visit Number :</strong> {DetailSelectorState.visit_number}</p>
                                </div>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Date & Time</h2>
                                <p>{moment(DetailSelectorState.appointment_date).format("MMMM DD, YYYY")},
                                    ({DetailSelectorState.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to {DetailSelectorState.trial_clinic_appointment_slot_info.booking_slot_info.to_time})</p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Clinic Address</h2>
                                <p>{DetailSelectorState.trial_clinic_user_info.address}</p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Trial for</h2>
                                <p>{DetailSelectorState.clinic_trial_info.trial_name}</p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Trial Compensation</h2>
                                <p>$ {DetailSelectorState.compensation == null ? "0" : DetailSelectorState.compensation}</p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Sponsor</h2>
                                <p>{DetailSelectorState.clinic_trial_info.user_info.sponsor_name}</p>
                            </div>
                            {
                                DetailSelectorState.cancellation_detail &&
                                <div className='appointment-detail-col'>
                                    <h2>Rejection Reason</h2>
                                    <p>{DetailSelectorState.cancellation_detail}</p>
                                </div>
                            }
                            <div className={DetailSelectorState.status === 0 ? "clnicaltrial-detail-ftr" : "clnicaltrial-detail-ftr justify-content-center"}>
                                {
                                    DetailSelectorState.status === 0 ?
                                        <Button
                                            isButton="true"
                                            BtnType="submit"
                                            BtnColor="red"
                                            BtnText="Cancel Screening"
                                            onClick={AppointmentCancelModalShow}
                                        />
                                        :
                                        null
                                }
                                <Button
                                    isLink="true"
                                    URL={`/patient/patient-visits/${DetailSelectorState.id}`}
                                    BtnColor="green"
                                    BtnText="View All Visits"
                                />
                                <a href="tel:+496170961709" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></a>
                                <button onClick={handleRedirectUser2Chat} className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></button>
                            </div>
                        </>
                        :
                        <LogoLoader />
                }
            />

            <CommonModal show={AppointmentCancelModal} onHide={AppointmentCancelModalClose} keyboard={false}
                ModalTitle="Cancel Appointment"
                onClick={AppointmentCancelModalClose}
                ModalData={
                    <>
                        <Form onSubmit={(e) => { e.preventDefault(); ConfirmationModalShow() }}>
                            <SelectBox
                                labelText="Reason for Cancel"
                                name="default_cancel_reason_id"
                                onChange={onchange}
                                required={true}
                                optionData=
                                {
                                    <>
                                        <option hidden>Select Cancellation Reason</option>
                                        {GetCancelReasonsSelector && GetCancelReasonsSelector.data.map((value, index) => {
                                            return (
                                                <option key={index} value={value.id}>{value.reason}</option>
                                            )
                                        })
                                        }
                                    </>
                                }
                            />
                            <TextArea
                                placeholder="Enter Cancellation Details"
                                labelText="Cancellation Details"
                                name="cancellation_detail"
                                onChange={onchange}
                                required={true}
                            />
                            <div className='clnicaltrial-detail-ftr mt-0'>
                                <Button
                                    isButton="true"
                                    BtnColor="primary w-100"
                                    BtnType="submit"
                                    BtnText="Confirm"
                                />
                            </div>
                        </Form>
                    </>
                }
            />

            <CommonModal show={ConfirmationModal} onHide={ConfirmationModalClose} keyboard={false} size="md"
                onClick={ConfirmationModalClose}
                ModalData={
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={ConfirmationModalClose}></button>
                        <div className='congrats-bx'>
                            <h2 className='mb-5'>Confirm Cancellation!</h2>
                            <p>Are you sure you want to cancel your Appointment <br /> <strong>with {inputFields.clinic_name} for {inputFields.trial_name}</strong> <br /> <strong>on {inputFields.trial_date_time}</strong></p>
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnColor="green w-50"
                                BtnText="No"
                                onClick={ConfirmationModalClose}
                            />
                            <Button
                                isButton="true"
                                BtnColor="primary w-50"
                                BtnText="Yes"
                                hasSpinner={isLoading.loading}
                                disabled={isLoading.loading}
                                onClick={CancelAppointmentSubmit}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default PatientMyAppointments;
