import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { PatientClinicAppTrialListAction, PatientMyFavTrialAction, PatientViewTrialsAction } from '../../../redux/actions/PatientAction';
import { authHeader } from '../../../redux/actions/authHeader';
import getCurrentHost from '../../../redux/constants';
import RadioBtn from '../Common/RadioBtn/RadioBtn';
import Button from '../Common/Buttons/Buttons';
import ClinicTrial from '../ClinicTrial/ClinicTrial';
import { NoDataFound } from '../Common/NoDataFound/NoDataFound';
import PatientBookingProcess from '../BookingProcess/BookingProcess';

const SearchListing = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const viewTrialDetailSelector = useSelector(state => state.patient.view_trial.data);
    const PatientTrialListSelector = useSelector(state => state.patient.clinic_details_list.data);
    const favTrialSelector = useSelector(state => state.patient.patient_my_fav_trials.data);
    const loadingSelector = useSelector(state => state.patient);

    const [loadMoreData, setLoadMoreData] = useState(1);
    const [TrialListState, setTrialListState] = useState(undefined);
    const [LoadingState, setLoadingState] = useState(false);
    const [viewTrialDetails, setViewTrialDetails] = useState(undefined);
    const [AllUserConditions, setAllUserConditions] = useState([]);
    const [formData, setFormData] = useState({
        conditions: [],
        allChecked: false
    })

    const [show, setShow] = useState(false);

    console.log("location", location);

    useEffect(() => {
        setViewTrialDetails(viewTrialDetailSelector)
        return () => { setViewTrialDetails(undefined) }
    }, [viewTrialDetailSelector]);

    useEffect(() => {
        setTrialListState(PatientTrialListSelector)
        setLoadingState(false)
    }, [PatientTrialListSelector]);

    const handleClinicTrialModalOpen = (id) => {
        dispatch(PatientViewTrialsAction(id))
        setShow(true)
    };

    const handleClose = () => {
        setShow(false);
        setViewTrialDetails(undefined)
    };
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

    const SponsorListFilterSubmit = (e) => {
        setLoadingState(true)
        setTrialListState(undefined)
        e.preventDefault();
        let data = {
            conditions: formData.conditions,
            page: loadMoreData
        }
        dispatch(PatientClinicAppTrialListAction(id, data))
    }

    const handleLoadMore = (e) => {
        e.preventDefault();
        setLoadMoreData(loadMoreData + 1)
        SponsorListFilterSubmit()
    }

    useEffect(() => {
        const configure = {
            method: "GET",
            headers: authHeader()
        }
        fetch(getCurrentHost() + "/get-all-user-conditions", configure)
            .then(response => response.json())
            .then(response => {
                console.log("response.length", response);
                const data = response.data
                for (let i = 0; i < data.length; i++) {
                    const object = Object.assign({}, data[i])
                    object.checked = false;
                    setAllUserConditions((preValue) => [...preValue, object])
                }
            })
    }, [])

    const conditionOnchange = (id, e) => {
        if (e.target.checked) {
            const filterObject = AllUserConditions.find(value => value.condition_info.id == id)
            filterObject.checked = true
            setFormData({ conditions: [...formData.conditions, id] })
            if ((AllUserConditions.length - 1) === (formData.conditions.length)) {
                setFormData({ ...formData, allChecked: true })
            }
        }
        else {
            const filterIDs = formData.conditions.filter(value => value !== id)
            const filterObject = AllUserConditions.find(value => value.condition_info.id == id)
            filterObject.checked = false
            setFormData({ ...formData, conditions: filterIDs, allChecked: false })
        }
    }

    const SelectAllCondition = (e) => {
        if (e.target.checked) {
            const allIds = AllUserConditions.map(value => value.condition_info.id)
            for (let i = 0; i < AllUserConditions.length; i++) {
                AllUserConditions[i].checked = true
            }
            setFormData({ conditions: allIds })
        } else {
            setFormData({ conditions: [] })
            for (let i = 0; i < AllUserConditions.length; i++) {
                AllUserConditions[i].checked = false
            }
        }
    }

    const MyFavTrial = (id) => {
        dispatch(PatientMyFavTrialAction({trial_clinic_appointment_id: id}))
    }

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

    useEffect(() => {
        if(favTrialSelector !== undefined && favTrialSelector.status_code === 200) {
            console.log("favTrialSelector called");
            let data = {
                page: loadMoreData
            }
            dispatch(PatientClinicAppTrialListAction(id, data))
            setTrialListState()
        }
    }, [favTrialSelector])
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
                                    <RadioBtn
                                        className="checkbox-btn"
                                        type="checkbox"
                                        name="All"
                                        labelText="All"
                                        checked={formData.allChecked}
                                        onChange={SelectAllCondition}
                                    />
                                </div>
                                {
                                    AllUserConditions.map((value, index) => {
                                        return (
                                            <div className="form-group" key={index}>
                                                <RadioBtn
                                                    className="checkbox-btn"
                                                    type="checkbox"
                                                    name="conditions"
                                                    checked={value.checked}
                                                    onChange={(e) => conditionOnchange(value.condition_info.id, e)}
                                                    labelText={value.condition_info.condition_title}
                                                />
                                            </div>
                                        )
                                    })
                                }
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Apply"
                                    onClick={SponsorListFilterSubmit}
                                    hasSpinner={LoadingState}
                                    disabled={LoadingState}
                                />
                            </div>
                        </div>

                        <div className='col-lg-8'>

                            {TrialListState !== undefined ?
                                TrialListState.data.data.length !== 0 ?
                                    TrialListState.data.data.map((value, index) => {
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
                                                            <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Recruiting stopped</span>
                                                    }
                                                    onClickFav={() => MyFavTrial(value.id)}
                                                    iconType={value.is_favourite === 1 ? "solid" : null}
                                                    id={TrialListState.data.id}
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

                            {TrialListState && TrialListState.data.total > 16 &&
                                <div className='mt-5 text-center'>
                                    <Button
                                        isButton="true"
                                        BtnColor="primary"
                                        BtnText="Load More"
                                        onClick={handleLoadMore}
                                        disabled={TrialListState.data.last_page === TrialListState.data.current_page}
                                        hasSpinner={loadMoreData && loadingSelector.loading}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <PatientBookingProcess
                show={show}
                handleClose={handleClose}
                show2={show2}
                handleClose2={handleClose2}
                handleShow2={handleShow2}
                onClickChat={(data) => handleRedirectUser2Chat(data)}
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

export default SearchListing;
