import React, { useEffect, useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import "react-datepicker/dist/react-datepicker.css";
import '../TrialRequests/TrialRequests.css'
import '../../Patient/MyAppointments/MyAppointments.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import { InputText, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { NewScreenTrialRequestStatusUpdateAction, PatientAppointMentDetailAction } from '../../redux/actions/TrialClinicAction';
import moment from 'moment';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const Payment = (props) => {
    const id = props?.location?.state?.AppointmentDetailId
    const PatientAppointmentId = props?.location?.state?.PatientAppointmentId
    const status = props?.location?.state?.status
    const dispatch = useDispatch()

    // const AppointmentDetail = useSelector(state => state.trial_clinic.new_screen_trial_detail.data)
    const loadingSelector = useSelector(state => state.trial_clinic)

    const [paymentOption, setPaymentOption] = useState("Cash");
    const [skipPayment, setSkipPayment] = useState(false);
    const [addVisitModal, setAddVisitModal] = useState(false);
    const [CancelReasonModal, setCancelReasonModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endStudy, setEndStudy] = useState(false);
    const [StatusUpdateFields, setStatusUpdateFields] = useState({
        visit_note: "",
        available_time: '',
        amount: ''
    })

    const PaymentOption = (method) => setPaymentOption(method);
    const addVisitModalClose = () => {
        setAddVisitModal(false)
        setSkipPayment(false)
    }

    console.log("props", props);
    // console.log("AppointmentDetail", AppointmentDetail);
    console.log("loadingSelector", loadingSelector);
    console.log("props.location.state.status", status);
    console.log("skipPayment", skipPayment);
    console.log("StatusUpdateFields", StatusUpdateFields);
    console.log("id", id);

    // useEffect(() => {
    //     dispatch(PatientAppointMentDetailAction(id))
    // }, [dispatch])

    const onChange = (e) => {
        const { name, value } = e.target;
        setStatusUpdateFields((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    };

    const CancelReasonModalClose = () => {
        setCancelReasonModal(false)
        setEndStudy(false)
    }

    const addScreeningVisit = (e) => {
        e.preventDefault();

        const data = {
            patient_appointment_id: PatientAppointmentId,
            status: status,
            appointment_date: moment(startDate).format("YYYY-MM-DD"),
            trial_clinic_appointment_slot_id: StatusUpdateFields?.available_time,
            visit_note: StatusUpdateFields?.visit_note,
        }
        console.log("addScreeningVisit", data);
        dispatch(NewScreenTrialRequestStatusUpdateAction(
            skipPayment ?
                data
                :
                {
                    ...data,
                    paid_by: paymentOption,
                    amount: StatusUpdateFields?.amount,
                    transaction_datetime: moment(new Date()).format("YYYY-MM-DD HH:MM:SS"),
                }
        ))
    }

    const UpdateStatusSubmit = () => {
        const data = {
            patient_appointment_id: PatientAppointmentId,
            status: endStudy ? "6" : status,
            visit_note: StatusUpdateFields?.visit_note,
            paid_by: paymentOption,
            amount: StatusUpdateFields?.amount,
            transaction_datetime: moment(new Date()).format("YYYY-MM-DD HH:MM:SS"),
        }
        dispatch(NewScreenTrialRequestStatusUpdateAction(data))
    }

    const CompletePayment = (data) => {
        if(data){
            setEndStudy(true)
        }
        if (StatusUpdateFields?.amount.trim()) {
            if (paymentOption === "Cash") {
                if (status === "1" || data === "endStudy") {
                    setCancelReasonModal(true)
                } else {
                    setAddVisitModal(true)
                }
            } else if(props?.location?.state?.isClinicBankDetailSet === 0 && props?.location?.state?.isPatientBankDetailSet === 0) {
                toast.error("Patient and your bank details are not added to your profile.", { theme: "colored", autoClose: 5000});
            } else if(props?.location?.state?.isClinicBankDetailSet === 0){
                toast.error("Please add your bank details to your profile.", { theme: "colored", autoClose: 5000});
            } else if(props?.location?.state?.isPatientBankDetailSet === 0){
                toast.error("Patient has not added bank details to the profile.", { theme: "colored", autoClose: 5000});
            } else if(props?.location?.state?.isClinicBankDetailSet === 1 && props?.location?.state?.isPatientBankDetailSet === 1) {
                if (status === "1" || data === "endStudy") {
                    setCancelReasonModal(true)
                } else {
                    setAddVisitModal(true)
                }
            }
        }
        else {
            toast.error("Please add amount first!", { theme: "colored", autoClose: 5000});
        }
    }

    useEffect(() => {
        if (props?.location?.state?.page === "screening") {
            if ((loadingSelector?.trial_status?.data?.status_code === 200) && (loadingSelector?.trial_status?.data?.data?.last_marked_status === "2")) {
                setAddVisitModal(false)
                setSkipPayment(false)
                props.history.push(`/trial-clinic/screen-trial-request/${props?.location?.state?.paramsID}`)
            } else if ((loadingSelector?.trial_status?.data?.status_code === 200) && (loadingSelector?.trial_status?.data?.data?.last_marked_status === "1" || "3")) {
                props.history.push("/trial-clinic/screen-trial-request")
            }
        } else {
            if ((loadingSelector?.trial_status?.data?.status_code === 200) && (loadingSelector?.trial_status?.data?.data?.last_marked_status === "4" || loadingSelector?.trial_status?.data?.data?.last_marked_status === "5" || loadingSelector?.trial_status?.data?.data?.last_marked_status === "7")) {
                setAddVisitModal(false)
                props.history.push(`/trial-clinic/appointments/${props?.location?.state?.paramsID}`)
            } else if ((loadingSelector?.trial_status?.data?.status_code === 200) && (loadingSelector?.trial_status?.data?.data?.last_marked_status === "6")) {
                setEndStudy(false)
                props.history.push(`/trial-clinic/my-appointments`)
            }
        }
    }, [dispatch, loadingSelector.trial_status])

    return (
        <>
            <div className="clinical-dashboard screenPatientDetail">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Payment</h1>
                        {
                            (status !== "1") && <button type='button' className='btn-text' onClick={() => { setSkipPayment(true); setAddVisitModal(true) }}>Skip Payment and Create Visit</button>
                        }
                    </div>
                    <div className='repeat-white-bx container-small'>
                        <h2>Choose Payment Option</h2>
                        <div className='update-status'>
                            <RadioBtn className="radio-btn" type="radio" name="payment-option" labelText="Cash" defaultChecked="true" onChange={() => PaymentOption("Cash")} />
                            <RadioBtn className="radio-btn" type="radio" name="payment-option" labelText="Bank" onChange={() => PaymentOption("Bank")} />
                        </div>
                        {
                            paymentOption === "Bank" &&
                            <>
                                {/* <InputText
                                    type="text"
                                    name="bank_name"
                                    placeholder="Enter Bank Name"
                                    labelText="Name of Bank"
                                    onChange={onChange}
                                />
                                <InputText
                                    type="text"
                                    name="account_holder_name"
                                    placeholder="Enter Name"
                                    labelText="Account Holder Name"
                                    onChange={onChange}
                                />
                                <InputText
                                    type="text"
                                    name="account_number"
                                    placeholder="Enter Account Number"
                                    labelText="Account Number"
                                    onChange={onChange}
                                />
                                <InputText
                                    type="text"
                                    name="routing_number"
                                    placeholder="Enter Routing Number"
                                    labelText="Routing Number"
                                    onChange={onChange}
                                /> */}
                            </>
                        }
                        <InputText
                            type="text"
                            name="amount"
                            placeholder="Enter Amount"
                            labelText="Amount ($)"
                            onChange={onChange}
                        />
                        <div className='btn-group-custom'>
                            {(status === "4" || status === "7") &&
                                <Button
                                    isButton="true"
                                    BtnColor="green btn-sm"
                                    BtnType="button"
                                    BtnText="Pay & End of Study"
                                    onClick={() => CompletePayment("endStudy")}
                                />
                            }
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText={(status === "4" || status === "7") ? "Pay & create new visit" : "Pay"}
                                // hasSpinner={requestStatusSelector?.loading}
                                // disabled={requestStatusSelector?.loading}
                                onClick={CompletePayment}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <CommonModal show={addVisitModal} onHide={addVisitModalClose} keyboard={false} size="md"
                ModalTitle={status === "2" ? "Reschedule Screening" : status === "3" ? "Trial Appointment" : "Reschedule"}
                onClick={addVisitModalClose}
                ModalData={
                    <form autoComplete="off" onSubmit={addScreeningVisit}>
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
                                    props?.location?.state?.slots?.map((value, index) => {
                                        return (
                                            <label key={index}><input type="radio" onChange={onChange} value={value.id} name="available_time" /><span>{value.booking_slot_info.from_time} - {value.booking_slot_info.to_time}</span></label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Text Note"
                            name="visit_note"
                            onChange={onChange}
                            pattern="[^\s]+.{1,}"
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

            <CommonModal show={CancelReasonModal} onHide={CancelReasonModalClose} keyboard={false} size="md"
                ModalTitle={endStudy ? "End of study text note" : "Cancelation Reason"}
                onClick={CancelReasonModalClose}
                ModalData={
                    <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); UpdateStatusSubmit() }}>
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Text Note"
                            name="visit_note"
                            required={true}
                            pattern="[^\s]+.{1,}"
                            onChange={onChange}
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

export default Payment;
