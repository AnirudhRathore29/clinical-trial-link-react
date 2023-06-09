import { useState } from 'react';
import RadioBtn from '../../Components/Common/RadioBtn/RadioBtn';
import Button from '../../Components/Common/Buttons/Buttons';
import PatientBookingProcess from '../../Components/BookingProcess/BookingProcess';
import ClinicTrial from '../../Components/ClinicTrial/ClinicTrial'
import InnerBanner from "../../Components/Common/InnerBanner/InnerBanner";
import '../../../Patient/MyFavorites/MyFavorites.css';
import '../../../Patient/TrialListing/TrialListing.css';
import 'boxicons';

const TrialListing = () => {
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
            <InnerBanner
                pageTitle="Clinical Trials"
                subTitle={<>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem <br /> Sed porttitor lectus nibh  sapien massa</>}
            />
            <div className="repeat-section main-trial-listing before-login-listing">
                <div className="container">
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className="filter-sidebar">
                                <h2>Filter by Condition</h2>
                                <div className="form-group">
                                    <RadioBtn className="checkbox-btn" type="checkbox" name="All" labelText="All" />
                                </div>
                                <div className="form-group">
                                    <RadioBtn className="checkbox-btn" type="checkbox" name="Opioid Use Disorder" labelText="Opioid Use Disorder" />
                                </div>
                                <div className="form-group">
                                    <RadioBtn className="checkbox-btn" type="checkbox" name="Hemorrhoids" labelText="Hemorrhoids" />
                                </div>
                                <div className="form-group">
                                    <RadioBtn className="checkbox-btn" type="checkbox" name="Dementia" labelText="Dementia" />
                                </div>
                                <div className="form-group">
                                    <RadioBtn className="checkbox-btn" type="checkbox" name="Bipolar Disorder" labelText="Bipolar Disorder" />
                                </div>
                                <div className="form-group">
                                    <RadioBtn className="checkbox-btn" type="checkbox" name="Alzheimer’s Disease" labelText="Alzheimer’s Disease" />
                                </div>
                                <div className="form-group">
                                    <RadioBtn className="checkbox-btn" type="checkbox" name="Depression" labelText="Depression" />
                                </div>
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Apply"
                                />
                            </div>
                        </div>
                        <div className='col-lg-8'>
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow}
                                title="Depression Associated with Bipolar Disorder"
                                description="Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a..."
                                status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                iconColor="#356AA0"
                            />
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow}
                                title="Study Seeking Patients with Bipolar Depression"
                                description="A Phase 3, Randomized, Double-Blind, Placebo Controlled, Parallel-Group, Multicenter, Foxed-Dose..."
                                status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                iconColor="#356AA0"
                            />
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow}
                                title="Bipolar Depression Study with 6 Month Open Label Therapy"
                                description="If you or someone you know suffers from bipolar depression, you may be eligible to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                            />
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow}
                                title="Depression Associated with Bipolar Disorder"
                                description="Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                            />
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow}
                                title="Study Seeking Patients with Bipolar Depression"
                                description="A Phase 3, Randomized, Double-Blind, Placebo Controlled, Parallel-Group, Multicenter, Foxed-Dose..."
                                status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                iconColor="#356AA0"
                            />
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow}
                                title="Bipolar Depression Study with 6 Month Open Label Therapy"
                                description="If you or someone you know suffers from bipolar depression, you may be eligible to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                            />
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow}
                                title="Depression Associated with Bipolar Disorder"
                                description="Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                            />
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow}
                                title="Bipolar Depression Study with 6 Month Open Label Therapy"
                                description="If you or someone you know suffers from bipolar depression, you may be eligible to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                            />

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

            <PatientBookingProcess
                show={show}
                handleClose={handleClose}

                show2={show2}
                handleClose2={handleClose2}
                handleShow2={handleShow2}

                show3={show3}
                handleClose3={handleClose3}
                handleShow3={handleShow3}
            />
        </>
    );
};

export default TrialListing;
