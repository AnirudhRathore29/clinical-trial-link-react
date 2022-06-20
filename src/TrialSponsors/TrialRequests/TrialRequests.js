import { useEffect, useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import '../../Patient/MyAppointments/MyAppointments.css';
import './TrialRequests.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NewTrialRequestAction, TrialRequestDetailAction, TrialRequestAppStatusUpdateAction } from '../../redux/actions/TrialSponsorAction';
import { getImageUrl } from '../../redux/constants';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const SponsorTrialRequests = () => {
    const dispatch = useDispatch();
    const loadingSelector = useSelector(state => state.My_trials)
    const newRequestSelector = useSelector(state => state.My_trials.new_request.data)
    const requestDetailSelector = useSelector(state => state.My_trials.new_request_detail.data)
    const requestStatusSelector = useSelector(state => state.My_trials)

    const [requestDetailData, setRequestDetailData] = useState(undefined)
    const [show, setShow] = useState(false);

    const [loadMoreData, setLoadMoreData] = useState(1);
    const [clickStatusReject, setClickStatusReject] = useState(false)
    const [clickStatusApprove, setClickStatusApprove] = useState(false)

    
    useEffect(() => {
        requestDetailSelector !== undefined && setRequestDetailData(requestDetailSelector.data)
    }, [requestDetailSelector])

    const TrialRequestDetailModalShow = (id) => {
        setShow(true)
        dispatch(TrialRequestDetailAction(id))
    };
    const handleClose = () => {
        setShow(false);
        setRequestDetailData(undefined)
    };

    useEffect(() => {
        dispatch(NewTrialRequestAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }

    const handleRequestStatusUpdate = (id, status) => {
        dispatch(TrialRequestAppStatusUpdateAction({trial_clinic_appointment_id:id, status}))
        if(status == "2"){
            setClickStatusApprove(true)
        } else {
            setClickStatusReject(true)
        }
    }
    
    useEffect(() => {
        if(clickStatusApprove || clickStatusReject){
            if(Object.keys(requestStatusSelector.new_request_status).length > 0 && !requestStatusSelector.loading){
                console.log("requestStatusSelector", requestStatusSelector.new_request_status.data.message)
                toast.success(requestStatusSelector.new_request_status.data.message, { theme: "colored" })
                setShow(false);
                setClickStatusApprove(false)
                setClickStatusReject(false)
                setRequestDetailData(undefined)
                dispatch(NewTrialRequestAction({ page: loadMoreData }))
            } else if(Object.keys(requestStatusSelector.error).length > 0 && !requestStatusSelector.loading){
                toast.error(requestStatusSelector.error.message, { theme: "colored" });
                setClickStatusApprove(false)
                setClickStatusReject(false)
            }
        }
    }, [clickStatusApprove, clickStatusReject, requestStatusSelector])

    console.log("clickStatusReject, clickStatusApprove", clickStatusReject, clickStatusApprove)

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>New Trial Request</h1>
                    </div>

                    <table className='patient-list-table'>
                        <thead>
                            <tr>
                                <th align='center'>#</th>
                                <th>Clinic Details</th>
                                <th>Trial for</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newRequestSelector !== undefined ?
                                newRequestSelector.data.data?.length !== 0 ?
                                    newRequestSelector.data.data.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className='patient-img'>
                                                        <img src={value.trial_clinic_user_info.listing_image !== null ? getImageUrl() + value.trial_clinic_user_info.listing_image : "/images/placeholder-img.jpg"} alt={value.trial_clinic_user_info.clinic_name} />
                                                    </div>
                                                </td>
                                                <td>
                                                    {value.trial_clinic_user_info !== null &&
                                                        <>
                                                            <h2> {value.trial_clinic_user_info.clinic_name} </h2>
                                                            <p className='no-wrap'><strong>Phone Number :</strong> {value.trial_clinic_user_info.phone_number} </p>
                                                        </>
                                                    }
                                                </td>
                                                <td> {value.trial_clinic_user_info !== null && value.clinic_trial_info.trial_name} </td>
                                                <td>
                                                    {value.trial_clinic_user_info !== null &&
                                                        value.trial_clinic_user_info.address + ", " + value.trial_clinic_user_info.state_info.name
                                                    }
                                                </td>
                                                <td>
                                                    <div className='btn-group-custom auto-width'>
                                                        <button className="btn-action btn-green" onClick={() => TrialRequestDetailModalShow(value.id)}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                                        <Link to="/trial-sponsors/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="5">
                                            <NoDataFound />
                                        </td>
                                    </tr>
                                :
                                [1, 2, 3, 4].map((_, index) => {
                                    return (
                                        <tr className='bg-transparent'>
                                            <td className='p-0' colSpan="5">
                                                <div key={index}>
                                                    <Skeleton height={125} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    {newRequestSelector && newRequestSelector.data.total > 16 &&
                        <div className='col-12 mt-5 text-center'>
                            <Button
                                isButton="true"
                                BtnColor="primary"
                                BtnText="Load More"
                                onClick={handleLoadMore}
                                disabled={newRequestSelector.data.last_page === newRequestSelector.data.current_page || loadingSelector.loading}
                                hasSpinner={loadingSelector.loading}
                            />
                        </div>
                    }
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Request Details"
                onClick={handleClose}
                ModalData={
                    requestDetailData !== undefined ?
                        <>
                            <div className='appointment-detail' key={requestDetailData.id}>

                                <img src={requestDetailData.trial_clinic_user_info.listing_image !== null ? getImageUrl() + requestDetailData.trial_clinic_user_info.listing_image : "/images/placeholder-img.jpg"} alt={requestDetailData.trial_clinic_user_info.clinic_name} />

                                {requestDetailData.trial_clinic_user_info !== undefined &&
                                    <div>
                                        <h2> {requestDetailData.trial_clinic_user_info.clinic_name}</h2>
                                        <p className='mb-0'><strong>Phone Number :</strong> {requestDetailData.trial_clinic_user_info.phone_number} </p>
                                        <p className='mb-0'><strong>Address :</strong> {requestDetailData.trial_clinic_user_info.address}, {requestDetailData.trial_clinic_user_info.state_info.name}</p>
                                    </div>
                                }
                            </div>
                            {requestDetailData.clinic_trial_info !== undefined &&
                                <div className='appointment-detail-col'>
                                    <h2>Trial for </h2>
                                    <p> {requestDetailData.clinic_trial_info.trial_name} </p>
                                </div>
                            }

                            {requestDetailData.trial_clinic_user_info !== undefined &&
                                requestDetailData.trial_clinic_user_info.user_meta_info.hide_principal_investigator_details === 0 &&
                                <div className='appointment-detail-col'>
                                    <h2>Principal Investigator</h2>
                                    <p> {requestDetailData.trial_clinic_user_info.user_meta_info.principal_investigator_name} </p>
                                </div>
                            }

                            {requestDetailData.appointment_documents !== undefined &&
                                <div className='appointment-detail-col'>
                                    <h2>Document</h2>
                                    <div className='row mt-3'>
                                        {requestDetailData.appointment_documents.map((value, index) => {
                                            return (
                                                <div className='col-lg-6 mb-3' key={index}>
                                                    <img src={getImageUrl() + value.document} alt={requestDetailData.trial_clinic_user_info.clinic_name} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }

                            <div className='appointment-detail-col'>
                                <h2>Additional Information</h2>
                                <p> {requestDetailData.brief_intro} </p>
                            </div>


                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green"
                                    BtnText="Reject"
                                    onClick={() => handleRequestStatusUpdate(requestDetailData.id, "1")}
                                    disabled={clickStatusReject && requestStatusSelector.loading}
                                    hasSpinner={clickStatusReject && requestStatusSelector.loading}
                                />
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="primary"
                                    BtnText="Approve"
                                    onClick={() => handleRequestStatusUpdate(requestDetailData.id, "2")}
                                    disabled={clickStatusApprove && requestStatusSelector.loading}
                                    hasSpinner={clickStatusApprove && requestStatusSelector.loading}
                                />
                            </div>
                        </>
                        :
                        <LogoLoader />
                }
            />
        </>
    );
};

export default SponsorTrialRequests;
