import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';
import "react-datepicker/dist/react-datepicker.css";
import { TrialAppointmentClinicListAction, ViewTrialsAction } from '../../redux/actions/TrialSponsorAction';
import { useDispatch, useSelector } from 'react-redux';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';

const SponsorsAppointmentsClinics = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const trialAppClinicListSelector = useSelector(state => state.My_trials.trial_app_clinic_list.data)
    const appointmentDetailSelector = useSelector(state => state.My_trials.trial_detail.data)
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
        dispatch(ViewTrialsAction(id))
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
    console.log("appointmentDetail", appointmentDetail)

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
                                                    {/* , <br /> (09:00 AM to 11:00 AM)</td> */}
                                                </td>
                                                <td>
                                                    <div className='btn-group-custom'>
                                                        <button className="btn-action btn-green" onClick={() => handleAppointmentModalOpen(value.id)}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                                        <Link to="" className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></Link>
                                                        <Link to="/trial-sponsors/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
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
                                        <tr className='bg-transparent'>
                                            <td className='p-0' colSpan="6">
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
                                <img src="/images/sponsors-img.jpg" alt="clinic-img" />
                                <div className=''>
                                    <h2> {appointmentDetail.data.trial_name} </h2>
                                    {appointmentDetail.data.status === 1 && <span className='badge badge-primary d-inline-block mb-3'>Approved</span>}
                                    {/* <p className='mb-0'>Jan 25, 2022 (09:00 AM to 11:00 AM)</p> */}
                                    <p className='mb-0'>{moment(appointmentDetail.data.created_at).format("MMMM DD, YYYY")}</p>
                                </div>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Trial for </h2>
                                <p>Adolescents with ADHD and a Parent with Bipolar Disorder</p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Address </h2>
                                <p>Atlanta, Georgia, United States</p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Trial Compensation </h2>
                                <p>To be Decided by Company</p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Principal Investigator</h2>
                                <p>Dr Aikenhead</p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Document</h2>
                                <div className='row mt-3'>
                                    <div className='col-lg-6'>
                                        <img src="/images/document-img.jpg" alt="document" />
                                    </div>
                                    <div className='col-lg-6'>
                                        <img src="/images/document-img.jpg" alt="document" />
                                    </div>
                                </div>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Additional Information</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim, sit amet viverra lorem sagittis. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius. Ut vitae ex tincidunt urna sagittis ullamcorper ut congue elit. Etiam placerat turpis ligula, et lacinia nisl porttitor sed.</p>
                            </div>
                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isLink="true"
                                    URL="/trial-sponsors/patient-list"
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