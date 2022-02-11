import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SelectBox, TextArea } from '../../views/components/Common/Inputs/Inputs';
import CommonModal from '../../views/components/Common/Modal/Modal'
import Button from '../../views/components/Common/Buttons/Buttons';
// import PendingAppointments from "../myAppointments/PendingAppointments"
import './MyAppointments.css';
import '../ClinicListing/ClinicListing.css'

const PatientMyAppointments = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [show2, setShow2] = useState(false);

    const handleShow2 = () => {
        setShow2(true);
        handleClose();
    }
    const handleClose2 = () => setShow2(false);

    const [show3, setShow3] = useState(false);

    const handleShow3 = () => {
        setShow3(true);
        handleClose2();
    }
    const handleClose3 = () => setShow3(false);

    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Appointments</h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="pending_appointment" className="pricing-tabs" id="plans-tabs">
                                <Tab eventKey="pending_appointment" title="Pending">
                                    <div className='row'>
                                        <div className='col-lg-6 mb-5'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-primary d-inline-block mb-3'>Pending</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-primary d-inline-block mb-3'>Pending</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mb-4'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-primary d-inline-block mb-3'>Pending</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mb-4'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-primary d-inline-block mb-3'>Pending</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="current_appointment" title="Current">
                                    <div className='row'>
                                        <div className='col-lg-6 mb-5'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-primary d-inline-block mb-3'>Eligible</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <div className='clinic-list-bx'>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info' onClick={handleShow}>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-primary d-inline-block mb-3'>Eligible</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mb-4'>
                                            <div className='clinic-list-bx'>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info' onClick={handleShow}>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-primary d-inline-block mb-3'>Eligible</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mb-4'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-primary d-inline-block mb-3'>Eligible</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="past_appointment" title="Past">
                                    <div className='row'>
                                        <div className='col-lg-6 mb-5'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-success d-inline-block mb-3'>Completed</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-danger d-inline-block mb-3'>Cancelled</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mb-4'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-danger d-inline-block mb-3'>Cancelled</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 mb-4'>
                                            <div className='clinic-list-bx' onClick={handleShow}>
                                                <div className='clinic-img'>
                                                    <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                                </div>
                                                <div className='clinic-info'>
                                                    <h2>Barnes Jewish Hospital</h2>
                                                    <span className='badge badge-danger d-inline-block mb-3'>Cancelled</span>
                                                    <p className='location'><strong>Visit Number :</strong> 25632156</p>
                                                    <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                                    <p className='location'><box-icon name='calendar' size="18px" color='#356AA0'></box-icon> Jan 20, 2022 (09:00 AM to 11:00 AM)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Appointment Details"
                onClick={handleClose}
                ModalData={
                    <>
                        <div className='appointment-detail'>
                            <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                            <div className=''>
                                <h2>Barnes Jewish Hospital</h2>
                                <span className='badge badge-primary d-inline-block mb-3'>Eligible</span>
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
                                BtnText="Cancel Appointment"
                                onClick={handleShow2}
                            />
                        </div>
                    </>
                }
            />

            <CommonModal show={show2} onHide={handleClose2} keyboard={false}
                ModalTitle="Cancel Appointment"
                onClick={handleClose2}
                ModalData={
                    <>
                        <SelectBox
                            labelText="Reason for Cancellation"
                            optionData=
                            {
                                <>
                                    <option value="">Select Cancellation Reason</option>
                                    <option value="">Cancellation Reason 1</option>
                                    <option value="">Cancellation Reason 2</option>
                                    <option value="">Cancellation Reason 3</option>
                                    <option value="">Cancellation Reason 4</option>
                                </>
                            }
                        />

                        <TextArea
                            placeholder="Enter Cancellation Details"
                            labelText="Cancellation Details"
                        />
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
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
                            <h2 className='mb-5'>Confirm Cancellation!</h2>
                            <p>Are you sure you want to cancel your Appointment <br /> <strong>with Centers for Disease Control and Prevention</strong> <br /> <strong>on Jan 20, 2022 (09:00 AM to 11:00 AM)</strong></p>
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnColor="green w-50"
                                BtnText="No"
                                onClick={handleClose3}
                            />
                            <Button
                                isButton="true"
                                BtnColor="primary w-50"
                                BtnText="Yes"
                                onClick={handleClose3}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default PatientMyAppointments;
