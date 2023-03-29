import { useEffect, useState } from 'react';
import CommonModal from '../Common/Modal/Modal'
import DatePicker from "react-datepicker";
import Button from '../Common/Buttons/Buttons';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { LogoLoader } from '../Common/LogoLoader/LogoLoader';
import { useDispatch, useSelector } from 'react-redux';
import { PatientBookAppointmentAction } from '../../../redux/actions/PatientAction';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputText } from '../Common/Inputs/Inputs';

toast.configure();
const PatientBookingProcess = ({ viewDetails, show, handleClose, onClickChat, show2, handleClose2, handleShow2, show3, handleClose3, handleShow3, onlyChat, bookingSlotData, bookingId }) => {
    const dispatch = useDispatch();
    const bookingTrialSelector = useSelector(state => state.patient);

    const [bookingSlots, setBookingSlots] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const [bookingSubmit, setBookingSubmit] = useState(false);
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const [thanksObj, setThanksObj] = useState()
    const [ReferralCode, setReferralCode] = useState()

    console.log("bookingSlots", bookingSlots);
    console.log("bookingTrialSelector", bookingTrialSelector);

    useEffect(() => {
        if (bookingSubmit) {
            if (Object.keys(bookingTrialSelector.book_appointment).length !== 0 && !bookingTrialSelector.loading) {
                toast.success(bookingTrialSelector.book_appointment.data.message, { theme: "colored" });
                setThanksObj(bookingTrialSelector.book_appointment.data.data);
                handleShow3();
                setBookingSubmit(false)
            } else if (Object.keys(bookingTrialSelector.error).length !== 0 && !bookingTrialSelector.loading) {
                toast.error(bookingTrialSelector.error.message, { theme: "colored" })
                setBookingSubmit(false)
            }
        }
    }, [bookingTrialSelector, bookingSubmit])

    const ConfirmAppointmentSubmit = (e) => {
        e.preventDefault();
        let data = {
            trial_clinic_appointment_id: bookingId,
            appointment_date: moment(startDate).format("YYYY-MM-DD"),
            trial_clinic_appointment_slot_id: bookingSlots,
            referal_code: ReferralCode
        }
        dispatch(PatientBookAppointmentAction(data))
        setBookingSubmit(true)
    }

    const handleBookingAppointmentSubmit = (e) => {
        e.preventDefault();
        if(bookingSlots){
            setConfirmationModal(true);
            handleClose2()
        } else {
            toast.error("Please select booking slot!", { theme: "colored" })
        }
    }

    const ConfirmationModalClose = () => {
        setConfirmationModal(false);
    }

    console.log("bookingTrialSelector", bookingTrialSelector);

    useEffect(() => {
        if (!bookingTrialSelector.book_appointment && bookingTrialSelector.book_appointment.data.data.status_code === 200) {
            setBookingSlots()
        }
    }, [bookingTrialSelector])

    return (
        <>
            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle={
                    viewDetails !== undefined &&
                    <>
                        <h2> {viewDetails.data.clinic_trial_info.trial_name} </h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on {moment(viewDetails.data.clinic_trial_info.updated_date).format("MMM Do YY")}</span>
                            {viewDetails.data.is_recruiting === 1 ?
                                <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                :
                                <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Recruiting stopped</span>
                            }
                        </div>
                    </>
                }
                onClick={handleClose}
                ModalData={
                    viewDetails !== undefined ?
                        <>
                            <div className='sponser-price-info'>
                                <div className='sponser-price-row'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='user' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>Sponsor</h4>
                                        <h2> {viewDetails.data.sponsor_user_info.sponsor_name} </h2>
                                    </div>
                                </div>
                                <div className='sponser-price-row'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>Trial Compensation</h4>
                                        <h2> ${viewDetails.data.compensation == null ? "0" : viewDetails.data.compensation} </h2>
                                    </div>
                                </div>
                            </div>
                            <div className='info-bx'>
                                <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
                            </div>

                            {viewDetails.data.clinic_trial_info.description !== null &&
                                <div className='clnicaltrial-description'>
                                    <h2>Description</h2>
                                    <p> {viewDetails.data.clinic_trial_info.description} </p>
                                </div>
                            }

                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green"
                                    BtnText={!viewDetails.data.alreadyApplied ? "Book Now" : "Already Booked"}
                                    onClick={() => handleShow2(viewDetails.data.id)}
                                    disabled={viewDetails.data.alreadyApplied == false ? viewDetails.data.is_recruiting === 1 ? false : true : viewDetails.data.alreadyApplied}
                                />
                                <a href="tel:+496170961709" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></a>

                                <button className="btn-action btn-primary" onClick={() => onClickChat(viewDetails.data)}>
                                    <box-icon name='message-rounded-dots' color="#ffffff"></box-icon>
                                </button>
                            </div>
                        </>
                        :
                        <LogoLoader />
                }
            />

            <CommonModal show={show2} onHide={handleClose2} keyboard={false} size="md"
                ModalTitle="Book your Appointment"
                onClick={handleClose2}
                ModalData={
                    bookingSlotData !== undefined ?
                        <form onSubmit={handleBookingAppointmentSubmit} autoComplete="off">
                            <div className='calender-outer'>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    minDate={moment().toDate()}
                                    inline
                                />
                            </div>
                            <div className='available-time'>
                                <h2>Available Time</h2>
                                <div className='time-row'>
                                    {bookingSlotData.map((value, index) => {
                                        return (
                                            <label key={index}>
                                                <input type="radio" name='appointment_date' onChange={(e) => setBookingSlots(e.target.value)} value={value.id} />
                                                <span>{value.booking_slot_info.from_time} - {value.booking_slot_info.to_time}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                            <InputText
                                type="text"
                                name="referal_cdoe"
                                placeholder="Referral code"
                                onChange={(e) => setReferralCode(e.target.value)}
                                labelText="Add referral code"
                            />
                            <div className='info-bx'>
                                <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
                            </div>
                            <div className='clnicaltrial-detail-ftr mt-0'>
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="primary w-100"
                                    BtnText="Confirm"
                                    // hasSpinner={bookingSubmit === true && bookingTrialSelector.loading}
                                    // disabled={bookingSubmit === true && bookingTrialSelector.loading}
                                />
                            </div>
                        </form>
                        :
                        <LogoLoader />
                }
            />

            <CommonModal show={ConfirmationModal} onHide={ConfirmationModalClose} keyboard={false} size="md"
                onClick={ConfirmationModalClose}
                ModalData={
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={ConfirmationModalClose}></button>
                        <div className='congrats-bx'>
                            <h2 className='mb-5'>Confirm Booking!</h2>
                            <p>This is to inform you that Clinical Trial will use this information.</p>
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnColor="green w-50"
                                BtnText="Disagree"
                                onClick={ConfirmationModalClose}
                            />
                            <Button
                                isButton="true"
                                BtnColor="primary w-50"
                                BtnText="Agree"
                                hasSpinner={bookingSubmit === true && bookingTrialSelector.loading}
                                disabled={bookingSubmit === true && bookingTrialSelector.loading}
                                onClick={ConfirmAppointmentSubmit}
                            />
                        </div>
                    </>
                }
            />

            <CommonModal show={show3} onHide={handleClose3} keyboard={false} size="md"
                onClick={handleClose3}
                ModalData={
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose3}></button>
                        <div className='congrats-bx'>
                            <h2>Congratulations!</h2>
                            <img src="/images/congrats.svg" alt="Congratulations" />
                            {thanksObj !== undefined && <p>You booked an appointment with <br /> <strong> {thanksObj.trial_name} </strong> on <br /> <strong> {thanksObj.appointment_date} ({thanksObj.time_slot})</strong></p>}
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isLink="true"
                                URL="/patient/my-appointments"
                                BtnColor="primary w-100"
                                BtnText="Go to My Appointments"
                            />
                        </div>
                    </>
                }
            />
        </>
    );
}

export default PatientBookingProcess;