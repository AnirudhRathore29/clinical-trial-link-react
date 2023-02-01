import React, { useEffect, useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import "react-datepicker/dist/react-datepicker.css";
import '../TrialRequests/TrialRequests.css'
import '../../Patient/MyAppointments/MyAppointments.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import OtpInput from 'react-otp-input';
import { InputText } from '../../views/Components/Common/Inputs/Inputs';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { NewScreenTrialRequestStatusUpdateAction, PatientAppointMentDetailAction } from '../../redux/actions/TrialClinicAction';
import moment from 'moment';

const Payment = (props) => {
    const [otp, setOtp] = useState();
    const [otpSent, setOtpSent] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [addVisitModal, setAddVisitModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [clicked, setClicked] = useState(false);
    const [payingForCurrentVisit, setPayingForCurrentVisit] = useState(false);
    const [StatusUpdateFields, setStatusUpdateFields] = useState({
        visit_note: "",
        available_time: ''
    })

    const AppointmentDetail = useSelector(state => state.trial_clinic.new_screen_trial_detail.data)
    const loadingSelector = useSelector(state => state.trial_clinic)

    const id = props.location && props.location.state.AppointmentDetailId
    const PatientAppointmentId = props.location && props.location.state.PatientAppointmentId
    const dispatch = useDispatch()

    const OtpSent = () => setOtpSent(true);
    const PaymentOption = () => setPaymentOption(!paymentOption);
    const addVisitModalClose = () => {
        setAddVisitModal(false)
        setPayingForCurrentVisit(false)
    }

    console.log("props", props);
    console.log("AppointmentDetail", AppointmentDetail);
    console.log("loadingSelector", loadingSelector);
    console.log("payingForCurrentVisit", payingForCurrentVisit);
    console.log("props.location.state.status", props.location.state.status);
    console.log("id", id);

    useEffect(() => {
        dispatch(PatientAppointMentDetailAction(id))
    }, [dispatch])

    const onchange = (e) => {
        const { name, value } = e.target
        setStatusUpdateFields((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const addScreeningVisit = (e) => {
        e.preventDefault();
        const data = {
            patient_appointment_id: PatientAppointmentId,
            status: props.location && props.location.state.status,
            appointment_date: moment(startDate).format("YYYY-MM-DD"),
            is_paying: payingForCurrentVisit ? 1 : 0,
            trial_clinic_appointment_slot_id: StatusUpdateFields.available_time,
            visit_note: props.location && props.location.state.visit_note
        }
        console.log("addScreeningVisit", data);
        dispatch(NewScreenTrialRequestStatusUpdateAction(data))
    }

    const CompletePayment = (id) => {
        if (id === "6") {
            setClicked(true)
            const data = {
                patient_appointment_id: props.location && props.location.state.PatientAppointmentId,
                status: props.location && props.location.state.status,
                visit_note: props.location && props.location.state.visit_note
            }
            console.log("end of study");
            console.log("datadata", data);
            dispatch(NewScreenTrialRequestStatusUpdateAction(data))
        } else {
            setPayingForCurrentVisit(true)
            setAddVisitModal(true)
        }
    }

    useEffect(() => {
        if ((loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.status_code === 200) && (loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.data.last_marked_status === "4")) {
            setAddVisitModal(false)
            props.history.push(`/trial-clinic/appointments/${id}`)
        } else if ((loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.status_code === 200) && (loadingSelector.trial_status.data !== undefined && loadingSelector.trial_status.data.data.last_marked_status === "6")) {
            props.history.push(`/trial-clinic/my-appointments`)
        }
    }, [dispatch, loadingSelector.trial_status])
    return (
        <>
            <div className="clinical-dashboard screenPatientDetail">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Payment</h1>
                        {
                            props.location && props.location.state.createNewTrial && <button type='button' className='btn-text' onClick={() => setAddVisitModal(true)}>Skip Payment and Create Visit</button>
                        }
                    </div>
                    <div className='repeat-white-bx container-small'>
                        <h2>Choose Payment Option</h2>
                        <div className='update-status'>
                            <RadioBtn className="radio-btn" type="radio" name="payment-option" labelText="Cash" defaultChecked="true" onChange={PaymentOption} />
                            {
                                paymentOption ?
                                    null
                                    :
                                    <>
                                        {
                                            otpSent ?
                                                null
                                                :
                                                <div className='send-otp mb-4'>
                                                    <InputText
                                                        type="number"
                                                        labelText="Patient Phone Number"
                                                        placeholder="Enter Patient Phone Number"
                                                    />
                                                    <Button
                                                        isButton="true"
                                                        BtnType="submit"
                                                        BtnColor="primary"
                                                        BtnText="Send OTP"
                                                        onClick={OtpSent}
                                                    />
                                                </div>
                                        }
                                        {
                                            otpSent ?
                                                <>
                                                    <div className='from-group otp-bx-outer mb-4'>
                                                        <label>Enter OTP</label>
                                                        <OtpInput
                                                            containerStyle="otp-bx"
                                                            value={otp}
                                                            name="otp"
                                                            onChange={setOtp}
                                                            isInputNum="true"
                                                            numInputs={4}
                                                            inputStyle="form-control"
                                                            shouldAutoFocus={true}
                                                        />
                                                        <div className='resend-otp'>
                                                            <button>Resend OTP?</button>
                                                        </div>
                                                    </div>

                                                    <InputText
                                                        type="text"
                                                        name="amount"
                                                        placeholder="Enter Amount"
                                                        labelText="Amount ($)"
                                                    />

                                                    <Button
                                                        isButton="true"
                                                        BtnType="submit"
                                                        BtnColor="primary w-100 mb-4"
                                                        BtnText="Paid"
                                                        hasSpinner={clicked && loadingSelector.loading}
                                                        disabled={clicked && loadingSelector.loading}
                                                        onClick={() => CompletePayment(props.location.state.status)}
                                                    />
                                                </>
                                                :
                                                null
                                        }
                                    </>
                            }
                        </div>
                        <div className='update-status'>
                            <RadioBtn className="radio-btn" type="radio" name="payment-option" labelText="Bank" onChange={PaymentOption} />
                            {
                                paymentOption ?
                                    <>
                                        <InputText
                                            type="text"
                                            name="bank_name"
                                            placeholder="Enter Bank Name"
                                            labelText="Name of Bank"
                                        />
                                        <InputText
                                            type="text"
                                            name="account_holder_name"
                                            placeholder="Enter Name"
                                            labelText="Account Holder Name"
                                        />
                                        <InputText
                                            type="text"
                                            name="account_number"
                                            placeholder="Enter Account Number"
                                            labelText="Account Number"
                                        />
                                        <InputText
                                            type="text"
                                            name="routing_number"
                                            placeholder="Enter Routing Number"
                                            labelText="Routing Number"
                                        />
                                        <InputText
                                            type="text"
                                            name="amount"
                                            placeholder="Enter Amount"
                                            labelText="Amount ($)"
                                        />
                                        {props.location.state.status === "4" &&
                                            <div className='info-bx'>
                                                <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> Payment will be processed once new visit is scheduled at the trial clinic.
                                            </div>
                                        }

                                        <Button
                                            isButton="true"
                                            BtnType="submit"
                                            BtnColor="primary w-100"
                                            BtnText="Paid"
                                            hasSpinner={clicked && loadingSelector.loading}
                                            disabled={clicked && loadingSelector.loading}
                                            onClick={() => CompletePayment(props.location.state.status)}
                                        />
                                    </>
                                    :
                                    null
                            }
                        </div>
                    </div>
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
        </>
    );
};

export default Payment;
