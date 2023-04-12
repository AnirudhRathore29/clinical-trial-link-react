import React, { useEffect, useState } from 'react';
import { SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import DatePicker from "react-datepicker";
import { useHistory, useParams } from 'react-router-dom';
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

// toast.configure();

const MyAppointmentsDetails = (props) => {
    const history = useHistory()
    
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const [SelectedStatus, setSelectedStatus] = useState();
    const [ReadMore, setReadMore] = useState();
    const [PatientAppointmentId, setPatientAppointmentId] = useState();

    const GetCurrentRoleId = useSelector(state => state.auth.user.role)
    const AppointmentDetail = useSelector(state => state.trial_clinic.new_screen_trial_detail.data)
    const GetCancelReasonsSelector = useSelector(state => state.common_data.data)

    const { id } = useParams()
    const dispatch = useDispatch()

    console.log("AppointmentDetail", AppointmentDetail);
    console.log("GetCancelReasonsSelector", GetCancelReasonsSelector);

    useEffect(() => {
        dispatch(GetCancelReasonsAction(GetCurrentRoleId))
    }, [dispatch, GetCurrentRoleId])

    useEffect(() => {
        dispatch(PatientAppointMentDetailAction(id))
    }, [dispatch])

    console.log("SelectedStatus", SelectedStatus);

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
                AppointmentDetailId: id,
                status: SelectedStatus,
                slots: AppointmentDetail?.trialAppointmentSlots,
                PatientAppointmentId: PatientAppointmentId,
                page: "appointment",
                paramsID: id,
                isClinicBankDetailSet: AppointmentDetail?.data.isClinicBankDetailSet,
                isPatientBankDetailSet: AppointmentDetail?.data.isPatientBankDetailSet
            }
        })
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

export default MyAppointmentsDetails;
