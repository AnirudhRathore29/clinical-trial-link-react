import { useState } from 'react';
import CommonModal from '../Common/Modal/Modal'
import DatePicker from "react-datepicker";
import Button from '../Common/Buttons/Buttons';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

const PatientBookingProcess = ({show, handleClose, show2, handleClose2, handleShow2, show3, handleClose3, handleShow3}) => {
    const [startDate, setStartDate] = useState(new Date());

    return(
        <>
            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle={
                    <>
                        <h2>Depression Associated with Bipolar Disorder</h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on November 23, 2020</span>
                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                        </div>
                    </>
                }
                onClick={handleClose}
                ModalData={
                    <>
                        <div className='sponser-price-info'>
                            <div className='sponser-price-row'>
                                <div className='sponser-price-icon'>
                                    <box-icon name='user' size="30px" color="#356AA0"></box-icon>
                                </div>
                                <div>
                                    <h4>Sponsor</h4>
                                    <h2>CNS Medical Director</h2>
                                </div>
                            </div>
                            <div className='sponser-price-row'>
                                <div className='sponser-price-icon'>
                                    <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                </div>
                                <div>
                                    <h4>Trial Compensation</h4>
                                    <h2>$50.00</h2>
                                </div>
                            </div>
                        </div>
                        <div className='info-bx'>
                            <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
                        </div>
                        <div className='clnicaltrial-description'>
                            <h2>Description</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim, sit amet viverra lorem sagittis. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius. Ut vitae ex tincidunt urna sagittis ullamcorper ut congue elit. Etiam placerat turpis ligula, et lacinia nisl porttitor sed. nunc eu nibh dignissim, sit amet viverra lorem sagittis. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius. Ut vitae exasd</p>
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="green"
                                BtnText="Book Now"
                                onClick={handleShow2}
                            />
                            <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                            <Link to="/patient/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                        </div>
                    </>
                }
            />

            <CommonModal show={show2} onHide={handleClose2} keyboard={false} size="md"
                ModalTitle="Book your Appointment"
                onClick={handleClose2}
                ModalData={
                    <>
                        <div className='calender-outer'>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                inline
                            />
                        </div>
                        <div className='available-time'>
                            <h2>Available Time</h2>
                            <div className='time-row'>
                                <label>
                                    <input type="radio" name='available_time' defaultChecked="true" />
                                    <span>09:00 AM - 11:00 AM</span>
                                </label>
                                <label>
                                    <input type="radio" name='available_time' />
                                    <span>11:00 AM - 01:00 PM</span>
                                </label>
                                <label>
                                    <input type="radio" name='available_time' />
                                    <span>01:00 PM - 03:00 PM</span>
                                </label>
                                <label>
                                    <input type="radio" name='available_time' />
                                    <span>03:00 PM - 05:00 PM</span>
                                </label>
                                <label>
                                    <input type="radio" name='available_time' />
                                    <span>05:00 PM - 07:00 PM</span>
                                </label>
                            </div>
                        </div>
                        <div className='info-bx'>
                            <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Confirm"
                                onClick={handleShow3}
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
                            <p>You booked an appointment with <br /> <strong>Barnes Jewish Hospital</strong> on <br /> <strong>Jan 20, 2022 (09:00 AM to 11:00 AM)</strong></p>
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