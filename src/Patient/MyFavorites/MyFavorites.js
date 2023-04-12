import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PatientMyFavTrialAction, PatientMyFavTrialListAction, PatientViewTrialsAction } from '../../redux/actions/PatientAction';
import PatientBookingProcess from '../../views/Components/BookingProcess/BookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './MyFavorites.css';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import { useHistory } from 'react-router-dom';

const PatientMyFavorites = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const viewTrialDetailSelector = useSelector(state => state.patient.view_trial.data);
    const myFavTrialListSelector = useSelector(state => state.patient.patient_my_fav_trials_list.data);
    const favTrialSelector = useSelector(state => state.patient.patient_my_fav_trials.data);

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [viewTrialDetails, setViewTrialDetails] = useState(undefined);

    console.log("myFavTrialListSelector", myFavTrialListSelector);
    console.log("viewTrialDetailSelector", viewTrialDetailSelector);

    const handleClinicTrialModalOpen = (id) => {
        dispatch(PatientViewTrialsAction(id))
        setShow(true)
    };
    const handleClose = () => {
        setViewTrialDetails(undefined)
        setShow(false);
    }
    const handleShow2 = () => {
        setShow2(true);
        handleClose();
    }
    const handleClose2 = () => setShow2(false);
    const handleShow3 = () => {
        setShow3(true);
        handleClose2();
    }
    const handleClose3 = () => setShow3(false);

    const handleRedirectUser2Chat = (data) => {
        history.push({
            pathname: "/patient/my-chats",
            state: {
                full_name: data?.trial_clinic_user_info?.clinic_name,
                id: data?.trial_clinic_user_info?.id,
                profile_image: data?.trial_clinic_user_info?.profile_image,
            }
        })
    }

    const MyFavTrial = (id) => {
        dispatch(PatientMyFavTrialAction({ trial_clinic_appointment_id: id }))
    }

    useEffect(() => {
        dispatch(PatientMyFavTrialListAction())
    }, [dispatch])

    useEffect(() => {
        setViewTrialDetails(viewTrialDetailSelector)
        return () => { setViewTrialDetails(undefined) }
    }, [viewTrialDetailSelector]);

    useEffect(() => {
        if(favTrialSelector !== undefined && favTrialSelector.status_code === 200) {
            dispatch(PatientMyFavTrialListAction())
        }
    }, [favTrialSelector])

    return (
        <>
            <div className="clinical-dashboard my-favorites-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Favorites</h1>
                    </div>

                    <div className='row'>
                        {myFavTrialListSelector !== undefined ?
                            myFavTrialListSelector.data.length > 0 ?
                                myFavTrialListSelector.data.map((value, index) => {
                                    return (
                                        <div className='col-lg-6' key={index}>
                                            <ClinicTrial
                                                className="mb-4 white-trial-bx"
                                                onClick={() => handleClinicTrialModalOpen(value.trial_clinic_appointment_info.id)}
                                                title={value.trial_clinic_appointment_info.clinic_trial_info.trial_name}
                                                description={value.trial_clinic_appointment_info.clinic_trial_info.description}
                                                status={
                                                    value.trial_clinic_appointment_info.is_recruiting === 1 ?
                                                        <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting </span>
                                                        :
                                                        <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Recruiting stopped </span>
                                                }
                                                onClickFav={() => MyFavTrial(value.trial_clinic_appointment_info.id)}
                                                // ShareFav={true}
                                                iconType="solid"
                                                iconColor="#356AA0"
                                                id={value.id}
                                            />
                                        </div>
                                    )
                                })
                                :
                                <NoDataFound />
                            :
                            [1, 2, 3, 4].map((_, index) => {
                                return (
                                    <div className='col-lg-6 mb-5' key={index}>
                                        <Skeleton height={200} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <PatientBookingProcess
                show={show}
                handleClose={handleClose}
                show2={show2}
                onClickChat={(data) => handleRedirectUser2Chat(data)}

                handleClose2={handleClose2}
                handleShow2={handleShow2}
                show3={show3}

                handleClose3={handleClose3}
                handleShow3={handleShow3}

                viewDetails={viewTrialDetails}
                bookingSlotData={viewTrialDetailSelector?.data?.active_appointment_slots}
                bookingId={viewTrialDetailSelector?.data?.id}
            />

        </>
    );
};

export default PatientMyFavorites;
