import React, { useEffect, useState } from 'react';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import '../../Patient/MyFavorites/MyFavorites.css';
import '../../Patient/TrialListing/TrialListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import moment from 'moment';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { PhysicianClinicAppTrialListAction, PhysicianViewTrialsAction } from '../../redux/actions/PhysicianAction';

const PhysicianTrialListing = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const viewTrialDetailSelector = useSelector(state => state.patient.view_trial.data);
    const PatientTrialListSelector = useSelector(state => state.patient.clinic_details_list.data);
    const loadingSelector = useSelector(state => state.patient);

    const [loadMoreData, setLoadMoreData] = useState(1);
    const [viewTrialDetails, setViewTrialDetails] = useState(undefined);
    const [TrialDetailModalState, setTrialDetailModalState] = useState(false);

    useEffect(() => {
        setViewTrialDetails(viewTrialDetailSelector)
        return () => { setViewTrialDetails(undefined) }
    }, [viewTrialDetailSelector]);

    const handleClinicTrialModalOpen = (id) => {
        dispatch(PhysicianViewTrialsAction(id))
        setTrialDetailModalState(true)
    };

    const TrialDetailModalClose = () => {
        setTrialDetailModalState(false)
        setViewTrialDetails(undefined)
    };

    useEffect(() => {
        let data = {
            page: loadMoreData
        }
        dispatch(PhysicianClinicAppTrialListAction(id, data))
    }, [dispatch, id, loadMoreData])

    const handleRedirectUser2Chat = () => {
        // history.push({
        //     pathname: "/physician/my-chats",
        //     state: {
        //         full_name: patientClinicDetails.data.clinic_name,
        //         id: patientClinicDetails.data.id,
        //         profile_image: patientClinicDetails.data.listing_image,
        //     }
        // })
    }

    const handleLoadMore = (e) => {
        e.preventDefault();
        setLoadMoreData(loadMoreData + 1)
    }
    return (
        <>
            <div className="clinical-dashboard main-trial-listing">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Clinical Trials</h1>
                    </div>
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

                            {PatientTrialListSelector !== undefined ?
                                PatientTrialListSelector.data.data.length !== 0 ?
                                    PatientTrialListSelector.data.data.map((value, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    onClick={() => handleClinicTrialModalOpen(value.id)}
                                                    title={value.clinic_trial_info.trial_name}
                                                    description={value.clinic_trial_info.description}
                                                    iconColor="#356AA0"
                                                    status={
                                                        value.is_recruiting === 1 ?
                                                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                                            :
                                                            <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                                    }
                                                    id={PatientTrialListSelector.data.id}
                                                    favBtnDisable={true}
                                                />
                                            </React.Fragment>
                                        )
                                    })
                                    :
                                    <NoDataFound />
                                :
                                [1, 2, 3].map((_, index) => {
                                    return (
                                        <div className='mb-3' key={index}>
                                            <Skeleton height={164} borderRadius="1rem" style={{ marginBottom: 10 }} />
                                        </div>
                                    )
                                })
                            }

                            {PatientTrialListSelector && PatientTrialListSelector.data.total > 16 &&
                                <div className='mt-5 text-center'>
                                    <Button
                                        isButton="true"
                                        BtnColor="primary"
                                        BtnText="Load More"
                                        onClick={handleLoadMore}
                                        disabled={PatientTrialListSelector.data.last_page === PatientTrialListSelector.data.current_page}
                                        hasSpinner={loadMoreData && loadingSelector.loading}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={TrialDetailModalState} onHide={TrialDetailModalClose} keyboard={false}
                ModalTitle={
                    viewTrialDetails !== undefined &&
                    <>
                        <h2> {viewTrialDetails.data.clinic_trial_info.trial_name} </h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on {moment(viewTrialDetails.data.clinic_trial_info.updated_date).format("MMM Do YY")}</span>
                            {viewTrialDetails.data.is_recruiting === 1 ?
                                <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                :
                                <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                            }
                        </div>
                    </>
                }
                onClick={TrialDetailModalClose}
                ModalData={
                    viewTrialDetails !== undefined ?
                        <>
                            <div className='sponser-price-info'>
                                <div className='sponser-price-row'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='user' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>Sponsor</h4>
                                        <h2> {viewTrialDetails.data.sponsor_user_info.sponsor_name} </h2>
                                    </div>
                                </div>
                                <div className='sponser-price-row'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>Trial Compensation</h4>
                                        <h2> ${viewTrialDetails.data.clinic_trial_info.compensation} </h2>
                                    </div>
                                </div>
                            </div>
                            <div className='info-bx'>
                                <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
                            </div>

                            {viewTrialDetails.data.clinic_trial_info.description !== null &&
                                <div className='clnicaltrial-description'>
                                    <h2>Description</h2>
                                    <p> {viewTrialDetails.data.clinic_trial_info.description} </p>
                                </div>
                            }

                            <div className='clnicaltrial-detail-ftr'>
                                <button className="btn btn-primary w-100" onClick={() => handleRedirectUser2Chat()}> Chat Now </button>
                            </div>
                        </>
                        :
                        <LogoLoader />
                }
            />
        </>
    );
};

export default PhysicianTrialListing;
