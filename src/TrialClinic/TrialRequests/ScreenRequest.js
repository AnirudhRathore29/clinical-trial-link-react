import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../views/Components/Common/Buttons/Buttons';
import './TrialRequests.css'
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NewScreenTrialRequestListAction } from '../../redux/actions/TrialClinicAction';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const ClinicTrialScreenRequest = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loadingSelector = useSelector(state => state.trial_clinic)
    const newRequestSelector = useSelector(state => state.trial_clinic.new_screen_trial_request.data)

    const [loadMoreData, setLoadMoreData] = useState(1);

    useEffect(() => {
        dispatch(NewScreenTrialRequestListAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }

    const handleRedirectUser2Chat = (data) => {
        history.push({
            pathname: "/trial-clinic/my-chats",
            state: {
                full_name: data.patient_user_info.first_name + " " + data.patient_user_info.last_name,
                id: data.patient_user_info.id,
                profile_image: data.patient_user_info.profile_image,
            }
        })
    }

    const ScreenRequestDetails = (id) => {
        props.history.push(`/trial-clinic/screen-trial-request/${id}`)
    }

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Screen Trial Request</h1>
                    </div>

                    <table className='patient-list-table'>
                        <thead>
                            <tr>
                                <th align='center'>#</th>
                                <th>Patient Details</th>
                                <th>Trial for</th>
                                <th>Location</th>
                                {/* <th>Status</th> */}
                                <th>Date & Time</th>
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
                                                        <img src={value.patient_user_info.profile_image !== null ? value.patient_user_info.profile_image : "/images/profile-img1.jpg"} alt={value.patient_user_info.first_name} />
                                                    </div>
                                                </td>
                                                <td>
                                                    {value.patient_user_info !== null &&
                                                        <>
                                                            <h2> {value.patient_user_info.first_name} {value.patient_user_info.last_name} </h2>
                                                            <p className='no-wrap'>
                                                                <span><strong>Gender : </strong>
                                                                    {value.patient_user_info.gender === "M" ? "Male" 
                                                                        :
                                                                        value.patient_user_info.gender === "F" ? "Female"
                                                                        :
                                                                        "Nonbinary"
                                                                    }
                                                                </span>
                                                                <span><strong>DOB :</strong> {moment(value.patient_user_info.dob).format("MMMM DD, YYYY")} </span>
                                                            </p>
                                                            <p className='no-wrap'><strong>Phone Number :</strong> {value.patient_user_info.phone_number} </p>
                                                        </>
                                                    }
                                                </td>
                                                <td> {value.clinic_trial_info !== null && value.clinic_trial_info.trial_name} </td>
                                                <td> {value.patient_user_info !== null && value.patient_user_info.address + ", " + value.patient_user_info.state_info.name} </td>
                                                {/* <td> <span className='badge badge-primary d-inline-block'>Approved</span> </td> */}
                                                <td className='no-wrap'>{moment(value.appointment_date).format("MMMM DD, YYYY")}, <br />
                                                    ({value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to {value.trial_clinic_appointment_slot_info.booking_slot_info.to_time})
                                                </td>
                                                <td>
                                                    <div className='btn-group-custom'>
                                                        <button className="btn-action btn-primary" onClick={() => handleRedirectUser2Chat(value)}>
                                                            <box-icon name='message-rounded-dots' color="#ffffff"></box-icon>
                                                        </button>

                                                        <button className="btn-action btn-green" onClick={()=>ScreenRequestDetails(value.id)}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="6">
                                            <NoDataFound />
                                        </td>
                                    </tr>
                                :
                                [1, 2, 3, 4].map((_, index) => {
                                    return (
                                        <tr className='bg-transparent' key={index}>
                                            <td className='p-0' colSpan="6">
                                                <Skeleton height={125} />
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
        </>
    );
};

export default ClinicTrialScreenRequest;
