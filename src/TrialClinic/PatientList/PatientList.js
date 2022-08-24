import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../views/Components/Common/Buttons/Buttons.css'
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';
import "react-datepicker/dist/react-datepicker.css";

const ClinicPatientList = () => {
    /* datetime */
    const [startDate, setStartDate] = useState(new Date());
    /* datetime */
    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Patient List <span>Bipolar Depression Study with 6 Month Open Label Therapy</span></h1>
                    </div>

                    <table className='patient-list-table'>
                        <thead>
                            <tr>
                                <th align='center'>#</th>
                                <th>Patient Name</th>
                                <th>Status</th>
                                <th>Visit Number</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/profile-img3.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                </td>
                                <td>
                                    <strong>25632156</strong>
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>

                                        <Link to="/trial-clinic/appointments/25" className="btn-action btn-green"><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></Link>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/profile-img1.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                </td>
                                <td>
                                    <strong>25632156</strong>
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>

                                        <Link to="/trial-clinic/appointments/25" className="btn-action btn-green"><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></Link>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/profile-img2.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                </td>
                                <td>
                                    <strong>25632156</strong>
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>

                                        <Link to="/trial-clinic/appointments/25" className="btn-action btn-green"><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></Link>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/profile-img3.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                </td>
                                <td>
                                    <strong>25632156</strong>
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>

                                        <Link to="/trial-clinic/appointments/25" className="btn-action btn-green"><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></Link>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/profile-img4.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                </td>
                                <td>
                                    <strong>25632156</strong>
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>

                                        <Link to="/trial-clinic/appointments/25" className="btn-action btn-green"><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></Link>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/avatar2.svg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                </td>
                                <td>
                                    <strong>25632156</strong>
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>

                                        <Link to="/trial-clinic/appointments/25" className="btn-action btn-green"><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></Link>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <CommonModal className="custom-size-modal" show={show2} onHide={handleClose2} keyboard={false}
                ModalTitle="Appointment Details"
                onClick={handleClose2}
                ModalData={
                    <>
                        <div className='appointment-detail patient-appointment-details'>
                            <img src="/images/avatar-img3.jpg" alt="clinic-img" />
                            <div className=''>
                                <h2>Barnes Jewish Hospital</h2>
                                <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
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
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Update Status"
                                onClick={handleShow3}
                            />
                        </div>
                    </>
                }
            /> */}

            {/* <CommonModal show={show3} onHide={handleClose3} keyboard={false}
                ModalTitle="Appointment Status"
                onClick={handleClose3}
                size="md"
                ModalData={
                    <>
                        <div className='update-status'>
                            <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Approved" defaultChecked="true" />
                            <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Not Attended" />
                            <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Not Eligible" />
                            <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Appointment Completed" />
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Update Status"
                                onClick={handleShow4}
                            />
                        </div>
                    </>
                }
            /> */}

            {/* <CommonModal show={show4} onHide={handleClose4} keyboard={false}
                ModalTitle="Choose Payment Option"
                onClick={handleClose4}
                size="md"
                ModalData={
                    <>
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
                                    </>
                                    :
                                    null
                            }
                            <InputText
                                type="text"
                                name="amount"
                                placeholder="Enter Amount"
                                labelText="Amount ($)"
                            />
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Paid"
                                onClick={handleClose4}
                            />
                        </div>
                    </>
                }
            /> */}
        </>
    );
};

export default ClinicPatientList;
