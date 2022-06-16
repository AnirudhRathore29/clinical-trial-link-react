import React, { useState, useEffect } from 'react';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ClinicSponsorsBookingProcess from '../../views/Components/SponsorsBookingProcess/SponsorsBookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import '../../Patient/MyFavorites/MyFavorites.css';
import '../../Patient/TrialListing/TrialListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SponsorsTrialListAction } from '../../redux/actions/TrialClinicAction';
import { ViewTrialsAction } from '../../redux/actions/TrialSponsorAction';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ClinicSponsorsTrialListing = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const clinicDetailSelector = useSelector(state => state.My_trials.trial_detail.data);
    const sponsorsTrialListSelector = useSelector(state => state.trial_clinic.stlData.data);
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [clinicDetails, setClinicDetails] = useState();
    const [clinicTrialID, setClinicTrialID] = useState();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    useEffect(() => {
        setClinicDetails(clinicDetailSelector)
    }, [clinicDetailSelector]);

    useEffect(() => {
        let data = {
            page: loadMoreData
        }
        dispatch(SponsorsTrialListAction(id, data))
    }, [dispatch, id , loadMoreData])

    const handleClinicTrialModalOpen = (id) => {
        dispatch(ViewTrialsAction(id))
        setShow(true)
        setClinicTrialID(id)
    };
    const handleClose = () => setShow(false);


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

    const SponsorListFilterSubmit = (e) => {
        e.preventDefault();
        let data = {
            page: loadMoreData
        }
        dispatch(SponsorsTrialListAction(id, data))
    }

    const handleLoadMore = (e) => {
        e.preventDefault();
        setLoadMoreData(loadMoreData + 1)
        SponsorListFilterSubmit()
    }

    return (
        <>
            <div className="clinical-dashboard main-trial-listing">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Sponsors Trials</h1>
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
                            {sponsorsTrialListSelector !== undefined ?
                                sponsorsTrialListSelector.data.data.length !== 0 ?
                                    sponsorsTrialListSelector.data.data.map((value, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    onClick={() => handleClinicTrialModalOpen(value.id)}
                                                    title={value.trial_name}
                                                    description={value.description}
                                                    iconColor="#356AA0"
                                                    status={
                                                        value.status === 1 ?
                                                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                                            :
                                                            <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                                    }
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

                            {sponsorsTrialListSelector && sponsorsTrialListSelector.data.total > 16 &&
                                <div className='mt-5 text-center'>
                                    <Button
                                        isButton="true"
                                        BtnColor="primary"
                                        BtnText="Load More"
                                        onClick={handleLoadMore}
                                        disabled={sponsorsTrialListSelector.data.last_page === sponsorsTrialListSelector.data.current_page}
                                        // hasSpinner={isLoading.loading}
                                    />
                                </div>
                            }
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

                trialDetails={clinicDetails}
                trialId={clinicTrialID}
            />
        </>
    );
};

export default ClinicSponsorsTrialListing;
