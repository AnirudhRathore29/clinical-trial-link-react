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

toast.configure();
const ClinicTrialApplication = () => {
    const dispatch = useDispatch();
    const trialAppSelector = useSelector(state => state.trial_clinic.trial_app.data);
    const trialAppDetailSelector = useSelector(state => state.trial_clinic.trial_app_detail.data)
    const trialAppStatusSelector = useSelector(state => state.trial_clinic)
    const isloading = useSelector(state => state.trial_clinic);

    const [tabName, setTabName] = useState("Pending")
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [selectorData, setSelectorData] = useState(undefined)
    const [detailsModal, setDetailsModal] = useState(false);

    const [statusLoading, setStatusLoading] = useState(false)
    const [recruitingClickBtn, setRecruitingClickBtn] = useState(false);
    const [recruitingCompletedClickBtn, setRecruitingCompletedClickBtn] = useState(false);
    

    const [trialAppDetailData, setTrialAppDetailData] = useState(undefined);
    const [bookingSlots, setBookingSlots] = useState([]);

    const handleSelect = (key) => {
        setSelectorData(undefined)
        setTabName(key)
    }

    useEffect(() => {
        setTrialAppDetailData(trialAppDetailSelector)
    }, [trialAppDetailSelector]);

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
        setTrialAppDetailData(undefined)
        setBookingSlots([])
    };

    const handleLoadMore = (key) => {
        setLoadMoreData(loadMoreData + 1)
        setTabName(key)
    }

    const handleBookingSlots = (event) => {
        var updatedList = [...bookingSlots];
        if (event.target.checked) {
            updatedList = [...bookingSlots, event.target.value];
        } else {
            updatedList.splice(bookingSlots.indexOf(event.target.value), 1);
        }
        setBookingSlots(updatedList);
    };

    useEffect(() => {
        if (recruitingClickBtn || recruitingCompletedClickBtn) {
            setStatusLoading(true)
            if (Object.keys(trialAppStatusSelector.trial_status).length > 0 && !trialAppStatusSelector.loading) {
                setStatusLoading(false)
                handleClose()
                setTrialAppDetailData(undefined)
                setRecruitingClickBtn(false)
                setRecruitingCompletedClickBtn(false)
                toast.success(trialAppStatusSelector.trial_status.data.message, { theme: "colored" })
            } else if (Object.keys(trialAppStatusSelector.error).length > 0 && !trialAppStatusSelector.loading) {
                toast.error(trialAppStatusSelector.error.message, { theme: "colored" })
                setStatusLoading(false)
                setRecruitingClickBtn(false)
                setRecruitingCompletedClickBtn(false)
            }
        }
    }, [recruitingClickBtn, recruitingCompletedClickBtn, trialAppStatusSelector])

    const handleRecruiting = (id, status) => {
        let data = {
            trial_clinic_appointment_id: id,
            is_recruiting: status,
            booking_slots: bookingSlots
        }
        dispatch(TrialApplicationsStatusUpdateAction(data))
        dispatch(TrialApplicationsAction({ page: loadMoreData, application_tab: tabName }))
        if(status !== 2){
            setRecruitingClickBtn(true) 
        } else{
            setRecruitingCompletedClickBtn(true)
        }
    }

    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Trial Applications</h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="Pending" className="pricing-tabs" id="plans-tabs" onSelect={handleSelect}>
                                <Tab eventKey="Pending" title="Pending">
                                    <div className='row'>
                                        {selectorData !== undefined ?
                                            selectorData.data.data.length > 0 ?
                                                selectorData.data.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-5' key={index}>
                                                            <MyAppointmentBx
                                                                // onClick={handleTrialDetailModalOpen}
                                                                imgUrl={value.sponsor_user_info.listing_image}
                                                                title={value.sponsor_user_info.sponsor_name}
                                                                status={value.status === 0 && "Pending"}
                                                                statusClass="primary"
                                                                location={value.sponsor_user_info.address}
                                                                state={value.sponsor_user_info.state_info.name}
                                                                time="Jan 20, 2022"
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
                                                                title={value.sponsor_user_info.sponsor_name}
                                                                status={value.status === 1 && "Eligible"}
                                                                statusClass="primary"
                                                                location={value.sponsor_user_info.address}
                                                                state={value.sponsor_user_info.state_info.name}
                                                                time="Jan 20, 2022"
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
                                                                title={value.sponsor_user_info.sponsor_name}
                                                                status={value.status === 3 ? "Completed" : "Cancelled"}
                                                                statusClass={value.status === 3 ? "success" : "danger"}
                                                                location={value.sponsor_user_info.address}
                                                                state={value.sponsor_user_info.state_info.name}
                                                                time="Jan 20, 2022 (09:00 AM to 11:00 AM)"
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
                        {/* November 23, 2020 */}
                        <h2> {trialAppDetailData.data.clinic_trial_info.trial_name} </h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on {moment(trialAppDetailData.data.updated_date).format("MMMM DD, YYYY")} </span>
                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                        </div>
                    </>
                }
                onClick={handleClose}
                ModalData={
                    trialAppDetailData !== undefined ?
                        <>
                            <div className='sponser-price-info'>
                                <div className='sponser-price-row w-100 br-none'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>To be Decided by Company</h4>
                                        <h2> {trialAppDetailData.data.clinic_trial_info.compensation} </h2>
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
                                                <li>{value.condition_detail.condition_title}</li>
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

                            {trialAppDetailData.data.status === 1 &&
                                <>
                                    <div className='clnicaltrial-description'>
                                        <h2>Select Recruiting Time</h2>
                                        <div className='available-time'>
                                            <div className='time-row'>
                                                {trialAppDetailData.bookingSlots.map((value, index) => {
                                                    return (
                                                        <label key={index}>
                                                            <input type="checkbox" name='available_time' onChange={handleBookingSlots} value={value.id} />
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
