import React, { useEffect, useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import PatientBookingProcess from '../../views/Components/BookingProcess/BookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import '../MyFavorites/MyFavorites.css';
import './TrialListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { PatientClinicAppTrialListAction, PatientMyFavTrialAction, PatientViewTrialsAction } from '../../redux/actions/PatientAction';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import { authHeader } from '../../redux/actions/authHeader';
import getCurrentHost from '../../redux/constants';
import { InputText } from '../../views/Components/Common/Inputs/Inputs';
import { MultiSelect } from "react-multi-select-component";

const PatientTrialListing = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const ApiUrl = id ? `/patient/get-trialclinic-approved-trial-list/${id}` : "/patient/get-searched-trials"
    const viewTrialDetailSelector = useSelector(state => state.patient.view_trial.data);
    const PatientTrialListSelector = useSelector(state => state.patient.clinic_details_list.data);
    const favTrialSelector = useSelector(state => state.patient.patient_my_fav_trials.data);
    const loadingSelector = useSelector(state => state.patient);

    const [loadMoreData, setLoadMoreData] = useState(1);
    const [TrialListState, setTrialListState] = useState(undefined);
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [viewTrialDetails, setViewTrialDetails] = useState(undefined);
    const [trialClinicFilter, setTrialClinicFilter] = useState({
        search_filter: location?.search?.split("=").pop(),
        specialities: [],
        conditions: [],
    });

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    useEffect(() => {
        setViewTrialDetails(viewTrialDetailSelector)
        return () => { setViewTrialDetails(undefined) }
    }, [viewTrialDetailSelector]);

    useEffect(() => {
        setTrialListState(PatientTrialListSelector)
    }, [PatientTrialListSelector]);

    const handleClinicTrialModalOpen = (id) => {
        dispatch(PatientViewTrialsAction(id))
        setShow(true)
    };

    const handleClose = () => {
        setShow(false);
        setViewTrialDetails(undefined)
    };

    useEffect(() => {
        let data = {
            page: loadMoreData
        }
        dispatch(PatientClinicAppTrialListAction(ApiUrl, data))
    }, [dispatch, id, loadMoreData, ApiUrl])
    useEffect(() => {
        let data = {
            page: loadMoreData
        }
        setTrialClinicFilter({
            search_filter: '',
            specialities: [],
            conditions: [],
        })
        dispatch(PatientClinicAppTrialListAction(ApiUrl, id ? data : { ...data, search_filter: location?.search?.split("=").pop() }))
    }, [dispatch, id, ApiUrl, location?.search, location?.state?.count])


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

    async function SpecialitiesAction() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return fetch(getCurrentHost() + "/get-user-specialitites", requestOptions)
            .then(data => data.json())
            .then((response) => {
                let data = response.data;
                for (var i = 0; i < data?.length; i++) {
                    const obj = Object.assign({}, data[i]);
                    obj.label = data[i].speciality_info.speciality_title;
                    obj.value = data[i].speciality_info.id;
                    console.log("data[i].speciality_info.id", data[i].speciality_info.id);
                    setSpecialityList(oldArray => [...oldArray, obj]);
                }
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    async function ConditionsAction(data) {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(data)
        };
        return fetch(getCurrentHost() + "/get-user-conditions", requestOptions)
            .then(data => data.json())
            .then((response) => {
                var data = response.data;
                var conditionsArr = [];
                for (var i = 0; i < data?.length; i++) {
                    const obj = Object.assign({}, data[i]);
                    obj.label = data[i].condition_info.condition_title;
                    obj.value = data[i].condition_info.id;
                    conditionsArr.push(obj)
                }
                setConditionList(conditionsArr);
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    useEffect(() => {
        SpecialitiesAction();
    }, [])

    const specialityOnChange = (e) => {
        setTrialClinicFilter({ ...trialClinicFilter, specialities: e })
        const speArr = e.map(value => value.speciality_info.id)
        let data = {
            speciality_ids: speArr
        }
        ConditionsAction(data);
    }

    const onchange = (e) => {
        const { name, value } = e.target
        setTrialClinicFilter((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const TrialClinicListFilterSubmit = (e) => {
        e.preventDefault();
        const specialityArr = trialClinicFilter.specialities.map(value => value.speciality_info.id);
        const conditionArr = trialClinicFilter.conditions.map(value => value.condition_info.id);
        let data = {
            page: loadMoreData,
            search_filter: trialClinicFilter.search_filter,
            specialities: specialityArr,
            conditions: conditionArr,
        }
        dispatch(PatientClinicAppTrialListAction(ApiUrl, data))
    }

    const MyFavTrial = (id) => {
        dispatch(PatientMyFavTrialAction({ trial_clinic_appointment_id: id }))
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

    const handleLoadMore = (e) => {
        e.preventDefault();
        setLoadMoreData(loadMoreData + 1)
        TrialClinicListFilterSubmit()
    }

    useEffect(() => {
        if (favTrialSelector !== undefined && favTrialSelector.status_code === 200) {
            console.log("favTrialSelector called");
            let data = {
                page: loadMoreData
            }
            dispatch(PatientClinicAppTrialListAction(ApiUrl, data))
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
                            <form className='filter-sidebar' onSubmit={TrialClinicListFilterSubmit} autoComplete="off">
                                <h2>Filter</h2>
                                <InputText
                                    type="search"
                                    labelText="Trial Name"
                                    placeholder="Enter Keywords"
                                    name="search_filter"
                                    value={trialClinicFilter?.search_filter}
                                    onChange={onchange}
                                />
                                <div className="form-group">
                                    <label> Specialty </label>
                                    <MultiSelect
                                        options={specialityList !== undefined && specialityList}
                                        value={trialClinicFilter.specialities}
                                        onChange={specialityOnChange}
                                        disableSearch={true}
                                        labelledBy="Specialty"
                                        className="multiSelect-control"
                                        name="specialities"
                                    />
                                </div>

                                <div className="form-group">
                                    <label> Condition </label>
                                    <MultiSelect
                                        options={conditionList !== undefined && conditionList}
                                        value={trialClinicFilter.conditions}
                                        onChange={(e) => setTrialClinicFilter({ ...trialClinicFilter, conditions: e })}
                                        disableSearch={true}
                                        labelledBy="Condition"
                                        className="multiSelect-control"
                                        name="condition"
                                    />
                                </div>
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Apply"
                                    hasSpinner={loadingSelector.loading}
                                    disabled={loadingSelector.loading}
                                />
                            </form>
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
                                                    ShareFav={true}
                                                    iconType={value.is_favourite === 1 ? "solid" : null}
                                                    id={id}
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

export default PatientTrialListing;
