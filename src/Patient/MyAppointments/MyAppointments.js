import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import Button from '../../views/Components/Common/Buttons/Buttons';
import MyAppointmentBx from '../../views/Components/MyAppointmentBx/MyAppointmentBx';
import { Link } from 'react-router-dom';
import './MyAppointments.css';
import '../ClinicListing/ClinicListing.css'
import { useDispatch, useSelector } from 'react-redux';
import { MyAppointmentsDetailAction, MyAppointmentsListAction } from '../../redux/actions/PatientAction';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';

const PatientMyAppointments = () => {
    const AppointmentListSelector = useSelector(state => state.patient.appointment_list)
    const AppointmentDetailSelector = useSelector(state => state.patient.appointment_detail)
    const isLoading = useSelector(state => state.patient)

    const [AppointmentDetailModal, setAppointmentDetailModal] = useState(false);
    const [AppointmentCancelModal, setAppointmentCancelModal] = useState(false);
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const [SelectedTabState, setSelectedTabState] = useState("Pending");
    const [ListSelectorState, setListSelectorState] = useState(undefined);
    const [DetailSelectorState, setDetailSelectorState] = useState(undefined);
    const [LoadMoreState, setLoadMoreState] = useState(1)

    const dispatch = useDispatch();

    console.log("AppointmentListSelector", AppointmentListSelector && AppointmentListSelector.data);
    console.log("SelectedTabState", SelectedTabState);
    console.log("ListSelectorState", ListSelectorState);
    console.log("DetailSelectorState", DetailSelectorState);

    const AppointmentDetailModalShow = (id) => {
        setAppointmentDetailModal(true);
        dispatch(MyAppointmentsDetailAction(id))
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
    const ConfirmationModalClose = () => setConfirmationModal(false);

    const SelectedTab = (key) => {
        setListSelectorState(undefined)
        setSelectedTabState(key);
    }

    const handleLoadMore = (key) => {
        setLoadMoreState(LoadMoreState + 1)
        setSelectedTabState(key)
    }

    useEffect(() => {
        dispatch(MyAppointmentsListAction({ page: LoadMoreState, application_tab: SelectedTabState }))
    }, [dispatch, SelectedTabState, LoadMoreState])

    useEffect(() => {
        setListSelectorState(AppointmentListSelector && AppointmentListSelector.data.data)
        setDetailSelectorState(AppointmentDetailSelector && AppointmentDetailSelector.data.data)
    }, [AppointmentListSelector, AppointmentDetailSelector])
    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Appointments</h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="Pending" className="pricing-tabs" id="plans-tabs" onSelect={SelectedTab}>
                                <Tab eventKey="Pending" title="Pending">
                                    <div className='row'>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState.data.length > 0 ?
                                                ListSelectorState.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <MyAppointmentBx
                                                                onClick={() => AppointmentDetailModalShow(value.id)}
                                                                imgUrl={value.trial_clinic_user_info.listing_image}
                                                                title={value.clinic_trial_info.trial_name}
                                                                status={
                                                                    value.status === 0 ? "Pending" :
                                                                        value.status === 1 ? "Screnning" :
                                                                            value.status === 2 ? "Rejected" :
                                                                                value.status === 3 ? "Cancelled" :
                                                                                    value.status === 4 ? "Not Eligible" :
                                                                                        value.status === 6 ? "Screnning Approved" :
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
                                                                onClick={() => AppointmentDetailModalShow(value.id)}
                                                                imgUrl={value.trial_clinic_user_info.listing_image}
                                                                title={value.clinic_trial_info.trial_name}
                                                                status={
                                                                    value.status === 0 ? "Pending" :
                                                                        value.status === 1 ? "Screnning" :
                                                                            value.status === 2 ? "Rejected" :
                                                                                value.status === 3 ? "Cancelled" :
                                                                                    value.status === 4 ? "Not Eligible" :
                                                                                        value.status === 6 ? "Screnning Approved" :
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
                                                                onClick={() => AppointmentDetailModalShow(value.id)}
                                                                imgUrl={value.trial_clinic_user_info.listing_image}
                                                                title={value.clinic_trial_info.trial_name}
                                                                status={
                                                                    value.status === 0 ? "Pending" :
                                                                        value.status === 1 ? "Screnning" :
                                                                            value.status === 2 ? "Rejected" :
                                                                                value.status === 3 ? "Cancelled" :
                                                                                    value.status === 4 ? "Not Eligible" :
                                                                                        value.status === 6 ? "Screnning Approved" :
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

            {/* <CommonModal className="custom-size-modal" show={show4} onHide={handleClose4} keyboard={false}
                ModalTitle="Appointment Details"
                onClick={handleClose4}
                ModalData={
                    <>
                        <div className='appointment-detail'>
                            <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                            <div className=''>
                                <h2>Barnes Jewish Hospital</h2>
                                <span className='badge badge-primary d-inline-block mb-3'>Eligible</span>
                                <p><strong>Visit Number :</strong> 25632156</p>
                            </div>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Date & Time</h2>
                            <p>Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Clinic Address</h2>
                            <p>Atlanta, Georgia, United States</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Trial for</h2>
                            <p>Adolescents with ADHD and a Parent with Bipolar Disorder</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Trial Compensation</h2>
                            <p>To be Decided at Clinic</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Sponsor</h2>
                            <p>CNS Medical Director</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Rejection Reason</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <div className='clnicaltrial-detail-ftr justify-content-center'>
                            <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                            <Link to="/patient/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                        </div>
                    </>
                }
            /> */}

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
                                            DetailSelectorState.status === 1 ? <span className='badge badge-primary d-inline-block mb-3'>Screnning</span> :
                                                DetailSelectorState.status === 2 ? <span className='badge badge-danger d-inline-block mb-3'>Rejected</span> :
                                                    DetailSelectorState.status === 3 ? <span className='badge badge-danger d-inline-block mb-3'>Cancelled</span> :
                                                        DetailSelectorState.status === 4 ? <span className='badge badge-danger d-inline-block mb-3'>Not Eligible</span> :
                                                            DetailSelectorState.status === 6 ? <span className='badge badge-primary d-inline-block mb-3'>Screnning Approved</span> :
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
                                <p>{DetailSelectorState.clinic_trial_info.compensation}</p>
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
                            <div className='clnicaltrial-detail-ftr'>
                                {
                                    DetailSelectorState.status === 2 ||
                                        DetailSelectorState.status === 3 ||
                                        DetailSelectorState.status === 4 ||
                                        DetailSelectorState.status === 9 ||
                                        DetailSelectorState.status === 10 ? null
                                        :
                                        <Button
                                            isButton="true"
                                            BtnType="submit"
                                            BtnColor="green w-100"
                                            BtnText="Cancel Appointment"
                                            onClick={AppointmentCancelModalShow}
                                        />
                                }
                                <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                <Link to="/patient/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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
                        <SelectBox
                            labelText="Reason for Cancellation"
                            optionData=
                            {
                                <>
                                    <option value="">Select Cancellation Reason</option>
                                    <option value="">Cancellation Reason 1</option>
                                    <option value="">Cancellation Reason 2</option>
                                    <option value="">Cancellation Reason 3</option>
                                    <option value="">Cancellation Reason 4</option>
                                </>
                            }
                        />

                        <TextArea
                            placeholder="Enter Cancellation Details"
                            labelText="Cancellation Details"
                        />
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnColor="primary w-100"
                                BtnText="Confirm"
                                onClick={ConfirmationModalShow}
                            />
                        </div>
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
                            <p>Are you sure you want to cancel your Appointment <br /> <strong>with Centers for Disease Control and Prevention</strong> <br /> <strong>on Jan 20, 2022 (09:00 AM to 11:00 AM)</strong></p>
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
                                onClick={ConfirmationModalClose}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default PatientMyAppointments;
