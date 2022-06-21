import React, { useEffect, useState } from 'react';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import Button from '../../views/Components/Common/Buttons/Buttons';
import PatientBookingProcess from '../../views/Components/BookingProcess/BookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import '../MyFavorites/MyFavorites.css';
import './TrialListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PatientClinicAppTrialListAction } from '../../redux/actions/PatientAction';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';

const PatientTrialListing = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const PatientTrialListSelector = useSelector(state => state.patient.clinic_details_list.data);
    const loadingSelector = useSelector(state => state.patient);

    const [loadMoreData, setLoadMoreData] = useState(1);

    const [show, setShow] = useState(false);

    const handleClinicTrialModalOpen = (id) => {
        // dispatch(ViewTrialsAction(id))
        setShow(true)
        //setClinicTrialID(id)
    };

    const handleClose = () => setShow(false);
    const [show2, setShow2] = useState(false);

    useEffect(() => {
        let data = {
            page: loadMoreData
        }
        dispatch(PatientClinicAppTrialListAction(id, data))
    }, [dispatch, id, loadMoreData])


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

    const handleLoadMore = (e) => {
        e.preventDefault();
        setLoadMoreData(loadMoreData + 1)
    }

    console.log("PatientTrialListSelector", PatientTrialListSelector)

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

            <PatientBookingProcess show={show} handleClose={handleClose} show2={show2} handleClose2={handleClose2} handleShow2={handleShow2} show3={show3} handleClose3={handleClose3} handleShow3={handleShow3} />
        </>
    );
};

export default PatientTrialListing;
