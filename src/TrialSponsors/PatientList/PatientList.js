import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import { InputText } from '../../views/Components/Common/Inputs/Inputs';
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';
import "react-datepicker/dist/react-datepicker.css";

const SponsorsPatientList = () => {
    /* popup show hide */
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const handleShow2 = () => {
        setShow(false)
        setShow2(true)
    }
    const handleClose2 = () => setShow2(false);
    /* popup show hide */
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
                                    <span className='badge badge-success d-inline-block mb-3'>Completed</span>
                                </td>
                                <td>
                                    <strong>25632156</strong>
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>

                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-sponsors/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-sponsors/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-sponsors/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-sponsors/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-sponsors/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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

                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                        <Link to="/trial-sponsors/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Patient Details"
                onClick={handleClose}
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
                            <h2>Trial Clinic</h2>
                            <p>Barnes Jewish Hospital</p>
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Pay"
                                onClick={handleShow2}
                            />
                        </div>
                    </>
                }
            />

            <CommonModal show={show2} onHide={handleClose2} keyboard={false}
                ModalTitle="Payment"
                onClick={handleClose2}
                size="md"
                ModalData={
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
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Paid"
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default SponsorsPatientList;
