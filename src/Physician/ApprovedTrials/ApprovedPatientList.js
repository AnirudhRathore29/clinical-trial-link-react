import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import '../../views/Components/Common/Buttons/Buttons.css'
import '../../Patient/Dashboard/Dashboard.css';
import '../../TrialClinic/TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Button from '../../views/Components/Common/Buttons/Buttons';
import { ApprovedPatientDetailAction, ApprovedPatientListAction } from '../../redux/actions/PhysicianAction';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import PatientListBx from '../../views/Components/PatientListBx/PatientListBx';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';

const ApprovedPatientList = () => {
    const loadingSelector = useSelector(state => state.trial_clinic)
    const PatientListSelector = useSelector(state => state.trial_clinic.new_trial_request.data)
    const ManagePatientDetailSelector = useSelector(state => state.trial_clinic.manage_patient_detail.data)

    const [loadMoreData, setLoadMoreData] = useState(1);
    const [PatientDetailModal, SetPatientDetailModal] = useState(false);
    const [PatientDetailState, setPatientDetailState] = useState(undefined);

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    console.log("PatientListSelector", PatientListSelector);
    console.log("id", id);

    const SetPatientDetailModalShow = (id) => {
        SetPatientDetailModal(true);
        dispatch(ApprovedPatientDetailAction(id))
    }
    const SetPatientDetailModalClose = () => {
        setPatientDetailState()
        SetPatientDetailModal(false);
    }

    useEffect(() => {
        setPatientDetailState(ManagePatientDetailSelector)
    }, [ManagePatientDetailSelector])

    useEffect(() => {
        dispatch(ApprovedPatientListAction({ page: loadMoreData, clinic_trial_id: id }))
    }, [dispatch])

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }

    const handleRedirectUser2Chat = (data) => {
        history.push({
            pathname: "/physician/my-chats",
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
                                                    <h2>{value.patient_user_info.first_name + ' ' + value.patient_user_info.last_name}</h2>
                                                </td>
                                                <td>
                                                    {
                                                        value.status === 0 ? <span className='badge badge-primary d-inline-block mb-3'>Pending</span> :
                                                            value.status === 1 ? <span className='badge badge-primary d-inline-block mb-3'>Screening</span> :
                                                                value.status === 2 ? <span className='badge badge-danger d-inline-block mb-3'>Rejected</span> :
                                                                    value.status === 3 ? <span className='badge badge-danger d-inline-block mb-3'>Cancelled by patient</span> :
                                                                        value.status === 4 ? <span className='badge badge-danger d-inline-block mb-3'>Screen Not eligible</span> :
                                                                            value.status === 5 ? <span className='badge badge-primary d-inline-block mb-3'>Screen Pending approval</span> :
                                                                                value.status === 6 ? <span className='badge badge-primary d-inline-block mb-3'>Screening Approved</span> :
                                                                                    value.status === 7 ? <span className='badge badge-success d-inline-block mb-3'>Complete</span> :
                                                                                        value.status === 8 ? <span className='badge badge-danger d-inline-block mb-3'>Incomplete</span> :
                                                                                            value.status === 9 ? <span className='badge badge-success d-inline-block mb-3'>End of Study</span> :
                                                                                                value.status === 10 ? <span className='badge badge-danger d-inline-block mb-3'>Early Termination</span> :
                                                                                                    null
                                                    }
                                                </td>
                                                <td>
                                                    <strong>{value.visit_number}</strong>
                                                </td>
                                                <td>{value.patient_user_info.address}, {value.patient_user_info.state_info.name}</td>
                                                <td className='no-wrap'>{value.appointment_date} <br /> {value.trial_clinic_appointment_slot_info.booking_slot_info.from_time + ' to ' + value.trial_clinic_appointment_slot_info.booking_slot_info.to_time}</td>
                                                <td>
                                                    <div className='btn-group-custom'>
                                                        <button onClick={() => SetPatientDetailModalShow(value.id)}className="btn-action btn-green"><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
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

            <CommonModal className="custom-size-modal" show={PatientDetailModal} onHide={SetPatientDetailModalClose} keyboard={false}
                ModalTitle="Patient Details"
                onClick={SetPatientDetailModalClose}
                ModalData={
                    PatientDetailState !== undefined ?
                        <>
                            <PatientListBx
                                imgUrl={PatientDetailState.data.patient_user_info.profile_image}
                                patientName={`${PatientDetailState.data.patient_user_info.first_name} ${PatientDetailState.data.patient_user_info.last_name}`}
                                statusClass={
                                    PatientDetailState.data.status === 0 || PatientDetailState.data.status === 1 || PatientDetailState.data.status === 6 || PatientDetailState.data.status === 5 ? "primary" :
                                        PatientDetailState.data.status === 2 || PatientDetailState.data.status === 3 || PatientDetailState.data.status === 4 || PatientDetailState.data.status === 9 || PatientDetailState.data.status === 8 || PatientDetailState.data.status === 10 ? "danger" :
                                            PatientDetailState.data.status === 7 ? "success" : null
                                }
                                status={
                                    PatientDetailState.data.status === 0 ? "Pending" :
                                        PatientDetailState.data.status === 1 ? "Screening" :
                                            PatientDetailState.data.status === 2 ? "Rejected" :
                                                PatientDetailState.data.status === 3 ? "Cancelled" :
                                                    PatientDetailState.data.status === 4 ? "Not eligible" :
                                                        PatientDetailState.data.status === 5 ? "Screening Pending Approval" :
                                                            PatientDetailState.data.status === 6 ? "Screen Approved" :
                                                                PatientDetailState.data.status === 7 ? "Complete" :
                                                                    PatientDetailState.data.status === 8 ? "Incomplete" :
                                                                        PatientDetailState.data.status === 9 ? "End of study" :
                                                                            PatientDetailState.data.status === 10 ? "Early Terminated" : null
                                }
                                description={PatientDetailState.data.clinic_trial_info.trial_name}
                            />
                            <div className='row patient-detail-row'>
                                <div className='col-lg-6'>
                                    <div>
                                        <h4>Phone Number</h4>
                                        <h2>{PatientDetailState.data.patient_user_info.phone_number}</h2>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div>
                                        <h4>Gender</h4>
                                        <h2>
                                            {
                                                PatientDetailState.data.patient_user_info.gender === "F" ? "Female"
                                                    :
                                                    PatientDetailState.data.patient_user_info.gender === "M" ? "Male"
                                                        :
                                                        "Non Binary"
                                            }
                                        </h2>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div>
                                        <h4>State</h4>
                                        <h2>{PatientDetailState.data.patient_user_info.state_info.name}</h2>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div>
                                        <h4>Zip Code</h4>
                                        <h2>{PatientDetailState.data.patient_user_info.zip_code}</h2>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div>
                                        <h4>Date Of Birth</h4>
                                        <h2>{PatientDetailState.data.patient_user_info.dob}</h2>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div>
                                        <h4>Race</h4>
                                        <h2>{PatientDetailState.data.patient_user_info.user_meta_info.race}</h2>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div>
                                        <h4>Trials for</h4>
                                        <h2>{PatientDetailState.data.patient_user_info.user_meta_info.trials_for}</h2>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div>
                                        <h4>Seeking Trials for</h4>
                                        <ul className='condition-ul'>
                                            {PatientDetailState.data.seeking_trials_for_array !== undefined && PatientDetailState.data.seeking_trials_for_array.map((value, index) => {
                                                return (
                                                    <li key={index}>{value}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div>
                                        <h4>Condition</h4>
                                        <ul className='condition-ul'>
                                            {PatientDetailState.data.conditions_array !== undefined && PatientDetailState.data.conditions_array.map((value, index) => {
                                                return (
                                                    <li key={index}>{value}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isLink="true"
                                    URL={`/physician/patient-visits/${PatientDetailState.data.id}`}
                                    BtnColor="green"
                                    BtnText="View All Visits"
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

export default ApprovedPatientList;
