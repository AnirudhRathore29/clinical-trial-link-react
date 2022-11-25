import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import PatientBookingProcess from '../../views/Components/BookingProcess/BookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import SponsorsBx from '../../views/Components/SponsorsBx/SponsorsBx';
import Button from '../../views/Components/Common/Buttons/Buttons';
import 'owl.carousel/dist/assets/owl.carousel.css';
import './TrialClinicDetails.css'
import '../MyFavorites/MyFavorites.css'
import { PatientClinicDetailsAction, PatientMyFavTrialAction, PatientViewTrialsAction } from '../../redux/actions/PatientAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import MapIframe from '../../views/Components/MapIframe/MapIframe';

const TrialClinicDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const viewTrialDetailSelector = useSelector(state => state.patient.view_trial.data);
    const trialClinicDetailSelector = useSelector(state => state.patient.clinic_details.data);
    const favTrialSelector = useSelector(state => state.patient.patient_my_fav_trials.data);
    const { id } = useParams()

    const [patientClinicDetails, setPatientClinicDetails] = useState();
    const [viewTrialDetails, setViewTrialDetails] = useState(undefined);

    console.log("favTrialSelector", favTrialSelector);
    console.log("trialClinicDetailSelector", trialClinicDetailSelector);
    console.log("patientClinicDetails", patientClinicDetails);

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

    const MyFavTrial = (id) => {
        dispatch(PatientMyFavTrialAction({trial_clinic_appointment_id: id}))
    }

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
            console.log("favTrialSelector called");
            dispatch(PatientClinicDetailsAction(id))
            setPatientClinicDetails()
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
                                        <span><box-icon name='map-alt' color="#356AA0"></box-icon> {patientClinicDetails.data.distance && patientClinicDetails.data.distance.toFixed(3)} Mi</span>
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
                                        {
                                                patientClinicDetails.data.clinic_trials.length > 0 &&
                                            <Button
                                                isLink="true"
                                                URL={"/patient/trial-listing/" + patientClinicDetails.data.id}
                                                BtnColor="green btn-sm"
                                                BtnText="View All"
                                            />
                                        }
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
                                                            onClickFav={() => MyFavTrial(value.id)}
                                                            iconType={value.is_favourite === 1 ? "solid" : null}
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

            <PatientBookingProcess
                show={show}
                handleClose={handleClose}
                show2={show2}
                onClickChat={handleRedirectUser2Chat}

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
