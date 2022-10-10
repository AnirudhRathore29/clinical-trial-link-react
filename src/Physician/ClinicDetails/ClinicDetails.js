import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import PatientBookingProcess from '../../views/Components/BookingProcess/BookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import SponsorsBx from '../../views/Components/SponsorsBx/SponsorsBx';
import Button from '../../views/Components/Common/Buttons/Buttons';
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../Patient/TrialClinicDetails/TrialClinicDetails.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import MapIframe from '../../views/Components/MapIframe/MapIframe';
import { PhysicianClinicDetailsAction, PhysicianViewTrialsAction } from '../../redux/actions/PhysicianAction';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import moment from 'moment';

const TrialClinicDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const viewTrialDetailSelector = useSelector(state => state.patient.view_trial.data);
    const trialClinicDetailSelector = useSelector(state => state.patient.clinic_details.data);
    const favTrialSelector = useSelector(state => state.patient.patient_my_fav_trials.data);
    const { id } = useParams()

    const [patientClinicDetails, setPatientClinicDetails] = useState();
    const [viewTrialDetails, setViewTrialDetails] = useState(undefined);
    const [TrialDetailModalState, setTrialDetailModalState] = useState(false);

    console.log("favTrialSelector", favTrialSelector);
    console.log("trialClinicDetailSelector", trialClinicDetailSelector);
    console.log("patientClinicDetails", patientClinicDetails);
    console.log("viewTrialDetails", viewTrialDetails);

    useEffect(() => {
        setPatientClinicDetails(trialClinicDetailSelector)
    }, [trialClinicDetailSelector]);

    useEffect(() => {
        setViewTrialDetails(viewTrialDetailSelector)
        return () => { setViewTrialDetails(undefined) }
    }, [viewTrialDetailSelector]);

    useEffect(() => {
        dispatch(PhysicianClinicDetailsAction(id))
        return () => { dispatch(PhysicianClinicDetailsAction()) }
    }, [dispatch, id])

    const options2 = {
        items: 3,
        loop: false,
        nav: false,
        margin: 20,
        dots: true
    };

    const handleClinicTrialModalOpen = (id) => {
        dispatch(PhysicianViewTrialsAction(id))
        setTrialDetailModalState(true)
    };

    const TrialDetailModalClose = () => {
        setTrialDetailModalState(false)
        setViewTrialDetails(undefined)
    };

    const handleRedirectUser2Chat = () => {
        history.push({
            pathname: "/patient/my-chats",
            state: {
                full_name: patientClinicDetails.data.clinic_name,
                id: patientClinicDetails.data.id,
                profile_image: patientClinicDetails.data.listing_image,
            }
        })
    }

    useEffect(() => {
        if(favTrialSelector !== undefined && favTrialSelector.status_code === 200) {
            dispatch(PhysicianClinicDetailsAction(id))
        }
    }, [favTrialSelector])

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
                                            <img src={patientClinicDetails.data.listing_image} alt={patientClinicDetails.data.clinic_name} />
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
                                                            favBtnDisable={true}
                                                            id={patientClinicDetails.data.id}
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
                                    <MapIframe latitude={patientClinicDetails.data.latitude} longitude={patientClinicDetails.data.longitude} />
                                </div>
                            </div>

                        </div>
                        :
                        <LogoLoader />
                    }
                </div>
            </div>


            {/* <CommonModal className="custom-size-modal" show={TrialDetailModalState} onHide={TrialDetailModalClose} keyboard={false}
                ModalTitle={
                    viewDetails !== undefined &&
                    <>
                        <h2> {viewDetails.data.clinic_trial_info.trial_name} </h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on {moment(viewDetails.data.clinic_trial_info.updated_date).format("MMM Do YY")}</span>
                            {viewDetails.data.is_recruiting === 1 ?
                                <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                :
                                <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                            }
                        </div>
                    </>
                }
                onClick={TrialDetailModalClose}
                ModalData={
                    viewDetails !== undefined ?
                        <>
                            <div className='sponser-price-info'>
                                <div className='sponser-price-row'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='user' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>Sponsor</h4>
                                        <h2> {viewDetails.data.sponsor_user_info.sponsor_name} </h2>
                                    </div>
                                </div>
                                <div className='sponser-price-row'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>Trial Compensation</h4>
                                        <h2> ${viewDetails.data.clinic_trial_info.compensation} </h2>
                                    </div>
                                </div>
                            </div>
                            <div className='info-bx'>
                                <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
                            </div>

                            {viewDetails.data.clinic_trial_info.description !== null &&
                                <div className='clnicaltrial-description'>
                                    <h2>Description</h2>
                                    <p> {viewDetails.data.clinic_trial_info.description} </p>
                                </div>
                            }

                            <div className='clnicaltrial-detail-ftr'>
                                <button className="btn-action btn-primary" onClick={() => handleRedirectUser2Chat()}> <box-icon name='message-rounded-dots' color="#ffffff"></box-icon> </button>
                            </div>
                        </>
                        :
                        <LogoLoader />
                }
            /> */}
        </>
    );
};

export default TrialClinicDetails;
