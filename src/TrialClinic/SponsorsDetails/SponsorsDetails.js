import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import ClinicSponsorsBookingProcess from '../../views/Components/SponsorsBookingProcess/SponsorsBookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import Button from '../../views/Components/Common/Buttons/Buttons';
import 'owl.carousel/dist/assets/owl.carousel.css';
import '../../Patient/TrialClinicDetails/TrialClinicDetails.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import { SponsorDetailAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { ViewTrialsAction } from '../../redux/actions/TrialSponsorAction';
import MapIframe from '../../views/Components/MapIframe/MapIframe';

const ClinicSponsorsDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const detailSelector = useSelector(state => state.trial_clinic.sponsore_detail.data);
    const clinicDetailSelector = useSelector(state => state.My_trials.trial_detail.data)
    const { id } = useParams()

    const [clinicDetails, setClinicDetails] = useState();
    const [clinicTrialID, setClinicTrialID] = useState();
    const [sponsoreDetails, setSponsoreDetails] = useState(undefined);

    console.log("sponsoreDetails", sponsoreDetails);

    useEffect(() => {
        setClinicDetails(clinicDetailSelector)
    }, [clinicDetailSelector]);

    useEffect(() => {
        setSponsoreDetails(detailSelector)

        return () => {
            setSponsoreDetails(undefined)
        }
    }, [detailSelector]);

    useEffect(() => {
        dispatch(SponsorDetailAction(id))

        return () => {
            dispatch(SponsorDetailAction())
        }
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
        dispatch(ViewTrialsAction(id))
        setShow(true)
    };

    const handleClose = () => {
        setShow(false);
        setClinicDetails()
    }
    //
    const [show2, setShow2] = useState(false);

    const handleShow2 = (id) => {
        setClinicTrialID(id)
        setShow2(true);
        handleClose();
    }
    const handleClose2 = () => {
        setClinicTrialID("")
        setShow2(false)
    };

    const [show3, setShow3] = useState(false);

    const handleShow3 = () => {
        setShow3(true);
        handleClose2();
    }
    const handleClose3 = () => setShow3(false);

    const handleViewMoreList = (id) => {
        let values = {
            full_name: sponsoreDetails.data.sponsor_name,
            id: sponsoreDetails.data.id,
            profile_image: sponsoreDetails.data.listing_image,
        }
        history.push({
            pathname: `/trial-clinic/sponsors-trial-listing/${id}`,
            state: values
        })
    }

    const handleRedirectUser2Chat = () => {
        let values = {
            full_name: sponsoreDetails.data.sponsor_name,
            id: sponsoreDetails.data.id,
            profile_image: sponsoreDetails.data.listing_image,
        }
        history.push({
            pathname: "/trial-clinic/my-chats",
            state: values
        })
    }
    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    {sponsoreDetails !== undefined ?
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="trialClinic-detail-bx">
                                    <h1>{sponsoreDetails.data.sponsor_name}<button className="share-btn"><box-icon name='share-alt' type='solid' color="#356AA0"></box-icon></button></h1>
                                    <div className="trialClinic-location">
                                        <span><box-icon name='map' color="#356AA0"></box-icon> {sponsoreDetails.data.address}, {sponsoreDetails.data.state_info.name}</span>
                                        <span><box-icon name='map-alt' color="#356AA0"></box-icon> {sponsoreDetails.data.distance && sponsoreDetails.data.distance.toFixed(3)} Mi</span>
                                    </div>
                                    {sponsoreDetails.data.listing_image !== null &&
                                        <div className='trialClinic-img'>
                                            <img src={sponsoreDetails.data.listing_image} alt={sponsoreDetails.data.sponsor_name} />
                                        </div>
                                    }
                                </div>

                                {sponsoreDetails.data.user_speciality.length !== 0 &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Specialty</h2>
                                        <ul className='condition-ul'>
                                            {sponsoreDetails.data.user_speciality.map((value, index) => {
                                                return (
                                                    <li key={index}>{value.speciality_info.speciality_title}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                }

                                {sponsoreDetails.data.user_condition.length !== 0 &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Condition</h2>
                                        <ul className='condition-ul'>
                                            {sponsoreDetails.data.user_condition.map((value, index) => {
                                                return (
                                                    <li key={index}>{value.condition_info.condition_title}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                }

                                {sponsoreDetails.data.user_meta_info.brief_intro !== null &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Description</h2>
                                        <p> {sponsoreDetails.data.user_meta_info.brief_intro} </p>
                                    </div>
                                }

                                {sponsoreDetails.data.clinic_trials !== null &&
                                    <div className="trialClinic-info-bx mt-5">
                                        <h2>Clinical Trials
                                            {
                                                sponsoreDetails.data.clinic_trials.length > 0 &&
                                                <Button
                                                    isButton="true"
                                                    BtnType="button"
                                                    BtnColor="green btn-sm"
                                                    BtnText="View All"
                                                    onClick={() => handleViewMoreList(sponsoreDetails.data.id)}
                                                />
                                            }
                                        </h2>
                                        <OwlCarousel {...options2}>
                                            {sponsoreDetails.data.clinic_trials.map((value, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <ClinicTrial
                                                            onClick={() => handleClinicTrialModalOpen(value.id)}
                                                            title={value.trial_name}
                                                            description={value.description}
                                                            status={
                                                                value.status === 1 ?
                                                                    <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                                                    :
                                                                    <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                                            }
                                                            id={sponsoreDetails.data.id}
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
                                    <MapIframe latitude={sponsoreDetails.data.latitude} longitude={sponsoreDetails.data.longitude} />
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
                onClickChat={handleRedirectUser2Chat}

                handleClose2={handleClose2}
                handleShow2={handleShow2}
                show3={show3}

                handleClose3={handleClose3}
                handleShow3={handleShow3}

                trialDetails={clinicDetails}
                trialId={clinicTrialID}
            />
        </>
    );
};

export default ClinicSponsorsDetails;
