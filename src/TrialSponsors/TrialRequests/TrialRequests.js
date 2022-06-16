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
import { NewTrialRequestAction } from '../../redux/actions/TrialSponsorAction';
import { getImageUrl } from '../../redux/constants';

const SponsorTrialRequests = () => {
    const dispatch = useDispatch();
    const loadingSelector = useSelector(state => state.My_trials)
    const newRequestSelector = useSelector(state => state.My_trials.new_request.data)

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [loadMoreData, setLoadMoreData] = useState(1);

    useEffect(() => {
        dispatch(NewTrialRequestAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    console.log("newRequestSelector", newRequestSelector)

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }

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
                                                        <button className="btn-action btn-green" onClick={handleShow}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
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
                    <>
                        <div className='appointment-detail'>
                            <img src="/images/sponsors-img.jpg" alt="clinic-img" />
                            <div className=''>
                                <h2>Barnes Jewish Hospital</h2>
                                <p className='mb-0'><strong>Phone Number :</strong> +01 919 719 2505</p>
                                <p className='mb-0'><strong>Address :</strong> Atlanta, Georgia, United States</p>
                            </div>
                        </div>
                        <div className='appointment-detail-col'>
                            <h2>Trial for </h2>
                            <p>Adolescents with ADHD and a Parent with Bipolar Disorder</p>
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
                                isButton="true"
                                BtnType="submit"
                                BtnColor="green"
                                BtnText="Reject"
                                onClick={handleClose}
                            />
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary"
                                BtnText="Approve"
                                onClick={handleClose}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default SponsorTrialRequests;
