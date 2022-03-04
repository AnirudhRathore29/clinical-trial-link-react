import { useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import PatientBookingProcess from '../../Components/BookingProcess/BookingProcess';
import ClinicTrial from '../../Components/ClinicTrial/ClinicTrial'
import SponsorsBx from '../../Components/SponsorsBx/SponsorsBx';
import Button from '../../Components/Common/Buttons/Buttons';
import InnerBanner from "../../Components/Common/InnerBanner/InnerBanner";
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../../Patient/TrialClinicDetails/TrialClinicDetails.css'
import '../../../Patient/MyFavorites/MyFavorites.css'
import 'boxicons';

const ClinicDetails = () => {

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
            <InnerBanner
                pageTitle="Barnes Jewish Hospital"
                subTitle={<>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem <br /> Sed porttitor lectus nibh  sapien massa</>}
            />
            <div className="repeat-section before-login-listing">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="trialClinic-detail-bx">
                                <h1>Barnes Jewish Hospital <button className="share-btn"><box-icon name='share-alt' type='solid' color="#356AA0"></box-icon></button></h1>
                                <div className="trialClinic-location">
                                    <span><box-icon name='map' color="#356AA0"></box-icon> Atlanta, Georgia, United States</span>
                                    <span><box-icon name='map-alt' color="#356AA0"></box-icon> 5000.52 Mi</span>
                                </div>
                                <div className='trialClinic-img'>
                                    <img src="/images/trial-clinic-img.jpg" alt="Barnes Jewish Hospital" />
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
                            <SponsorsBx />
                            <div className="trialClinic-info-bx mt-5">
                                <h2>Clinical Trials 
                                <Button
                                    isLink="true"
                                    URL="/trial-listing"
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
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199449.42991383024!2d-90.561729281034!3d38.63974312559989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8cb73a8250543%3A0xa331c23a38649978!2sBarnes%20Jewish%20Hospital!5e0!3m2!1sen!2sin!4v1644306553902!5m2!1sen!2sin" title="myFrame" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
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

export default ClinicDetails;
