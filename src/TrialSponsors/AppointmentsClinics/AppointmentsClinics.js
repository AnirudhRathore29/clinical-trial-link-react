import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';
import "react-datepicker/dist/react-datepicker.css";
import { TrialAppointmentClinicListAction, TrialRequestDetailAction } from '../../redux/actions/TrialSponsorAction';
import { useDispatch, useSelector } from 'react-redux';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';

const SponsorsAppointmentsClinics = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams()
    const trialAppClinicListSelector = useSelector(state => state.My_trials.trial_app_clinic_list.data)
    const appointmentDetailSelector = useSelector(state => state.My_trials.new_request_detail.data)
    const isloading = useSelector(state => state.My_trials);


    const [loadMoreData, setLoadMoreData] = useState(1);
    /* popup show hide */
    const [show, setShow] = useState(false);
    const [appointmentDetail, setAppointmentDetail] = useState();


    useEffect(() => {
        dispatch(TrialAppointmentClinicListAction(id, { page: loadMoreData }))
    }, [dispatch, loadMoreData])

    useEffect(() => {
        setAppointmentDetail(appointmentDetailSelector)
    }, [appointmentDetailSelector]);

    const handleAppointmentModalOpen = (id) => {
        dispatch(TrialRequestDetailAction(id))
        setShow(true)
    };
    const handleClose = () => {
        setShow(false)
        setAppointmentDetail()
    };
    /* popup show hide */

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }

    const handleViewPatientDetail = (id) => {
        history.push(`/trial-sponsors/patient-list/${id}`)
    }

    const handleRedirectUser2Chat = (data) => {
        history.push({
            pathname: "/trial-sponsors/my-chats",
            state: data.trial_clinic_user_info
        })
    }

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Clinic List <span>Bipolar Depression Study with 6 Month Open Label Therapy</span></h1>
                    </div>

                    <table className='patient-list-table'>
                        <thead>
                            <tr>
                                <th align='center'>#</th>
                                <th>Clinic Name</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trialAppClinicListSelector !== undefined ?
                                trialAppClinicListSelector.data.data?.length !== 0 ?
                                    trialAppClinicListSelector.data.data.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className='patient-img'>
                                                        <img src={value.trial_clinic_user_info.listing_image !== null ? value.trial_clinic_user_info.listing_image : "/images/placeholder-img.jpg"} alt={value.trial_clinic_user_info.clinic_name} />
                                                    </div>
                                                </td>
                                                <td> <h2> {value.trial_clinic_user_info !== null && value.trial_clinic_user_info.clinic_name} </h2></td>
                                                <td> {value.status === 1 && <span className='badge badge-primary d-inline-block mb-3'>Approved</span>} </td>
                                                <td>
                                                    {value.trial_clinic_user_info !== null && value.trial_clinic_user_info.address + ", " + value.trial_clinic_user_info.state_info.name}
                                                </td>
                                                <td className='no-wrap'>
                                                    {moment(value.updated_date).format("MMMM DD, YYYY")}
                                                </td>
                                                <td>
                                                    <div className='btn-group-custom'>
                                                        <button className="btn-action btn-green" onClick={() => handleAppointmentModalOpen(value.id)}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>

                                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>

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

                    {trialAppClinicListSelector && trialAppClinicListSelector.data.total > 16 &&
                        <div className='col-12 mt-5 text-center'>
                            <Button
                                isButton="true"
                                BtnColor="primary"
                                BtnText="Load More"
                                onClick={handleLoadMore}
                                disabled={trialAppClinicListSelector.data.last_page === trialAppClinicListSelector.data.current_page || isloading.loading}
                                hasSpinner={isloading.loading}
                            />
                        </div>
                    }
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Appointment Details"
                onClick={handleClose}
                ModalData={
                    appointmentDetail !== undefined ?
                        <>
                            <div className='appointment-detail'>
                                <img src={appointmentDetail.data.trial_clinic_user_info.listing_image !== null ? appointmentDetail.data.trial_clinic_user_info.listing_image : "/images/placeholder-img.jpg"} alt={appointmentDetail.data.trial_clinic_user_info.clinic_name} />

                                <div>
                                    <h2> {appointmentDetail.data.trial_clinic_user_info !== undefined && appointmentDetail.data.trial_clinic_user_info.clinic_name} </h2>
                                    {appointmentDetail.data.status === 1 && <span className='badge badge-primary d-inline-block mb-3'>Approved</span>}
                                    <p className='mb-0'>{moment(appointmentDetail.data.approved_date).format("MMMM DD, YYYY")}</p>
                                </div>
                            </div>

                            {appointmentDetail.data.clinic_trial_info !== undefined &&
                                <div className='appointment-detail-col'>
                                    <h2>Trial for </h2>
                                    <p> {appointmentDetail.data.clinic_trial_info.trial_name}</p>
                                </div>
                            }

                            {appointmentDetail.data.trial_clinic_user_info !== undefined &&
                                <div className='appointment-detail-col'>
                                    <h2>Address </h2>
                                    <p> {appointmentDetail.data.trial_clinic_user_info.address}, {appointmentDetail.data.trial_clinic_user_info.state_info.name} </p>
                                </div>
                            }

                            {appointmentDetail.data.clinic_trial_info !== undefined &&
                                <div className='appointment-detail-col'>
                                    <h2>Trial Compensation </h2>
                                    <p> {appointmentDetail.data.clinic_trial_info.compensation} </p>
                                </div>
                            }

                            {appointmentDetail.data.trial_clinic_user_info !== undefined &&
                                appointmentDetail.data.trial_clinic_user_info.user_meta_info.hide_principal_investigator_details === 0 &&
                                <div className='appointment-detail-col'>
                                    <h2>Principal Investigator</h2>
                                    <p> {appointmentDetail.data.trial_clinic_user_info.user_meta_info.principal_investigator_name ? appointmentDetail.data.trial_clinic_user_info.user_meta_info.principal_investigator_name : "-"} </p>
                                </div>
                            }

                            {appointmentDetail.data.appointment_documents?.length > 0 &&
                                <div className='appointment-detail-col'>
                                    <h2>Document</h2>
                                    <div className='row mt-3'>
                                        {appointmentDetail.data.appointment_documents.map((value, index) => {
                                            return (
                                                <div className='col-lg-6 mb-3' key={index}>
                                                    <img src={value.document} alt={appointmentDetail.data.trial_clinic_user_info.clinic_name} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }

                            <div className='appointment-detail-col'>
                                <h2>Additional Information</h2>
                                <p> {appointmentDetail.data.brief_intro} </p>
                            </div>

                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isButton="true"
                                    BtnType="button"
                                    onClick={() => handleViewPatientDetail(appointmentDetail.data.id)}
                                    BtnColor="primary"
                                    BtnText="View All Patients List"
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

export default SponsorsAppointmentsClinics;