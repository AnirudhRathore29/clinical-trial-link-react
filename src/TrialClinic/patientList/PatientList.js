import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../views/components/Common/Buttons/Buttons';
import CommonModal from '../../views/components/Common/Modal/Modal'
import RadioBtn from "../../views/components/Common/RadioBtn/RadioBtn";
import { InputText, SelectBox } from '../../views/components/Common/Inputs/Inputs';
import DatePicker from "react-datepicker";
import '../../patient/dashboard/Dashboard.css';
import '../trialRequests/TrialRequests.css';
import '../../patient/myAppointments/MyAppointments.css';
import "react-datepicker/dist/react-datepicker.css";

const ClinicPatientList = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [show2, setShow2] = useState(false);

    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);

    const [show3, setShow3] = useState(false);

    const handleShow3 = () => {
        setShow3(true);
        handleClose2();
    }
    const handleClose3 = () => setShow3(false);

    const [show4, setShow4] = useState(false);

    const handleShow4 = () => {
        setShow4(true);
        handleClose3();
    }
    const handleClose4 = () => setShow4(false);

    const [startDate, setStartDate] = useState(new Date());

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Patients List <span>Bipolar Depression Study with 6 Month Open Label Therapy</span></h1>
                        <Button
                            isButton="true"
                            BtnType="submit"
                            BtnColor="green btn-sm"
                            BtnText="Add Patient"
                            onClick={handleShow}
                        />
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

                                        <button className="btn-action btn-green" onClick={handleShow2}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/patient/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow2}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/patient/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow2}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/patient/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow2}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/patient/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow2}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/patient/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow2}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/patient/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <CommonModal show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Add Patient"
                onClick={handleClose}
                ModalData={
                    <>
                        <InputText
                            type="text"
                            placeholder="Enter Patient Name"
                            labelText="Patient Name"
                        />
                        <InputText
                            type="email"
                            placeholder="Enter Email"
                            labelText="Email"
                        />
                        <div className="form-group">
                            <label>Date</label>
                            <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <SelectBox
                            labelText="Available Time"
                            optionData=
                            {
                                <>
                                    <option value="">Select Available Time</option>
                                    <option value="">10:00AM - 8:00PM</option>
                                    <option value="">10:00AM - 8:00PM</option>
                                    <option value="">10:00AM - 8:00PM</option>
                                    <option value="">10:00AM - 8:00PM</option>
                                </>
                            }
                        />
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnColor="primary w-100"
                                BtnText="Add Patient"
                            />
                        </div>
                    </>
                }
            />

            <CommonModal className="custom-size-modal" show={show2} onHide={handleClose2} keyboard={false}
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
            />

            <CommonModal show={show3} onHide={handleClose3} keyboard={false}
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
            />

            <CommonModal show={show4} onHide={handleClose4} keyboard={false}
                ModalTitle="Appointment Status"
                onClick={handleClose4}
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
                                onClick={handleClose4}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default ClinicPatientList;