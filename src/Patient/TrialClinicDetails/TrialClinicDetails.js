import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import PatientBookingProcess from '../../views/Components/BookingProcess/BookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import SponsorsBx from '../../views/Components/SponsorsBx/SponsorsBx';
import Button from '../../views/Components/Common/Buttons/Buttons';
import 'owl.carousel/dist/assets/owl.carousel.css';
import './TrialClinicDetails.css'
import '../MyFavorites/MyFavorites.css'
import { PatientClinicDetailsAction, PatientViewTrialsAction } from '../../redux/actions/PatientAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { getImageUrl } from '../../redux/constants';

const TrialClinicDetails = () => {
    const dispatch = useDispatch();
    const viewTrialDetailSelector = useSelector(state => state.patient.view_trial.data);
    const trialClinicDetailSelector = useSelector(state => state.patient.clinic_details.data);
    const { id } = useParams()

    const [patientClinicDetails, setPatientClinicDetails] = useState();
    const [viewTrialDetails, setViewTrialDetails] = useState(undefined);

    useEffect(() => {
        setPatientClinicDetails(trialClinicDetailSelector)
    }, [trialClinicDetailSelector]);

    useEffect(() => {
        setViewTrialDetails(viewTrialDetailSelector)
        return () => { setViewTrialDetails(undefined) }
    }, [viewTrialDetailSelector]);

    useEffect(() => {
        dispatch(PatientClinicDetailsAction(id))
        return () => { dispatch(PatientClinicDetailsAction()) }
    }, [dispatch, id])

    const options2 = {
        items: 3,
        loop: false,
        nav: false,
        margin: 20,
        dots: true
    };

    const [show, setShow] = useState(false);

    const handleClinicTrialModalOpen = (id) => {
        dispatch(PatientViewTrialsAction(id))
        setShow(true)
    };

    const handleClose = () => {
        setShow(false)
        setViewTrialDetails(undefined)
    };

    //
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
                    {patientClinicDetails !== undefined ?
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="trialClinic-detail-bx">
                                    <h1> {patientClinicDetails.data.clinic_name} <button className="share-btn"><box-icon name='share-alt' type='solid' color="#356AA0"></box-icon></button></h1>
                                    <div className="trialClinic-location">
                                        <span><box-icon name='map' color="#356AA0"></box-icon>  {patientClinicDetails.data.address}, {patientClinicDetails.data.state_info.name} </span>
                                        <span><box-icon name='map-alt' color="#356AA0"></box-icon> 0.00 Mi</span>
                                    </div>

                                    {patientClinicDetails.data.listing_image !== null &&
                                        <div className='trialClinic-img'>
                                            <img src={getImageUrl() + patientClinicDetails.data.listing_image} alt={patientClinicDetails.data.clinic_name} />
                                        </div>
                                    }
                                </div>

                                {patientClinicDetails.data.user_speciality.length !== 0 &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Specialty</h2>
                                        <ul className='condition-ul'>
                                            {patientClinicDetails.data.user_speciality.map((value, index) => {
                                                return (
                                                    <li key={index}>{value.speciality_info.speciality_title}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                }

                                {patientClinicDetails.data.user_condition.length !== 0 &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Condition</h2>
                                        <ul className='condition-ul'>
                                            {patientClinicDetails.data.user_condition.map((value, index) => {
                                                return (
                                                    <li key={index}>{value.condition_info.condition_title}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                }

                                {patientClinicDetails.data.user_meta_info.brief_intro !== null &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Description</h2>
                                        <p> {patientClinicDetails.data.user_meta_info.brief_intro} </p>
                                    </div>
                                }

                                {patientClinicDetails.data.sponsors.length > 0 &&
                                    <SponsorsBx data={patientClinicDetails.data.sponsors} />
                                }

                                {patientClinicDetails.data.clinic_trials !== null &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Clinical Trials
                                            <Button
                                                isLink="true"
                                                URL={"/patient/trial-listing/" + patientClinicDetails.data.id}
                                                BtnColor="green btn-sm"
                                                BtnText="View All"
                                            />
                                        </h2>
                                        <OwlCarousel {...options2}>
                                            {patientClinicDetails.data.clinic_trials.map((value, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <ClinicTrial
                                                            onClick={() => handleClinicTrialModalOpen(value.id)}
                                                            title={value.clinic_trial_info.trial_name}
                                                            description={value.clinic_trial_info.description}
                                                            status={
                                                                value.is_recruiting === 1 ?
                                                                    <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting </span>
                                                                    :
                                                                    <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close </span>
                                                            }
                                                        />
                                                    </React.Fragment>
                                                )
                                            })}
                                        </OwlCarousel>
                                    </div>
                                }
                            </div>

                            <div className="col-lg-4">
                                <div className="trialClinic-side-bx Clinic-map-view">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199449.42991383024!2d-90.561729281034!3d38.63974312559989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8cb73a8250543%3A0xa331c23a38649978!2sBarnes%20Jewish%20Hospital!5e0!3m2!1sen!2sin!4v1644306553902!5m2!1sen!2sin" title="myFrame" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                                </div>
                            </div>

                        </div>
                        :
                        <LogoLoader />
                    }
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

                viewDetails={viewTrialDetails}
                bookingSlotData={viewTrialDetailSelector?.data?.appointment_slots}
                bookingId={viewTrialDetailSelector?.data?.id}
            />
        </>
    );
};

export default TrialClinicDetails;
