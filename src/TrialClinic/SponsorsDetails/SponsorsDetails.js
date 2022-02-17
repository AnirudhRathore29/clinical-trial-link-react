import { useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import ClinicSponsorsBookingProcess from '../../views/Components/SponsorsBookingProcess/SponsorsBookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import Button from '../../views/Components/Common/Buttons/Buttons';
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../Patient/TrialClinicDetails/TrialClinicDetails.css'
import '../../Patient/MyFavorites/MyFavorites.css'

const ClinicSponsorsDetails = () => {

    const options2 = {
        items: 3,
        loop: true,
        nav: false,
        margin: 20,
        dots: true
    };

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    //
    const [show2, setShow2] = useState(false);

    const handleShow2 = () => {
        setShow2(true);
        handleClose();
    }
    const handleClose2 = () => setShow2(false);

    //
    const [show3, setShow3] = useState(false);

    const handleShow3 = () => {
        setShow3(true);
        handleClose2();
    }
    const handleClose3 = () => setShow3(false);

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="trialClinic-detail-bx">
                                <h1>ABF Pharmaceutical <button className="share-btn"><box-icon name='share-alt' type='solid' color="#356AA0"></box-icon></button></h1>
                                <div className="trialClinic-location">
                                    <span><box-icon name='map' color="#356AA0"></box-icon> Atlanta, Georgia, United States</span>
                                    <span><box-icon name='map-alt' color="#356AA0"></box-icon> 5000.52 Mi</span>
                                </div>
                                <div className='trialClinic-img'>
                                    <img src="/images/sponsors-img.jpg" alt="Barnes Jewish Hospital" />
                                </div>
                            </div>
                            <div className="trialClinic-info-bx mt-5">
                                <h2>Specialty</h2>
                                <p>Lorem ipsum dolor sit amet,</p>
                            </div>
                            <div className="trialClinic-info-bx mt-5">
                                <h2>Condition</h2>
                                <ul className='condition-ul'>
                                    <li>Opioid Use Disorder</li>
                                    <li>Hemorrhoids</li>
                                    <li>Dementia</li>
                                    <li>Bipolar Disorder</li>
                                    <li>Alzheimer’s Disease</li>
                                    <li>Depression</li>
                                </ul>
                            </div>
                            <div className="trialClinic-info-bx mt-5">
                                <h2>Description</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat vitae urna nec hendrerit. Vivamus eu aliquet metus, eget eleifend massa. Suspendisse potenti. Curabitur eu est in erat semper maximus a ut felis. Sed libero nunc, volutpat non imperdiet vel, pretium at erat. Sed cursus tincidunt ultricies. Aenean blandit posuere lorem ac hendrerit. Nam nisl lacus, posuere eget sollicitudin a, pharetra et sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus lacinia dictum ante, porttitor rhoncus augue vehicula non. Praesent pretium placerat turpis nec fringilla. Vestibulum hendrerit lorem et nulla malesuada, sed luctus ante varius. Duis quis dolor lacinia, aliquam nisi ut, vestibulum magna. Sed pellentesque ornare ex nec vestibulum. Donec facilisis quam sit amet bibendum volutpat. Maecenas turpis lectus, sodales eu ligula nec, aliquam viverra erat. Proin scelerisque nulla quis tortor fringilla tempor. Vestibulum accumsan pretium lobortis. Sed ac neque id risus cursus pretium. Aliquam in mollis sem. Proin congue ante non eros interdum ultricies. Pellentesque in lacinia sapien.</p>
                            </div>
                            <div className="trialClinic-info-bx mt-5">
                                <h2>Clinical Trials 
                                <Button
                                    isLink="true"
                                    URL="/trial-clinic/sponsors-trial-listing"
                                    BtnColor="green btn-sm"
                                    BtnText="View All"
                                />
                                </h2>
                                <OwlCarousel {...options2}>
                                    <ClinicTrial
                                        onClick={handleShow}
                                        title="Depression Associated with Bipolar Disorder"
                                        description="Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a..."
                                        status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                    />
                                    <ClinicTrial
                                        onClick={handleShow}
                                        title="Study Seeking Patients with Bipolar Depression"
                                        description="A Phase 3, Randomized, Double-Blind, Placebo Controlled, Parallel-Group, Multicenter, Foxed-Dose..."
                                        status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                    />
                                    <ClinicTrial
                                        onClick={handleShow}
                                        title="Bipolar Depression Study with 6 Month Open Label Therapy"
                                        description="If you or someone you know suffers from bipolar depression, you may be eligible to participate in a..."
                                        status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                    />
                                    <ClinicTrial
                                        onClick={handleShow}
                                        title="Depression Associated with Bipolar Disorder"
                                        description="Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a..."
                                        status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                    />
                                </OwlCarousel>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="trialClinic-side-bx Clinic-map-view">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.4412110851426!2d16.296517715649095!3d48.14029857922361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476da8613ddc04c5%3A0xaf19e87ed948c0f7!2sABF%20Pharmaceutical%20Services%20GmbH!5e0!3m2!1sen!2sin!4v1644922065756!5m2!1sen!2sin" title="myFrame" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ClinicSponsorsBookingProcess
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

export default ClinicSponsorsDetails;