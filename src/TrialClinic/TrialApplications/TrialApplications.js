import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import Button from '../../views/Components/Common/Buttons/Buttons';
import MyAppointmentBx from '../../views/Components/MyAppointmentBx/MyAppointmentBx';
import '../../Patient/MyAppointments/MyAppointments.css';
import '../../Patient/ClinicListing/ClinicListing.css';
import '../../Patient/MyFavorites/MyFavorites.css'
import { TrialApplicationsAction, TrialApplicationsDetailsAction, TrialApplicationsStatusUpdateAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import moment from 'moment';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputText } from '../../views/Components/Common/Inputs/Inputs';
import { useLocation } from 'react-router-dom';

// toast.configure();
const ClinicTrialApplication = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const trialAppSelector = useSelector(state => state.trial_clinic.trial_app.data);
    const trialAppDetailSelector = useSelector(state => state.trial_clinic.trial_app_detail.data)
    const trialAppStatusSelector = useSelector(state => state.trial_clinic)
    const isloading = useSelector(state => state.trial_clinic);

    var stateCurrentTab = location.state && location.state.charAt(0) + location.state.slice(1).toLowerCase()

    const [tabName, setTabName] = useState(location.state ? stateCurrentTab : "Pending")
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [selectorData, setSelectorData] = useState(undefined)
    const [detailsModal, setDetailsModal] = useState(false);
    const [bookingSlotData, setBookingSlotData] = useState([])
    const [statusLoading, setStatusLoading] = useState(false)
    const [recruitingClickBtn, setRecruitingClickBtn] = useState(false);
    const [recruitingCompletedClickBtn, setRecruitingCompletedClickBtn] = useState(false);
    const [trialAppDetailData, setTrialAppDetailData] = useState(undefined);
    const [Formdata, setFormdata] = useState({
        compensation: ''
    });

    console.log("trialAppDetailSelector", trialAppDetailSelector);
    console.log("trialAppDetailData", trialAppDetailData);
    console.log("location", location);
    console.log("tabName", tabName);
    console.log("bookingSlotData", bookingSlotData);
    console.log("Formdata", Formdata.compensation);

    const handleSelect = (key) => {
        setSelectorData(undefined)
        setTabName(key)
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormdata((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    };

    useEffect(() => {
        if (detailsModal) {
            trialAppDetailSelector?.bookingSlots.forEach((slots) => {
                slots.selected = false
                trialAppDetailSelector.data.active_appointment_slots.forEach((selectedSlots) => {
                    if (selectedSlots.booking_slot_id === slots.id) {
                        slots.selected = true
                    }
                })
                bookingSlotData.push(slots)
            })
            setTrialAppDetailData(trialAppDetailSelector)
        }
    }, [trialAppDetailSelector, bookingSlotData]);

    useEffect(() => {
        dispatch(TrialApplicationsAction({ page: loadMoreData, application_tab: tabName }))
    }, [dispatch, tabName, loadMoreData])

    useEffect(() => {
        setSelectorData(trialAppSelector)
    }, [trialAppSelector])

    const handleTrialDetailModalOpen = (id) => {
        setDetailsModal(true)
        dispatch(TrialApplicationsDetailsAction(id))
    };

    const handleClose = () => {
        setDetailsModal(false)
        setBookingSlotData([])
        setTrialAppDetailData(undefined)
        dispatch(TrialApplicationsDetailsAction())
    };

    const handleLoadMore = (key) => {
        setLoadMoreData(loadMoreData + 1)
        setTabName(key)
    }

    const handleBookingSlots = (event) => {
        trialAppDetailSelector?.bookingSlots.map((slots) => {
            if (slots.id === Number(event.target.value)) {
                slots.selected = !slots.selected
            }

            return <></>
        })
    };

    useEffect(() => {
        if (recruitingClickBtn || recruitingCompletedClickBtn) {
            setStatusLoading(true)
            if (Object.keys(trialAppStatusSelector.trial_status).length > 0 && !trialAppStatusSelector.loading) {
                setStatusLoading(false)
                handleClose()
                setRecruitingClickBtn(false)
                setRecruitingCompletedClickBtn(false)
                toast.success(trialAppStatusSelector.trial_status.data.message, { theme: "colored", autoClose: 5000})
            } else if (Object.keys(trialAppStatusSelector.error).length > 0 && !trialAppStatusSelector.loading) {
                toast.error(trialAppStatusSelector.error.message, { theme: "colored", autoClose: 5000})
                setStatusLoading(false)
                setRecruitingClickBtn(false)
                setRecruitingCompletedClickBtn(false)
            }
        }
    }, [recruitingClickBtn, recruitingCompletedClickBtn, trialAppStatusSelector])


    const handleRecruiting = (id, status) => {
        const slotSelectedTrue = trialAppDetailSelector.bookingSlots.filter((value) => value.selected === true)
        const selectedSlotID = slotSelectedTrue.map((value) => value.id)
        let data = {
            trial_clinic_appointment_id: id,
            is_recruiting: status,
            booking_slots: selectedSlotID,
            compensation: Formdata.compensation
        }
        if(Formdata.compensation === "" && trialAppDetailData?.data?.is_recruiting !== 1){
            toast.error("Please add compensation!", { theme: "colored", autoClose: 5000})
            return
        }
        dispatch(TrialApplicationsStatusUpdateAction(data))
        dispatch(TrialApplicationsAction({ page: loadMoreData, application_tab: tabName }))
        if (status !== 2) {
            setRecruitingClickBtn(true)
        } else {
            setRecruitingCompletedClickBtn(true)
        }
    }

    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Clinical Studies</h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey={tabName} className="pricing-tabs" id="plans-tabs" onSelect={handleSelect}>
                                <Tab eventKey="Pending" title="Pending">
                                    <div className='row'>
                                        {selectorData !== undefined ?
                                            selectorData.data.data.length > 0 ?
                                                selectorData.data.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <MyAppointmentBx
                                                                onClick={() => handleTrialDetailModalOpen(value.id)}
                                                                imgUrl={value.sponsor_user_info.listing_image}
                                                                title={value.clinic_trial_info.trial_name}
                                                                status={value.status === 0 && "Pending"}
                                                                statusClass="primary"
                                                                location={value.sponsor_user_info.address}
                                                                state={value.sponsor_user_info.state_info.name}
                                                                time={moment(value.updated_date).format("MMMM DD, YYYY")}
                                                                description={value.sponsor_user_info.sponsor_name}
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
                                    {selectorData && selectorData.data.total > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore("Pending")}
                                                disabled={selectorData.data.last_page === selectorData.data.current_page}
                                                hasSpinner={isloading.loading}
                                            />
                                        </div>
                                    }
                                </Tab>

                                <Tab eventKey="Current" title="Current">
                                    <div className='row'>
                                        {selectorData !== undefined ?
                                            selectorData.data.data.length > 0 ?
                                                selectorData.data.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <MyAppointmentBx
                                                                onClick={() => handleTrialDetailModalOpen(value.id)}
                                                                imgUrl={value.sponsor_user_info.listing_image}
                                                                title={value.clinic_trial_info.trial_name}
                                                                status={value.status === 1 && "Eligible"}
                                                                statusClass="primary"
                                                                location={value.sponsor_user_info.address}
                                                                state={value.sponsor_user_info.state_info.name}
                                                                time={moment(value.updated_date).format("MMMM DD, YYYY")}
                                                                description={value.sponsor_user_info.sponsor_name}
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

                                    {selectorData && selectorData.data.total > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore("Current")}
                                                disabled={selectorData.data.last_page === selectorData.data.current_page}
                                                hasSpinner={isloading.loading}
                                            />
                                        </div>
                                    }
                                </Tab>

                                <Tab eventKey="Past" title="Past">
                                    <div className='row'>
                                        {selectorData !== undefined ?
                                            selectorData.data.data.length > 0 ?
                                                selectorData.data.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <MyAppointmentBx
                                                                onClick={() => handleTrialDetailModalOpen(value.id)}
                                                                imgUrl={value.sponsor_user_info.listing_image}
                                                                title={value.clinic_trial_info.trial_name}
                                                                status={value.status === 3 ? "Completed" : "Rejected"}
                                                                statusClass={value.status === 3 ? "success" : "danger"}
                                                                location={value.sponsor_user_info.address}
                                                                state={value.sponsor_user_info.state_info.name}
                                                                time={moment(value.updated_date).format("MMMM DD, YYYY")}
                                                                description={value.sponsor_user_info.sponsor_name}
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

                                    {selectorData && selectorData.data.total > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore("Past")}
                                                disabled={selectorData.data.last_page === selectorData.data.current_page}
                                                hasSpinner={isloading.loading}
                                            />
                                        </div>
                                    }
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={detailsModal} onHide={handleClose} keyboard={false}
                ModalTitle={
                    trialAppDetailData !== undefined &&
                    <>
                        <h2> {trialAppDetailData.data.clinic_trial_info.trial_name} </h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on {moment(trialAppDetailData.data.updated_date).format("MMMM DD, YYYY")} </span>
                            { trialAppDetailData.data.status === 2 || trialAppDetailData.data.status === 3 ||  trialAppDetailData.data.status === 0 ?
                                <span className={trialAppDetailData.data.status === 2 ? 'badge badge-danger' : trialAppDetailData.data.status === 3 ? 'badge badge-success' : 'badge badge-primary'}>{trialAppDetailData.data.status === 2 ? "Rejected" : trialAppDetailData.data.status === 3 ? "Completed" : "Pending"}</span>
                                :
                                trialAppDetailData.data.is_recruiting === 1 ?
                                <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                :
                                <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Recruiting stopped</span>
                            }
                        </div>
                    </>
                }
                onClick={handleClose}
                ModalData={
                    trialAppDetailData !== undefined ?
                        <>
                            <div className='sponser-price-info'>
                                <div className='sponser-price-row'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>To be Decided by Company</h4>
                                        <h2> {trialAppDetailData.data.clinic_trial_info.compensation === null ? "0" : trialAppDetailData.data.clinic_trial_info.compensation} </h2>
                                    </div>
                                </div>
                                <div className='sponser-price-row'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>Clinical Compensation</h4>
                                        <h2> {trialAppDetailData.data.compensation === null ? "0" : trialAppDetailData.data.compensation} </h2>
                                    </div>
                                </div>
                            </div>
                            <div className='info-bx'>
                                <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> Lorem ipsum dolor sit amet consectetur adipiscing eli am porta nunc eu nibh dignissim sit amet viverra.
                            </div>

                            {trialAppDetailData.data.clinic_trial_info.conditions?.length !== 0 &&
                                <div className='clnicaltrial-description'>
                                    <h2>Condition</h2>
                                    <ul className='condition-ul'>
                                        {trialAppDetailData.data.clinic_trial_info.conditions.map((value, index) => {
                                            return (
                                                <li key={index}>{value.condition_detail.condition_title}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }

                            {trialAppDetailData.data.clinic_trial_info.description &&
                                <div className='clnicaltrial-description'>
                                    <h2>Description</h2>
                                    <p> {trialAppDetailData.data.clinic_trial_info.description} </p>
                                </div>
                            }

                            {trialAppDetailData.data.status === 2 &&
                                <div className='clnicaltrial-description'>
                                    <h2>Cancellation Reason</h2>
                                    <p>Not Eligible</p>
                                </div>
                            }

                            {trialAppDetailData.data.is_recruiting === 0 && trialAppDetailData.data.status === 1 &&
                                <div className='clnicaltrial-description'>
                                    <h2>Add Compensation</h2>
                                    <InputText
                                        type="text"
                                        name="compensation"
                                        required="required"
                                        labelText="Compensation"
                                        placeholder="Compensation"
                                        defaultValue={trialAppDetailData.data.compensation}
                                        onChange={onChange}
                                    />
                                </div>
                            }

                            {trialAppDetailData.data.status === 1 &&
                                <>
                                    <div className='clnicaltrial-description'>
                                        <h2>Select Recruiting Time</h2>
                                        <div className='available-time'>
                                            <div className='time-row'>
                                                {bookingSlotData.map((value, index) => {
                                                    return (
                                                        <label key={index}>
                                                            <input type="checkbox" name='available_time' onChange={handleBookingSlots} defaultChecked={value.selected} value={value.id} disabled={trialAppDetailData.data.is_recruiting} />
                                                            <span>{value.from_time} - {value.to_time}</span>
                                                        </label>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='clnicaltrial-detail-ftr'>
                                        <Button
                                            isButton="true"
                                            BtnColor={trialAppDetailData.data.is_recruiting === 1 ? "red" : "green"}
                                            hasSpinner={recruitingClickBtn && statusLoading}
                                            disabled={recruitingClickBtn && statusLoading}
                                            BtnText={trialAppDetailData.data.is_recruiting === 1 ? "Stop Recruiting" : "Start Recruiting"}
                                            onClick={
                                                trialAppDetailData.data.is_recruiting === 1 ?
                                                    () => handleRecruiting(trialAppDetailData.data.id, 0)
                                                    :
                                                    () => handleRecruiting(trialAppDetailData.data.id, 1)
                                            }
                                        />

                                        {trialAppDetailData.data.is_recruiting === 1 &&
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                hasSpinner={recruitingCompletedClickBtn && statusLoading}
                                                disabled={recruitingCompletedClickBtn && statusLoading}
                                                BtnText="Completed"
                                                onClick={() => handleRecruiting(trialAppDetailData.data.id, 2)}
                                            />
                                        }
                                    </div>
                                </>
                            }
                        </>
                        :
                        <LogoLoader />
                }
            />
        </>
    );
};

export default ClinicTrialApplication;
