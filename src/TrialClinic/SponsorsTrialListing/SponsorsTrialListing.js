import React, { useState, useEffect } from 'react';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ClinicSponsorsBookingProcess from '../../views/Components/SponsorsBookingProcess/SponsorsBookingProcess';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import '../../Patient/MyFavorites/MyFavorites.css';
import '../../Patient/TrialListing/TrialListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { SponsorsTrialListAction } from '../../redux/actions/TrialClinicAction';
import { ViewTrialsAction } from '../../redux/actions/TrialSponsorAction';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import getCurrentHost from '../../redux/constants';
import { authHeader } from '../../redux/actions/authHeader';

const ClinicSponsorsTrialListing = (props) => {
    const clinicDetailSelector = useSelector(state => state.My_trials.trial_detail.data);
    const sponsorsTrialListSelector = useSelector(state => state.trial_clinic.stlData.data);
    const isloading = useSelector(state => state.trial_clinic);

    const [loadMoreData, setLoadMoreData] = useState(1);
    const [clinicDetails, setClinicDetails] = useState();
    const [TrialListState, setTrialListState] = useState(undefined);
    const [clinicTrialID, setClinicTrialID] = useState();
    const [LoadingState, setLoadingState] = useState(false);
    const [AllUserConditions, setAllUserConditions] = useState([]);
    const [formData, setFormData] = useState({
        conditions: [],
        allChecked: false
    })
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const { id } = useParams()
    const history = useHistory();
    const dispatch = useDispatch();

    console.log("sponsorsTrialListSelector", sponsorsTrialListSelector);
    console.log("AllUserConditions", AllUserConditions);
    console.log("formData", formData);

    useEffect(() => {
        setClinicDetails(clinicDetailSelector)
    }, [clinicDetailSelector]);

    useEffect(() => {
        setTrialListState(sponsorsTrialListSelector)
        setLoadingState(false)
    }, [sponsorsTrialListSelector]);

    useEffect(() => {
        let data = {
            page: loadMoreData
        }
        dispatch(SponsorsTrialListAction(id, data))
    }, [dispatch, id, loadMoreData])

    const handleClinicTrialModalOpen = (id) => {
        dispatch(ViewTrialsAction(id))
        setShow(true)
        setClinicTrialID(id)
    };
    const handleClose = () => {
        setShow(false);
        setClinicDetails(undefined)
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

    const SponsorListFilterSubmit = (e) => {
        setLoadingState(true)
        setTrialListState(undefined)
        e.preventDefault();
        let data = {
            conditions: formData.conditions,
            page: loadMoreData
        }
        dispatch(SponsorsTrialListAction(id, data))
    }

    const handleLoadMore = (e) => {
        e.preventDefault();
        setLoadMoreData(loadMoreData + 1)
        SponsorListFilterSubmit()
    }

    const handleRedirectUser2Chat = () => {
        history.push({
            pathname: "/trial-clinic/my-chats",
            state: props.location.state
        })
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
                                                    title={value.trial_name}
                                                    description={value.description}
                                                    iconColor="#356AA0"
                                                    status={
                                                        value.status === 1 ?
                                                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                                            :
                                                            <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                                    }
                                                    id={sponsorsTrialListSelector.data.id}
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

                            {TrialListState && TrialListState.data.total > 16 &&
                                <div className='mt-5 text-center'>
                                    <Button
                                        isButton="true"
                                        BtnColor="primary"
                                        BtnText="Load More"
                                        onClick={handleLoadMore}
                                        disabled={TrialListState.data.last_page === TrialListState.data.current_page}
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

export default ClinicSponsorsTrialListing;
