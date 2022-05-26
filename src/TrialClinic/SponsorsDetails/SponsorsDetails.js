import { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import ClinicSponsorsBookingProcess from '../../views/Components/SponsorsBookingProcess/SponsorsBookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import Button from '../../views/Components/Common/Buttons/Buttons';
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../Patient/TrialClinicDetails/TrialClinicDetails.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import { SponsorDetailAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';

const ClinicSponsorsDetails = () => {
    const dispatch = useDispatch();
    const detailSelector = useSelector(state => state.trial_clinic.sponsore_detail.data);
    const { id } = useParams()

    useEffect(() => {
        dispatch(SponsorDetailAction(id))
    }, [dispatch])
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
                    {detailSelector !== undefined ?
                        <div className="row">
                            {console.log("detailSelector", detailSelector.data)}
                            <div className="col-lg-8">
                                <div className="trialClinic-detail-bx">
                                    <h1>{detailSelector.data.sponsor_name}<button className="share-btn"><box-icon name='share-alt' type='solid' color="#356AA0"></box-icon></button></h1>
                                    <div className="trialClinic-location">
                                        <span><box-icon name='map' color="#356AA0"></box-icon> {detailSelector.data.address}, {detailSelector.data.state_info.name}</span>
                                        <span><box-icon name='map-alt' color="#356AA0"></box-icon> 0 Mi</span>
                                    </div>
                                    <div className='trialClinic-img'>
                                        <img src="/images/sponsors-img.jpg" alt="Barnes Jewish Hospital" />
                                    </div>
                                </div>

                                {detailSelector.data.user_speciality.length !== 0 &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Specialty</h2>
                                        <ul className='condition-ul'>
                                            {detailSelector.data.user_speciality.map((value, index) => {
                                                return (
                                                    <li key={index}>{value.speciality_info.speciality_title}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                }


                                {detailSelector.data.user_condition.length !== 0 &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Condition</h2>
                                        <ul className='condition-ul'>
                                            {detailSelector.data.user_condition.map((value, index) => {
                                                return (
                                                    <li key={index}>{value.condition_info.condition_title}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                }

                                {detailSelector.data.user_meta_info.brief_intro !== null &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Description</h2>
                                        <p> {detailSelector.data.user_meta_info.brief_intro} </p>
                                    </div>
                                }

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
                        :
                        <LogoLoader />
                    }
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
