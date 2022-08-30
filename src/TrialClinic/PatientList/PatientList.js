import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import '../../views/Components/Common/Buttons/Buttons.css'
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { TrialPatientListAction } from '../../redux/actions/TrialClinicAction';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Button from '../../views/Components/Common/Buttons/Buttons';

const ClinicPatientList = () => {
    const loadingSelector = useSelector(state => state.trial_clinic)
    const PatientListSelector = useSelector(state => state.trial_clinic.new_trial_request.data)

    const [loadMoreData, setLoadMoreData] = useState(1);

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    console.log("PatientListSelector", PatientListSelector);
    console.log("id", id);

    useEffect(() => {
        dispatch(TrialPatientListAction({ page: loadMoreData,  trial_clinic_appointment_id: id }))
    }, [dispatch])

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

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Patient List <span>{PatientListSelector && PatientListSelector.trialName}</span></h1>
                    </div>

                    <table className='patient-list-table'>
                        <thead>
                            <tr>
                                <th align='center'>#</th>
                                <th>Patient Name</th>
                                <th>Status</th>
                                <th>Visit Number</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PatientListSelector !== undefined ?
                                PatientListSelector.data.data?.length !== 0 ?
                                    PatientListSelector.data.data.map((value, index) => {
                                        console.log("value", value)
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className='patient-img'>
                                                        <img src={value.patient_user_info.profile_image !== null ? value.patient_user_info.profile_image : "/images/placeholder-img.jpg"} alt={value.patient_user_info.first_name} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <h2>{value.patient_user_info.first_name + ' ' +  value.patient_user_info.last_name}</h2>
                                                </td>
                                                <td>
                                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                                </td>
                                                <td>
                                                    <strong>{value.visit_number}</strong>
                                                </td>
                                                <td>{value.patient_user_info.address}, {value.patient_user_info.state_info.name}</td>
                                                <td className='no-wrap'>{value.appointment_date} <br /> {value.trial_clinic_appointment_slot_info.booking_slot_info.from_time + ' to ' + value.trial_clinic_appointment_slot_info.booking_slot_info.to_time}</td>
                                                <td>
                                                    <div className='btn-group-custom'>
                                                        <Link to="/trial-clinic/appointments/25" className="btn-action btn-green"><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></Link>
                                                        <a href={`tel:${value.patient_user_info.phone_number}`} className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></a>
                                                        <button className="btn-action btn-primary" onClick={() => handleRedirectUser2Chat(value)}>
                                                            <box-icon name='message-rounded-dots' color="#ffffff"></box-icon>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="7">
                                            <NoDataFound />
                                        </td>
                                    </tr>
                                :
                                [1, 2, 3, 4].map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td colSpan="7" className='p-0'><Skeleton height={100} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    {PatientListSelector && PatientListSelector.data.data.total > 0 &&
                        <div className='col-12 mt-5 text-center'>
                            <Button
                                isButton="true"
                                BtnColor="primary"
                                BtnText="Load More"
                                onClick={handleLoadMore}
                                disabled={PatientListSelector.data.last_page === PatientListSelector.data.current_page || loadingSelector.loading}
                                hasSpinner={loadingSelector.loading}
                            />
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default ClinicPatientList;
