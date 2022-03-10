import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../views/Components/Common/Buttons/Buttons';
import { SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import './TrialRequests.css'

const ClinicTrialRequests = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>New Trial Request</h1>
                    </div>

                    <table className='patient-list-table'>
                        <thead>
                            <tr>
                                <th align='center'>#</th>
                                <th>Patient Details</th>
                                <th>Trial for</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/profile-img1.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                    <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td>
                                    Adolescents with ADHD and a Parent with
                                    Bipolar Disorder
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
                                            onClick={handleShow}
                                        />
                                        <Button
                                            isButton="true"
                                            BtnColor="primary btn-sm"
                                            BtnText="Approve"
                                        />
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
                                    <h2>Olivia Doe</h2>
                                    <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td>
                                    Adolescents with ADHD and a Parent with
                                    Bipolar Disorder
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
                                            onClick={handleShow}
                                        />
                                        <Button
                                            isButton="true"
                                            BtnColor="primary btn-sm"
                                            BtnText="Approve"
                                        />
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
                                    <h2>Mike Hoover</h2>
                                    <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td>
                                    Adolescents with ADHD and a Parent with
                                    Bipolar Disorder
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
                                            onClick={handleShow}
                                        />
                                        <Button
                                            isButton="true"
                                            BtnColor="primary btn-sm"
                                            BtnText="Approve"
                                        />
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
                                    <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td>
                                    Adolescents with ADHD and a Parent with
                                    Bipolar Disorder
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
                                            onClick={handleShow}
                                        />
                                        <Button
                                            isButton="true"
                                            BtnColor="primary btn-sm"
                                            BtnText="Approve"
                                        />
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
                                    <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td>
                                    Adolescents with ADHD and a Parent with
                                    Bipolar Disorder
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
                                            onClick={handleShow}
                                        />
                                        <Button
                                            isButton="true"
                                            BtnColor="primary btn-sm"
                                            BtnText="Approve"
                                        />
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
                                    <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td>
                                    Adolescents with ADHD and a Parent with
                                    Bipolar Disorder
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
                                            onClick={handleShow}
                                        />
                                        <Button
                                            isButton="true"
                                            BtnColor="primary btn-sm"
                                            BtnText="Approve"
                                        />
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
                                    <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td>
                                    Adolescents with ADHD and a Parent with
                                    Bipolar Disorder
                                </td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
                                            onClick={handleShow}
                                        />
                                        <Button
                                            isButton="true"
                                            BtnColor="primary btn-sm"
                                            BtnText="Approve"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <CommonModal show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Reject Request"
                onClick={handleClose}
                ModalData={
                    <>
                        <SelectBox
                            labelText="Reason for Rejection"
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
                            placeholder="Enter Rejection Details"
                            labelText="Rejection Details"
                        />
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnColor="primary w-100"
                                BtnText="Confirm"
                                onClick={handleClose}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default ClinicTrialRequests;
