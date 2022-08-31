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
import { PatientAppointMentDetailAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import moment from 'moment';

const MyAppointmentsDetails = () => {
    const [addVisitModal, setAddVisitModal] = useState(false);
    const [CancelReasonModal, setCancelReasonModal] = useState(false);
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const [CompleteTrialModal, setCompleteTrialModal] = useState(false);
    const [SelectedStatus, setSelectedStatus] = useState();
    const [PatientAppointmentId, setPatientAppointmentId] = useState();
    const [startDate, setStartDate] = useState(new Date());

    const loadingSelector = useSelector(state => state.trial_clinic)
    const AppointmentDetail = useSelector(state => state.trial_clinic.new_screen_trial_detail.data)

    const { id } = useParams()
    const dispatch = useDispatch()

    console.log("AppointmentDetail", AppointmentDetail);

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
        setCompleteTrialModal(true)
    }

    const ConfirmationModalClose = () => {
        setSelectedStatus(0)
        setConfirmationModal(false)
    }

    const CompleteTrialModalClose = () => {
        setCompleteTrialModal(false)
        setAddVisitModal(true)
    }

    const OnChangeStatus = (data) => {
        setConfirmationModal(true)
        setSelectedStatus(data.value)
        setPatientAppointmentId(data.patient_appointment_id)
    }

    const ChangeStatus = () => {
        if (SelectedStatus === "2" || SelectedStatus === "3") {
            setAddVisitModal(true)
            setConfirmationModal(false)
        } else {
            setCancelReasonModal(true)
            setConfirmationModal(false)
        }
    }
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
                                                <p>Atlanta, Georgia, United States</p>
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
                                                <p>{AppointmentDetail.data.clinic_trial_info.compensation ? AppointmentDetail.data.clinic_trial_info.compensation : "To be Decided at Clinic" }</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-4'>
                                            <div className='appointment-detail-col'>
                                                <h2>Sponsor</h2>
                                                <p>Emerson Resources</p>
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
                                                            <span className='badge badge-success d-inline-block mb-3'>Completed</span>
                                                            <p className='mb-0'>{value.visit_note}</p>
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
                ModalTitle="Add Another Visit"
                onClick={addVisitModalClose}
                ModalData={
                    <form autoComplete="off">
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
                                <label><input type="radio" name="available_time" defaultChecked /><span>09:00 AM - 11:00 AM</span></label>
                                <label><input type="radio" name="available_time" /><span>11:00 AM - 01:00 PM</span></label>
                                <label><input type="radio" name="available_time" /><span>01:00 PM - 03:00 PM</span></label>
                                <label><input type="radio" name="available_time" /><span>03:00 PM - 05:00 PM</span></label>
                                <label><input type="radio" name="available_time" /><span>05:00 PM - 07:00 PM</span></label>
                            </div>
                        </div>
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Enter Text Note"
                        />
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="button"
                                BtnColor="primary w-100"
                                BtnText="Confirm"
                                onClick={addVisitModalClose}
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
                            />
                            <Button
                                isButton="true"
                                BtnColor="green btn-sm"
                                BtnText="Submit"
                                onClick={ChangeStatus}
                            />
                        </div>
                    </>
                }
            />

            <CommonModal show={CancelReasonModal} onHide={CancelReasonModalClose} keyboard={false} size="md"
                ModalTitle="Appointment Notes"
                onClick={CancelReasonModalClose}
                ModalData={
                    <form autoComplete="off">
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Enter Appointment Notes"
                        />
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="button"
                                BtnColor="primary w-100"
                                BtnText="Submit"
                                onClick={CancelReasonModalClose}
                            />
                        </div>
                    </form>
                }
            />

            <CommonModal show={CompleteTrialModal} onHide={CompleteTrialModalClose} keyboard={false} size="md"
                onClick={CompleteTrialModalClose}
                ModalData={
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={CompleteTrialModalClose}></button>
                        <div className='congrats-bx'>
                            <img src="/images/congrats.svg" alt="Congratulations" />
                            <h2>Trial Visit Successfully Completed</h2>
                            <p>Lorem ipsum dolor amet sectetur adipiscing vehicula diam nis in congue tortor sem, varius eu nulla volutpatmollis . </p>
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isLink="true"
                                URL="/trial-clinic/payment"
                                BtnColor="green btn-sm"
                                BtnText="End of Study"
                            />
                            <Button
                                isButton="true"
                                BtnColor="primary btn-sm"
                                BtnText="Create New Visit"
                                onClick={CompleteTrialModalClose}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default MyAppointmentsDetails;
