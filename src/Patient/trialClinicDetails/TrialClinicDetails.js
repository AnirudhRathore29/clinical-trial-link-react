import { useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import CommonModal from '../../views/components/Common/Modal/Modal'
import DatePicker from "react-datepicker";
import Button from '../../views/components/Common/Buttons/Buttons';
import { Link } from 'react-router-dom'
import 'owl.carousel/dist/assets/owl.carousel.css';
import "react-datepicker/dist/react-datepicker.css";
import './TrialClinicDetails.css'

const TrialClinicDetails = () => {
    const options = {
        items: 5,
        loop: true,
        nav: false,
        margin: 20,
        autoWidth: true,
        dots: false
    };

    const options2 = {
        items: 3,
        loop: true,
        nav: false,
        margin: 20,
        dots: true
    };
    const [startDate, setStartDate] = useState(new Date());

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
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="CommanWhiteBx trialClinic-detail-bx">
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
                                <ul>
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
                            <div className="trialClinic-info-bx SponsorsBx mt-5">
                                <h2>Sponsors</h2>
                                <OwlCarousel {...options}>
                                    <div className='item'>
                                        <img src="/images/sponser-img1.jpg" alt="Sponsors" />
                                    </div>
                                    <div className='item'>
                                        <img src="/images/sponser-img2.jpg" alt="Sponsors" />
                                    </div>
                                    <div className='item'>
                                        <img src="/images/sponser-img3.jpg" alt="Sponsors" />
                                    </div>
                                </OwlCarousel>
                            </div>
                            <div className="trialClinic-info-bx mt-5">
                                <h2>Clinical Trials</h2>
                                <OwlCarousel {...options2}>
                                    <div className='item clinicalTrial-bx' onClick={handleShow}>
                                        <h2>Depression Associated with Bipolar Disorder</h2>
                                        <p>Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a...</p>
                                        <div className='clinicalTrial-bx-ftr'>
                                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                            <div>
                                                <button className='icon-btn'><box-icon name='heart' color="#ffffff"></box-icon></button>
                                                <button className='icon-btn'><box-icon name='share-alt' color="#ffffff"></box-icon></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item clinicalTrial-bx' onClick={handleShow}>
                                        <h2>Study Seeking Patients with Bipolar Depression</h2>
                                        <p>A Phase 3, Randomized, Double-Blind, Placebo Controlled, Parallel-Group, Multicenter, Foxed-Dose...</p>
                                        <div className='clinicalTrial-bx-ftr'>
                                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                            <div>
                                                <button className='icon-btn'><box-icon name='heart' color="#ffffff"></box-icon></button>
                                                <button className='icon-btn'><box-icon name='share-alt' color="#ffffff"></box-icon></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item clinicalTrial-bx' onClick={handleShow}>
                                        <h2>Bipolar Depression Study with 6 Month Open Label Therapy</h2>
                                        <p>If you or someone you know suffers from bipolar depression, you may be eligible to participate in a...</p>
                                        <div className='clinicalTrial-bx-ftr'>
                                            <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                            <div>
                                                <button className='icon-btn'><box-icon name='heart' color="#ffffff"></box-icon></button>
                                                <button className='icon-btn'><box-icon name='share-alt' color="#ffffff"></box-icon></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item clinicalTrial-bx' onClick={handleShow}>
                                        <h2>Depression Associated with Bipolar Disorder</h2>
                                        <p>Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a...</p>
                                        <div className='clinicalTrial-bx-ftr'>
                                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                            <div>
                                                <button className='icon-btn'><box-icon name='heart' color="#ffffff"></box-icon></button>
                                                <button className='icon-btn'><box-icon name='heart' color="#ffffff"></box-icon></button>
                                            </div>
                                        </div>
                                    </div>
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


            <CommonModal show={show} onHide={handleClose} keyboard={false} size="md"
                ModalTitle={
                    <>
                        <h2>Depression Associated with Bipolar Disorder</h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on November 23, 2020</span>
                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                        </div>
                    </>
                }
                onClick={handleClose}
                ModalData={
                    <>
                        <div className='sponser-price-info'>
                            <div className='sponser-price-row'>
                                <div className='sponser-price-icon'>
                                    <box-icon name='user' size="30px" color="#356AA0"></box-icon>
                                </div>
                                <div>
                                    <h4>Sponsor</h4>
                                    <h2>CNS Medical Director</h2>
                                </div>
                            </div>
                            <div className='sponser-price-row'>
                                <div className='sponser-price-icon'>
                                    <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                </div>
                                <div>
                                    <h4>Trial Compensation</h4>
                                    <h2>$50.00</h2>
                                </div>
                            </div>
                        </div>
                        <div className='info-bx'>
                            <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
                        </div>
                        <div className='clnicaltrial-description'>
                            <h2>Description</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim, sit amet viverra lorem sagittis. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius. Ut vitae ex tincidunt urna sagittis ullamcorper ut congue elit. Etiam placerat turpis ligula, et lacinia nisl porttitor sed. nunc eu nibh dignissim, sit amet viverra lorem sagittis. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius. Ut vitae exasd</p>
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="green"
                                BtnText="Book Now"
                                onClick={handleShow2}
                            />
                            <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                            <Link to="" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                        </div>
                    </>
                }
            />

            <CommonModal show={show2} onHide={handleClose2} keyboard={false} size="md"
                ModalTitle="Book your Appointment"
                onClick={handleClose2}
                ModalData={
                    <>
                        <div className='calender-outer'>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                inline
                            />
                        </div>
                        <div className='available-time'>
                            <h2>Available Time</h2>
                            <div className='time-row'>
                                <label>
                                    <input type="radio" name='available_time' defaultChecked="true" />
                                    <span>09:00 AM - 11:00 AM</span>
                                </label>
                                <label>
                                    <input type="radio" name='available_time' />
                                    <span>11:00 AM - 01:00 PM</span>
                                </label>
                                <label>
                                    <input type="radio" name='available_time' />
                                    <span>01:00 PM - 03:00 PM</span>
                                </label>
                                <label>
                                    <input type="radio" name='available_time' />
                                    <span>03:00 PM - 05:00 PM</span>
                                </label>
                                <label>
                                    <input type="radio" name='available_time' />
                                    <span>05:00 PM - 07:00 PM</span>
                                </label>
                            </div>
                        </div>
                        <div className='info-bx'>
                            <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="submit"
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
                        <button type="button" className="btn-close" ariaLabel="Close" onClick={handleClose3}></button>
                        <div className='congrats-bx'>
                            <h2>Congratulations!</h2>
                            <img src="/images/congrats.svg" alt="Congratulations" />
                            <p>You booked an appointment with <br /> <strong>Barnes Jewish Hospital</strong> on <br /> <strong>Jan 20, 2022 (09:00 AM to 11:00 AM)</strong></p>
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Go to My Appointments"
                                onClick={handleShow3}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default TrialClinicDetails;
