import { useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import '../../Patient/MyAppointments/MyAppointments.css';
import './TrialRequests.css'

const SponsorTrialRequests = () => {
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
                                <th>Clinic Details</th>
                                <th>Trial for</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/sponsors-img.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td> Adolescents with ADHD and a Parent with Bipolar Disorder </td>
                                <td>Atlanta, Georgia, United States</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
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
                                        <img src="/images/clinic-img3.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td> Adolescents with ADHD and a Parent with Bipolar Disorder </td>
                                <td>Atlanta, Georgia, United States</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
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
                                        <img src="/images/clinic-img2.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td> Adolescents with ADHD and a Parent with Bipolar Disorder </td>
                                <td>Atlanta, Georgia, United States</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
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
                                        <img src="/images/sponsors-img.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td> Adolescents with ADHD and a Parent with Bipolar Disorder </td>
                                <td>Atlanta, Georgia, United States</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
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
                                        <img src="/images/clinic-img3.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td> Adolescents with ADHD and a Parent with Bipolar Disorder </td>
                                <td>Atlanta, Georgia, United States</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
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
                                        <img src="/images/clinic-img2.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td> Adolescents with ADHD and a Parent with Bipolar Disorder </td>
                                <td>Atlanta, Georgia, United States</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
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
                                        <img src="/images/clinic-img3.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td> Adolescents with ADHD and a Parent with Bipolar Disorder </td>
                                <td>Atlanta, Georgia, United States</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
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
                                        <img src="/images/sponsors-img.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Barnes Jewish Hospital</h2>
                                    <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                </td>
                                <td> Adolescents with ADHD and a Parent with Bipolar Disorder </td>
                                <td>Atlanta, Georgia, United States</td>
                                <td>
                                    <div className='btn-group-custom'>
                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                        <Button
                                            isButton="true"
                                            BtnColor="green btn-sm"
                                            BtnText="Reject"
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

            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Request Details"
                onClick={handleClose}
                ModalData={
                    <>
                        <div className='appointment-detail'>
                            <img src="/images/sponsors-img.jpg" alt="clinic-img" />
                            <div className=''>
                                <h2>Barnes Jewish Hospital</h2>
                                <p className='mb-0'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                <p className='mb-0'><strong>Address :</strong> Atlanta, Georgia, United States</p>
                            </div>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Trial for </h2>
                            <p>Adolescents with ADHD and a Parent with Bipolar Disorder</p>
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
                                isButton="true"
                                BtnType="submit"
                                BtnColor="green"
                                BtnText="Reject"
                                onClick={handleClose}
                            />
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary"
                                BtnText="Approve"
                                onClick={handleClose}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default SponsorTrialRequests;
