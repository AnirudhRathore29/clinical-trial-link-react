import React, { useEffect, useState } from 'react';
import { SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import '../TrialRequests/TrialRequests.css'
import '../../Patient/MyAppointments/MyAppointments.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import { NewScreenTrialRequestStatusUpdateAction, PatientAppointMentDetailAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import moment from 'moment';
import { Form } from 'react-bootstrap';
import { GetCancelReasonsAction } from '../../redux/actions/commonAction';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const MyAppointmentsDetails = (props) => {
    const [addVisitModal, setAddVisitModal] = useState(false);
    const [CancelReasonModal, setCancelReasonModal] = useState(false);
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    // const [CompleteTrialModal, setCompleteTrialModal] = useState(false);
    const [TerminationReasonModal, setTerminationReasonModal] = useState(false);
    const [SelectedStatus, setSelectedStatus] = useState();
    const [ReadMore, setReadMore] = useState();
    const [PatientAppointmentId, setPatientAppointmentId] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [StatusUpdateFields, setStatusUpdateFields] = useState({
        visit_note: "",
        available_time: '',
        default_cancel_reason_id: '',
        cancellation_detail: '',
    })

    const GetCurrentRoleId = useSelector(state => state.auth.user.role)
    const loadingSelector = useSelector(state => state.trial_clinic)
    const AppointmentDetail = useSelector(state => state.trial_clinic.new_screen_trial_detail.data)
    const GetCancelReasonsSelector = useSelector(state => state.common_data.data)

    const { id } = useParams()
    const dispatch = useDispatch()

    console.log("AppointmentDetail", AppointmentDetail);
    console.log("GetCancelReasonsSelector", GetCancelReasonsSelector);
    console.log("StatusUpdateFields", StatusUpdateFields);

    useEffect(() => {
        dispatch(GetCancelReasonsAction(GetCurrentRoleId))
    }, [dispatch, GetCurrentRoleId])

    useEffect(() => {
        dispatch(PatientAppointMentDetailAction(id))
    }, [dispatch])

    console.log("SelectedStatus", SelectedStatus);

    const addVisitModalClose = () => {
        setSelectedStatus(0)
        setAddVisitModal(false)
    }

    const CancelReasonModalClose = () => {
        setSelectedStatus(0)
        setCancelReasonModal(false)
    }

    const ConfirmationModalClose = () => {
        setSelectedStatus(0)
        setConfirmationModal(false)
    }

    // const CompleteTrialModalClose = () => setCompleteTrialModal(false)
    const TerminationReasonModalClose = () => setTerminationReasonModal(false)

    const onchange = (e) => {
        const { name, value } = e.target
        setStatusUpdateFields((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const OnChangeStatus = (data) => {
        setConfirmationModal(true)
        setSelectedStatus(data.value)
        setPatientAppointmentId(data.patient_appointment_id)
    }

    const ConfirmationSubmit = () => {
        if (SelectedStatus === "2" || SelectedStatus === "3") {
            setAddVisitModal(true)
            setConfirmationModal(false)
        } else {
            setCancelReasonModal(true)
            setConfirmationModal(false)
        }
    }

    const UpdateStatusSubmit = (data) => {
        console.log("datadatadata", data);
        // if (SelectedStatus === "7") {
        //     const data = {
        //         cancellation_detail: StatusUpdateFields.cancellation_detail,
        //         default_cancel_reason_id: StatusUpdateFields.default_cancel_reason_id,
        //         patient_appointment_id: PatientAppointmentId,
        //         status: SelectedStatus,
        //     }
        //     dispatch(NewScreenTrialRequestStatusUpdateAction(data))
        // }
        if ((SelectedStatus === "5" || SelectedStatus === "4" || SelectedStatus === "7") && (StatusUpdateFields.visit_note.length > 0)) {
            if ((SelectedStatus === "5" || SelectedStatus === "7") && (data === "newVisit")) {
                setAddVisitModal(true)
                setCancelReasonModal(false)
            } else if ((SelectedStatus === "4" || SelectedStatus === "7") && (data === "endStudy")) {
                props.history.push({
                    pathname: "/trial-clinic/payment",
                    state: {
                        AppointmentDetailId: id,
                        PatientAppointmentId: PatientAppointmentId,
                        status: "6",
                        visit_note: StatusUpdateFields.visit_note
                    }
                })
            } else if ((SelectedStatus === "4" || SelectedStatus === "7") && (data === "newVisit")) {
                props.history.push({
                    pathname: "/trial-clinic/payment",
                    state: {
                        createNewTrial: true,
                        AppointmentDetailId: id,
                        PatientAppointmentId: PatientAppointmentId,
                        status: SelectedStatus,
                        visit_note: StatusUpdateFields.visit_note
                    }
                })
            }
        } else if ((SelectedStatus === "5" || SelectedStatus === "4" || SelectedStatus === "7") && (StatusUpdateFields.visit_note.length <= 0)) {
            toast.error("Text note is required!", { theme: "colored" })
        }
    }

    const addScreeningVisit = (e) => {
        e.preventDefault();
        const data = {
            patient_appointment_id: PatientAppointmentId,
            status: SelectedStatus,
            appointment_date: moment(startDate).format("YYYY-MM-DD"),
            trial_clinic_appointment_slot_id: StatusUpdateFields.available_time,
            visit_note: StatusUpdateFields.visit_note
        }
        console.log("addScreeningVisit", data);
        dispatch(NewScreenTrialRequestStatusUpdateAction(data))
    }

    useEffect(() => {
        if ((loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.status_code === 200) && (loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.data.last_marked_status === "5")) {
            setAddVisitModal(false)
            setSelectedStatus(0)
            dispatch(PatientAppointMentDetailAction(id))
            setStatusUpdateFields({ ...StatusUpdateFields, visit_note: "" })
        }
        // else if ((loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.status_code === 200) && (loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.data.last_marked_status === "7")) {
        //     setTerminationReasonModal(false)
        //     props.history.push("/trial-clinic/my-appointments")
        // }
    }, [dispatch, loadingSelector.trial_status])

    return (
        <>
            <div className="clinical-dashboard AppointmentDetail screenPatientDetail">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Appointment Details</h1>
                    </div>
                    {
                        AppointmentDetail !== undefined
                            ?
                            <>
                                <div className='repeat-white-bx mb-5'>
                                    <div className='PatientDetailsHeader'>
                                        <div className='appointment-detail patient-appointment-details'>
                                            <img src={AppointmentDetail.data.patient_user_info.profile_image !== null ? AppointmentDetail.data.patient_user_info.profile_image : "/images/placeholder-img.jpg"} alt={AppointmentDetail.data.patient_user_info.first_name} />
                                            <div className=''>
                                                <h2 className='mb-2'>{AppointmentDetail.data.clinic_trial_info.trial_name}</h2>
                                                <span className='badge badge-primary d-inline-block mb-2'>Approved</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Date & Time</h2>
                                                <p>{moment(AppointmentDetail.data.appointment_date).format("MMMM DD, YYYY")},
                                                    ({AppointmentDetail.data.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to {AppointmentDetail.data.trial_clinic_appointment_slot_info.booking_slot_info.to_time})</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Clinic Address</h2>
                                                <p>{AppointmentDetail.data.trial_clinic_user_info.address}</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Trial for</h2>
                                                <p>{AppointmentDetail.data.clinic_trial_info.trial_name}</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Trial Compensation</h2>
                                                <p>{AppointmentDetail.data.clinic_trial_info.compensation ? `$ ${AppointmentDetail.data.clinic_trial_info.compensation}` : "To be Decided at Clinic"}</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Clinic Compensation</h2>
                                                <p>$ {AppointmentDetail.data.compensation == null ? "0" : AppointmentDetail.data.compensation}</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Sponsor</h2>
                                                <p>{AppointmentDetail.data.clinic_trial_info.user_info.sponsor_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='repeat-white-bx'>
                                    <h2 className="section-title"> Trial Visits </h2>

                                    <div className='row'>
                                        {
                                            AppointmentDetail.totalVisits && AppointmentDetail.totalVisits.map((value, index) => {
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
                                                                            value.status === 6 ?
                                                                                <span className='badge badge-danger d-inline-block mb-3'>End of Study</span> :
                                                                                value.status === 7 ?
                                                                                    <span className='badge badge-danger d-inline-block mb-3'>Early Termination</span> :
                                                                                    null
                                                            }
                                                            <p className={`mb-0 ${value?.visit_note?.length > 180 && ReadMore !== value.id && "fixTextLength"}`}><span>{value.visit_note}</span>{value?.visit_note?.length > 180 && <i onClick={() => setReadMore(() => ReadMore === value.id ? null : value.id)}>{ReadMore === value.id ? " Read less" : " Read more"}</i>} </p>
                                                            {value.status === 0
                                                                ?
                                                                <SelectBox
                                                                    name="status"
                                                                    onChange={(e) => OnChangeStatus({ patient_appointment_id: value.patient_appointment_id, value: e.target.value })}
                                                                    FormGroupClass="mb-0 mt-3"
                                                                    value={SelectedStatus}
                                                                    optionData={
                                                                        <>
                                                                            <option hidden>Update Status</option>
                                                                            <option value="4">Complete</option>
                                                                            <option value="5">Incomplete</option>
                                                                            <option value="7">Early Termination</option>
                                                                        </>
                                                                    }
                                                                />
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                            :
                            [1, 2,].map((_, index) => {
                                return (
                                    <Skeleton key={index} height={250} className="mb-5" />
                                )
                            })
                    }
                </div>
            </div>

            <CommonModal show={addVisitModal} onHide={addVisitModalClose} keyboard={false} size="md"
                ModalTitle="Trial Appointment"
                onClick={addVisitModalClose}
                ModalData={
                    <form autoComplete="off">
                        <div className='calender-outer'>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={moment().toDate()}
                                inline
                            />
                        </div>
                        <div className="available-time">
                            <h2>Available Time</h2>
                            <div className="time-row">
                                {
                                    AppointmentDetail && AppointmentDetail.trialAppointmentSlots.map((value, index) => {
                                        return (
                                            <label key={index}><input type="radio" onChange={onchange} value={value.id} name="available_time" /><span>{value.booking_slot_info.from_time} - {value.booking_slot_info.to_time}</span></label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Confirm"
                                hasSpinner={loadingSelector.loading}
                                disabled={loadingSelector.loading}
                                onClick={addScreeningVisit}
                            />
                        </div>
                    </form>
                }
            />

            <CommonModal show={ConfirmationModal} onHide={ConfirmationModalClose} keyboard={false} size="md"
                onClick={ConfirmationModalClose}
                ModalData={
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={ConfirmationModalClose}></button>
                        <div className='congrats-bx'>
                            <h2>Are you Sure?</h2>
                            <p>Do you really want to change the status?</p>
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnColor="primary btn-sm"
                                BtnText="Cancel"
                                onClick={ConfirmationModalClose}
                            />
                            <Button
                                isButton="true"
                                BtnColor="green btn-sm"
                                BtnText="Submit"
                                onClick={ConfirmationSubmit}
                            />
                        </div>
                    </>
                }
            />

            <CommonModal show={CancelReasonModal} onHide={CancelReasonModalClose} keyboard={false} size="md"
                ModalTitle="Text Note"
                onClick={CancelReasonModalClose}
                ModalData={
                    <form autoComplete="off">
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Note"
                            name="visit_note"
                            onChange={onchange}
                        />
                        {
                            SelectedStatus === "4" || SelectedStatus === "7" ?
                                <div className='clnicaltrial-detail-ftr mt-0'>
                                    <Button
                                        isButton="true"
                                        BtnColor="green btn-sm"
                                        BtnType="button"
                                        BtnText="End of Study"
                                        onClick={() => UpdateStatusSubmit("endStudy")}
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary btn-sm"
                                        BtnType="button"
                                        BtnText={SelectedStatus === "4" ? "Pay & Create New Visit" : "Create New Visit"}
                                        onClick={() => UpdateStatusSubmit("newVisit")}
                                    />
                                </div>
                                :
                                <div className='clnicaltrial-detail-ftr mt-0'>
                                    <Button
                                        isButton="true"
                                        BtnType="button"
                                        BtnColor="primary w-100"
                                        BtnText="Submit"
                                        onClick={UpdateStatusSubmit}
                                        hasSpinner={loadingSelector.loading}
                                        disabled={loadingSelector.loading}
                                    />
                                </div>
                        }
                    </form>
                }
            />

            {/* <CommonModal show={CompleteTrialModal} onHide={CompleteTrialModalClose} keyboard={false} size="md"
                onClick={CompleteTrialModalClose}
                ModalData={
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={CompleteTrialModalClose}></button>
                        <div className='congrats-bx'>
                            <img src="/images/congrats.svg" alt="Congratulations" />
                            <h2>Trial Visit Successfully Completed</h2>
                            <p>Lorem ipsum dolor amet sectetur adipiscing vehicula diam nis in congue tortor sem, varius eu nulla volutpatmollis.</p>
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnColor="green btn-sm"
                                BtnText="End of Study"
                                onClick={() => props.history.push({
                                    pathname: "/trial-clinic/payment",
                                    state: {
                                        AppointmentDetailId: id,
                                        PatientAppointmentId: PatientAppointmentId,
                                        status: SelectedStatus,
                                        visit_note: StatusUpdateFields.visit_note
                                    }
                                })}
                            />
                            <Button
                                isButton="true"
                                BtnColor="primary btn-sm"
                                BtnText="Pay & Create New Visit"
                                onClick={() => props.history.push({
                                    pathname: "/trial-clinic/payment",
                                    state: {
                                        createNewTrial: true,
                                        AppointmentDetailId: id,
                                        PatientAppointmentId: PatientAppointmentId,
                                        status: SelectedStatus,
                                        visit_note: StatusUpdateFields.visit_note
                                    }
                                })}
                            />
                        </div>
                    </>
                }
            /> */}

            {/* <CommonModal show={TerminationReasonModal} onHide={TerminationReasonModalClose} keyboard={false}
                ModalTitle="Text Note"
                onClick={TerminationReasonModalClose}
                ModalData={
                    <>
                        <Form onSubmit={(e) => {e.preventDefault(); UpdateStatusSubmit()}}>
                            <SelectBox
                                labelText="Reason for Rejection"
                                name="default_cancel_reason_id"
                                onChange={onchange}
                                required={true}
                                optionData=
                                {
                                    <>
                                        <option value="0" hidden>Select Cancellation Reason</option>
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
                                placeholder="Enter Here..."
                                name="cancellation_detail"
                                labelText="Note"
                                required={true}
                                onChange={onchange}
                            />
                            <div className='clnicaltrial-detail-ftr mt-0'>
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="primary w-100"
                                    BtnText="Confirm"
                                    hasSpinner={loadingSelector.loading}
                                    disabled={loadingSelector.loading}
                                />
                            </div>
                        </Form>
                    </>
                }
            /> */}
        </>
    );
};

export default MyAppointmentsDetails;
