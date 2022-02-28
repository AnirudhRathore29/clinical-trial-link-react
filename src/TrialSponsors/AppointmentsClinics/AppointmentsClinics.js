import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';
import "react-datepicker/dist/react-datepicker.css";

const SponsorsAppointmentsClinics = () => {
    /* popup show hide */
    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    /* popup show hide */

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Clinic List <span>Bipolar Depression Study with 6 Month Open Label Therapy</span></h1>
                    </div>

                    <table className='patient-list-table'>
                        <thead>
                            <tr>
                                <th align='center'>#</th>
                                <th>Clinic Name</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/clinic-img1.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
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
                                        <img src="/images/clinic-img2.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>University of California</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
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
                                        <img src="/images/clinic-img3.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Cambridge Biomedical</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
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
                                        <img src="/images/clinic-img2.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>University of California</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
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
                                        <img src="/images/clinic-img2.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
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
                                        <img src="/images/clinic-img1.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Cambridge Biomedical</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
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
                ModalTitle="Appointment Details"
                onClick={handleClose}
                ModalData={
                    <>
                        <div className='appointment-detail'>
                            <img src="/images/sponsors-img.jpg" alt="clinic-img" />
                            <div className=''>
                                <h2>Barnes Jewish Hospital</h2>
                                <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                <p className='mb-0'>Jan 25, 2022 (09:00 AM to 11:00 AM)</p>
                            </div>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Trial for </h2>
                            <p>Adolescents with ADHD and a Parent with Bipolar Disorder</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Address </h2>
                            <p>Atlanta, Georgia, United States</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Trial Compensation </h2>
                            <p>To be Decided by Company</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Principal Investigator</h2>
                            <p>Dr Aikenhead</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Document</h2>
                            <div className='row mt-3'>
                                <div className='col-lg-6'>
                                    <img src="/images/document-img.jpg" alt="document" />
                                </div>
                                <div className='col-lg-6'>
                                    <img src="/images/document-img.jpg" alt="document" />
                                </div>
                            </div>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Additional Information</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim, sit amet viverra lorem sagittis. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius. Ut vitae ex tincidunt urna sagittis ullamcorper ut congue elit. Etiam placerat turpis ligula, et lacinia nisl porttitor sed.</p>
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isLink="true"
                                URL="/trial-sponsors/patient-list"
                                BtnColor="primary"
                                BtnText="View All Patients List"
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default SponsorsAppointmentsClinics;