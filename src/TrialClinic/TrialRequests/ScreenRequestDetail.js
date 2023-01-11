import React, { useEffect, useState } from 'react';
import { SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './TrialRequests.css'
import '../../Patient/MyAppointments/MyAppointments.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NewScreenTrialRequestDetailAction, NewScreenTrialRequestStatusUpdateAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const ClinicTrialScreenRequestDetail = (props) => {
    const loadingSelector = useSelector(state => state.trial_clinic)
    const screenPatientDetail = useSelector(state => state.trial_clinic.new_screen_trial_detail.data)

    const [addVisitModal, setAddVisitModal] = useState(false);
    const [CancelReasonModal, setCancelReasonModal] = useState(false);
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const [ReadMore, setReadMore] = useState(false);
    const [SelectedStatus, setSelectedStatus] = useState();
    const [PatientAppointmentId, setPatientAppointmentId] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [StatusUpdateFields, setStatusUpdateFields] = useState({
        visit_note: "",
        available_time: ''
    })

    console.log("StatusUpdateFields", StatusUpdateFields);
    console.log("screenPatientDetail", screenPatientDetail);
    console.log("loadingSelector", loadingSelector);
    console.log("SelectedStatus", typeof SelectedStatus);
    console.log("startDate", startDate);

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(NewScreenTrialRequestDetailAction(id))
    }, [dispatch])

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
        }
        else {
            setCancelReasonModal(true)
            setConfirmationModal(false)
        }
    }

    const UpdateStatusSubmit = (id) => {
        const data = {
            patient_appointment_id: PatientAppointmentId,
            status: SelectedStatus,
            visit_note: StatusUpdateFields.visit_note
        }
        dispatch(NewScreenTrialRequestStatusUpdateAction(data))
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
        console.log("data", data);
        dispatch(NewScreenTrialRequestStatusUpdateAction(data))
    }

    useEffect(() => {
        if ((loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.status_code === 200) && (loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.data.last_marked_status === "2")) {
            setAddVisitModal(false)
            setSelectedStatus(0)
            dispatch(NewScreenTrialRequestDetailAction(id))
        } else if ((loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.status_code === 200) && (loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.data.last_marked_status === "1" || "3")) {
            setCancelReasonModal(false)
            props.history.push("/trial-clinic/screen-trial-request")
        }
    }, [dispatch, loadingSelector.trial_status])

    return (
        <>
            <div className="clinical-dashboard screenPatientDetail">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Patient Details</h1>
                    </div>
                    {
                        screenPatientDetail !== undefined
                            ?
                            <>
                                <div className='repeat-white-bx mb-5'>
                                    <div className='PatientDetailsHeader'>
                                        <div className='appointment-detail patient-appointment-details'>
                                            <img src={screenPatientDetail.data.patient_user_info.profile_image !== null ? screenPatientDetail.data.patient_user_info.profile_image : "/images/placeholder-img.jpg"} alt={screenPatientDetail.data.patient_user_info.first_name} />
                                            <div className=''>
                                                <h2 className='mb-2'>{screenPatientDetail.data.clinic_trial_info.trial_name}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Gender</h2>
                                                <p>{
                                                    screenPatientDetail.data.patient_user_info.gender === "F" ? "Female"
                                                        :
                                                        screenPatientDetail.data.patient_user_info.gender === "M" ? "Male"
                                                            :
                                                            "Non Binary"
                                                }</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>DOB</h2>
                                                <p>{moment(screenPatientDetail.data.patient_user_info.dob).format("MMMM DD, YYYY")}</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Phone Number</h2>
                                                <p>{screenPatientDetail.data.patient_user_info.phone_number}</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Trial for</h2>
                                                <p>{screenPatientDetail.data.clinic_trial_info.trial_name}</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Location</h2>
                                                <p>{screenPatientDetail.data.patient_user_info.address + ", " + screenPatientDetail.data.patient_user_info.state_info.name}</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Date & Time</h2>
                                                <p>{moment(screenPatientDetail.data.appointment_date).format("MMMM DD, YYYY")},
                                                    ({screenPatientDetail.data.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to {screenPatientDetail.data.trial_clinic_appointment_slot_info.booking_slot_info.to_time})</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Compensation</h2>
                                                <p>$ {screenPatientDetail.data.compensation == null ? "0" : screenPatientDetail.data.compensation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='repeat-white-bx'>
                                    <h2 className="section-title"> Screening Visits </h2>

                                    <div className='row'>
                                        {
                                            screenPatientDetail.totalVisits && screenPatientDetail.totalVisits.map((value, index) => {
                                                return (
                                                    <div className='col-lg-4' key={index}>
                                                        <div className='patientVisit'>
                                                            <h3><strong>Visit Number :</strong> {value.visit_number}</h3>
                                                            <p>{moment(value.appointment_date).format("MMMM DD, YYYY")},
                                                                ({value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to {value.trial_clinic_appointment_slot_info.booking_slot_info.to_time})</p>
                                                            <p className={`mb-0 ${value.visit_note.length > 180 && ReadMore === false && "fixTextLength"}`}><span>{value.visit_note}</span>{value.visit_note.length > 180 && <i onClick={() => setReadMore(!ReadMore)}>{ReadMore ? " Read less" : " Read more"}</i>} </p>
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
                                                                            <option value="1">Not Eligible</option>
                                                                            <option value="2">Pending (Reschedule)</option>
                                                                            <option value="3">Approve</option>
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
                ModalTitle={SelectedStatus === "2" ? "Reschedule Screening" : "Trial Appointment"}
                onClick={addVisitModalClose}
                ModalData={
                    <form onSubmit={addScreeningVisit} autoComplete="off">
                        <div className='calender-outer'>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                inline
                            />
                        </div>
                        <div className="available-time">
                            <h2>Available Time</h2>
                            <div className="time-row">
                                {
                                    screenPatientDetail && screenPatientDetail.trialAppointmentSlots.map((value, index) => {
                                        return (
                                            <label key={index}><input type="radio" onChange={onchange} value={value.id} name="available_time" /><span>{value.booking_slot_info.from_time} - {value.booking_slot_info.to_time}</span></label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Text Note"
                            name="visit_note"
                            onChange={onchange}
                            required={true}
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
                ModalTitle="Cancelation Reason"
                onClick={CancelReasonModalClose}
                ModalData={
                    <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); UpdateStatusSubmit(1) }}>
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Enter Cancelation Reason"
                            name="visit_note"
                            required={true}
                            onChange={onchange}
                        />
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Submit"
                                hasSpinner={loadingSelector.loading}
                                disabled={loadingSelector.loading}
                            />
                        </div>
                    </form>
                }
            />
        </>
    );
};

export default ClinicTrialScreenRequestDetail;
