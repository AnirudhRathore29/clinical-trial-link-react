import { useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import { InputText, SelectBox } from '../../views/Components/Common/Inputs/Inputs';
import PatientListBx from '../../views/Components/PatientListBx/PatientListBx';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import '../../Patient/ClinicListing/ClinicListing.css';
import '../../Patient/MyAppointments/MyAppointments.css';

const SponsorsManageClinics = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Manage Clinics</h1>
                        <Button
                            isButton="true"
                            BtnColor="green btn-sm"
                            BtnText="Download"
                        />
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className="filter-sidebar">
                                <h2>Filter</h2>
                                <InputText
                                    type="text"
                                    labelText="Clinic Name"
                                    placeholder="Enter Clinic Name"
                                />
                                <SelectBox
                                    name="specialty"
                                    labelText="Specialty"
                                    optionData={
                                        <>
                                            <option>Select Specialty</option>
                                            <option>Specialty 1</option>
                                            <option>Specialty 2</option>
                                        </>
                                    }
                                />
                                <SelectBox
                                    name="condition"
                                    labelText="Condition"
                                    optionData={
                                        <>
                                            <option>Select Condition</option>
                                            <option>Condition 1</option>
                                            <option>Condition 2</option>
                                        </>
                                    }
                                />
                                <InputText type="search" labelText="Keywords" placeholder="Enter Keywords" />
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Apply"
                                />
                            </div>
                        </div>
                        <div className='col-lg-8'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img1.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="primary"
                                        status="Approved"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img2.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="success"
                                        status="Completed"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img3.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="danger"
                                        status="Cancelled"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img1.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="primary"
                                        status="Approved"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img2.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="success"
                                        status="Completed"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img3.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="danger"
                                        status="Cancelled"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img1.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="primary"
                                        status="Approved"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img2.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="success"
                                        status="Completed"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img3.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="danger"
                                        status="Cancelled"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img1.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="primary"
                                        status="Approved"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img2.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="success"
                                        status="Completed"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx
                                        imgUrl="clinic-img2.jpg"
                                        patientName="Barnes Jewish Hospital"
                                        statusClass="success"
                                        status="Completed"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                        onClick={handleShow}
                                    />
                                </div>
                            </div>

                            <div className='mt-5 text-center'>
                                <Button
                                    isButton="true"
                                    BtnColor="primary"
                                    BtnText="Load More"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Clinics Details"
                onClick={handleClose}
                ModalData={
                    <>
                        <PatientListBx
                            imgUrl="clinic-img1.jpg"
                            patientName="Barnes Jewish Hospital"
                            statusClass="primary"
                            status="Approved"
                            description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                        />
                        <div className='appointment-detail-col'>
                            <h2>Phone Number </h2>
                            <p>+01 987 654 3210</p>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Address </h2>
                            <p>Atlanta, Georgia, United States</p>
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
                    </>
                }
            />
        </>
    );
};

export default SponsorsManageClinics;
