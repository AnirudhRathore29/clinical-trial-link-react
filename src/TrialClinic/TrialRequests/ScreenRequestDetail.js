import React, { useEffect, useState } from 'react';
import { SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import DatePicker from "react-datepicker";
import { useHistory, useParams } from 'react-router-dom';
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
    const history = useHistory()
    const loadingSelector = useSelector(state => state.trial_clinic)
    const screenPatientDetail = useSelector(state => state.trial_clinic.new_screen_trial_detail.data)

    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const [ReadMore, setReadMore] = useState();
    const [SelectedStatus, setSelectedStatus] = useState();
    const [PatientAppointmentId, setPatientAppointmentId] = useState();

    console.log("screenPatientDetail", screenPatientDetail);
    console.log("loadingSelector", loadingSelector);
    console.log("SelectedStatus", typeof SelectedStatus);

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(NewScreenTrialRequestDetailAction(id))
    }, [dispatch])

    const ConfirmationModalClose = () => {
        setSelectedStatus(0)
        setConfirmationModal(false)
    }

    const OnChangeStatus = (data) => {
        setConfirmationModal(true)
        setSelectedStatus(data.value)
        setPatientAppointmentId(data.patient_appointment_id)
    }

    const ConfirmationSubmit = () => {
        history.push({
            pathname: "/trial-clinic/payment",
            state: {
                status: SelectedStatus,
                slots: screenPatientDetail?.trialAppointmentSlots,
                PatientAppointmentId: PatientAppointmentId,
                page: "screening",
                paramsID: id,
                isClinicBankDetailSet: screenPatientDetail?.data.isClinicBankDetailSet,
                isPatientBankDetailSet: screenPatientDetail?.data.isPatientBankDetailSet
            }
        })
    }

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
                                                            {
                                                                value.status === 1 ?
                                                                    <span className='badge badge-danger d-inline-block mb-3'>Not eligible</span> :
                                                                    value.status === 2 ?
                                                                        <span className='badge badge-primary d-inline-block mb-3'>Pending</span> :
                                                                        value.status === 3?
                                                                            <span className='badge badge-success d-inline-block mb-3'>Approve</span> :
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
        </>
    );
};

export default ClinicTrialScreenRequestDetail;
