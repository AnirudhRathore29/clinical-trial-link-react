import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../views/Components/Common/Buttons/Buttons';
import { InputText, SelectBox } from '../../views/Components/Common/Inputs/Inputs';
import PatientListBx from '../../views/Components/PatientListBx/PatientListBx';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import '../../Patient/ClinicListing/ClinicListing.css';
import '../../Patient/MyAppointments/MyAppointments.css';
import { TrialManageClinicsListAction, TrialRequestDetailAction } from '../../redux/actions/TrialSponsorAction';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';

const SponsorsManageClinics = () => {
    const dispatch = useDispatch();
    const trialManageClinicSelector = useSelector(state => state.My_trials.manage_clinic.data)
    const clinicDetailSelector = useSelector(state => state.My_trials.new_request_detail.data)
    const isloading = useSelector(state => state.My_trials);

    const [show, setShow] = useState(false);
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [clinicDetail, setClinicDetail] = useState();

    useEffect(() => {
        dispatch(TrialManageClinicsListAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    useEffect(() => {
        setClinicDetail(clinicDetailSelector)
    }, [clinicDetailSelector]);

    const handleClinicDetailModalOpen = (id) => {
        dispatch(TrialRequestDetailAction(id))
        setShow(true)
    };

    const handleClose = () => {
        setShow(false)
        setClinicDetail()
    };

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }
    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Manage Clinics</h1>
                        <Button
                            isButton="true"
                            BtnColor="green btn-sm"
                            BtnText="Download"
                        />
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className="filter-sidebar">
                                <h2>Filter</h2>
                                <InputText
                                    type="text"
                                    labelText="Clinic Name"
                                    placeholder="Enter Clinic Name"
                                />
                                <SelectBox
                                    name="specialty"
                                    labelText="Specialty"
                                    optionData={
                                        <>
                                            <option>Select Specialty</option>
                                            <option>Specialty 1</option>
                                            <option>Specialty 2</option>
                                        </>
                                    }
                                />
                                <SelectBox
                                    name="condition"
                                    labelText="Condition"
                                    optionData={
                                        <>
                                            <option>Select Condition</option>
                                            <option>Condition 1</option>
                                            <option>Condition 2</option>
                                        </>
                                    }
                                />
                                <InputText type="search" labelText="Keywords" placeholder="Enter Keywords" />
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Apply"
                                />
                            </div>
                        </div>

                        <div className='col-lg-8'>
                            <div className='row'>
                                {trialManageClinicSelector !== undefined ?
                                    trialManageClinicSelector.data.data?.length !== 0 ?
                                        trialManageClinicSelector.data.data.map((value, index) => {
                                            return (
                                                <div className='col-lg-6' key={index}>
                                                    <PatientListBx
                                                        imgUrl={value.trial_clinic_user_info.listing_image}
                                                        patientName={value.trial_clinic_user_info.clinic_name}
                                                        status={value.status === 1 ? "Approved" : value.status === 2 ? "Cancelled" : "Completed"}
                                                        statusClass={value.status === 1 ? "primary" : value.status === 2 ? "danger" : "success"}
                                                        description={value.clinic_trial_info.trial_name}
                                                        onClick={() => handleClinicDetailModalOpen(value.id)}
                                                    />
                                                </div>
                                            )
                                        })
                                        :
                                        <div className='col-12'>
                                            <NoDataFound />
                                        </div>
                                    :
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                                        return (
                                            <div className='col-lg-6 mb-4' key={index}>
                                                <Skeleton height={125} />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className='mt-5 text-center'>
                                {trialManageClinicSelector && trialManageClinicSelector.data.total > 16 &&
                                    <div className='col-12 mt-5 text-center'>
                                        <Button
                                            isButton="true"
                                            BtnColor="primary"
                                            BtnText="Load More"
                                            onClick={handleLoadMore}
                                            disabled={trialManageClinicSelector.data.last_page === trialManageClinicSelector.data.current_page || isloading.loading}
                                            hasSpinner={isloading.loading}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Clinics Details"
                onClick={handleClose}
                ModalData={
                    clinicDetail !== undefined ?
                        <>
                            <PatientListBx
                                imgUrl={clinicDetail.data.trial_clinic_user_info.listing_image !== null ? clinicDetail.data.trial_clinic_user_info.listing_image : "/images/placeholder-img.jpg"}
                                patientName={clinicDetail.data.trial_clinic_user_info.clinic_name}
                                status={clinicDetail.data.status === 1 ? "Approved" : clinicDetail.data.status === 2 ? "Cancelled" : "Completed"}
                                statusClass={clinicDetail.data.status === 1 ? "primary" : clinicDetail.data.status === 2 ? "danger" : "success"}
                                description={clinicDetail.data.clinic_trial_info.trial_name}
                            />

                            <div className='appointment-detail-col'>
                                <h2>Phone Number </h2>
                                <p> {clinicDetail.data.trial_clinic_user_info.phone_number} </p>
                            </div>

                            <div className='appointment-detail-col'>
                                <h2>Address </h2>
                                <p> {clinicDetail.data.trial_clinic_user_info.address}, {clinicDetail.data.trial_clinic_user_info.state_info.name} </p>
                            </div>

                            {clinicDetail.data.appointment_documents?.length > 0 &&
                                <div className='appointment-detail-col'>
                                    <h2>Document</h2>
                                    <div className='row mt-3'>
                                        {clinicDetail.data.appointment_documents.map((value, index) => {
                                            return (
                                                <div className='col-lg-6 mb-3' key={index}>
                                                    <img src={value.document} alt={clinicDetail.data.trial_clinic_user_info.clinic_name} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }

                            <div className='appointment-detail-col'>
                                <h2>Additional Information</h2>
                                <p>{clinicDetail.data.brief_intro}</p>
                            </div>
                        </>
                        :
                        <LogoLoader />
                }
            />
        </>
    );
};

export default SponsorsManageClinics;
