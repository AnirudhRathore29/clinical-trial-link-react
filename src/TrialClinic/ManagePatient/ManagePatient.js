import { useEffect, useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import { InputText, SelectBox } from '../../views/Components/Common/Inputs/Inputs';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import PatientListBx from '../../views/Components/PatientListBx/PatientListBx';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import PatientDetail from '../../views/Components/PatientDetail/PatientDetail';
import '../../Patient/ClinicListing/ClinicListing.css';
import { ManagePatientDetailAction, ManagePatientListAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';

const ClinicManagePatient = () => {
    const loadingSelector = useSelector(state => state.trial_clinic)
    const ManagePatientListSelector = useSelector(state => state.trial_clinic.manage_patient_list.data)
    const ManagePatientDetailSelector = useSelector(state => state.trial_clinic.manage_patient_detail.data)

    const [PatientDetailModal, SetPatientDetailModal] = useState(false);
    const [PatientDetailState, setPatientDetailState] = useState(undefined);
    const [loadMoreData, setLoadMoreData] = useState(1);

    const dispatch = useDispatch()

    console.log("ManagePatientListSelector", ManagePatientListSelector);
    console.log("ManagePatientDetailSelector", ManagePatientDetailSelector);
    console.log("PatientDetailState", PatientDetailState);

    useEffect(() => {
        dispatch(ManagePatientListAction({ page: loadMoreData, }))
    }, [dispatch])

    useEffect(() => {
        setPatientDetailState(ManagePatientDetailSelector)
    }, [ManagePatientDetailSelector])

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }

    const SetPatientDetailModalShow = (id) => {
        SetPatientDetailModal(true);
        dispatch(ManagePatientDetailAction(id))
    }
    const SetPatientDetailModalClose = () => {
        setPatientDetailState()
        SetPatientDetailModal(false);
    }

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Manage Patient</h1>
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
                                <div className='form-group'>
                                    <label>Age Range</label>
                                    <div className='age-range'>
                                        <div className='age-range-bix'>
                                            <span>Min</span>
                                            <InputText type="number" placeholder="Min Age" min="18" />
                                        </div>
                                        <div className='p-3'>-</div>
                                        <div className='age-range-bix'>
                                            <span>Max</span>
                                            <InputText type="number" placeholder="Max Age" max="60" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Male" defaultChecked="true" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Female" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Nonbinary" />
                                    </div>
                                </div>
                                <SelectBox
                                    name="trial_name"
                                    labelText="Trial Name"
                                    optionData={
                                        <>
                                            <option>Select Trial Name</option>
                                            <option>Trial Name 1</option>
                                            <option>Trial Name 2</option>
                                        </>
                                    }
                                />
                                <SelectBox
                                    name="trial_name"
                                    labelText="Trial Status"
                                    optionData={
                                        <>
                                            <option>Select Trial Name</option>
                                            <option>Trial Name 1</option>
                                            <option>Trial Name 2</option>
                                        </>
                                    }
                                />
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
                                {ManagePatientListSelector !== undefined ?
                                    ManagePatientListSelector.data.data?.length !== 0 ?
                                        ManagePatientListSelector.data.data.map((value, index) => {
                                            console.log("value", value)
                                            return (
                                                <div className='col-lg-6' key={index}>
                                                    <PatientListBx
                                                        imgUrl={value.patient_user_info.profile_image}
                                                        patientName={`${value.patient_user_info.first_name} ${value.patient_user_info.last_name}`}
                                                        statusClass={
                                                            value.status === 0 || value.status === 1 || value.status === 6 || value.status === 5 ? "primary" :
                                                                value.status === 2 || value.status === 3 || value.status === 4 || value.status === 8 || value.status === 9 || value.status === 10 ? "danger" :
                                                                    value.status === 7 ? "success" : null
                                                        }
                                                        status={
                                                            value.status === 0 ? "Pending" :
                                                                value.status === 1 ? "Screening" :
                                                                    value.status === 2 ? "Rejected" :
                                                                        value.status === 3 ? "Cancelled" :
                                                                            value.status === 4 ? "Not eligible" :
                                                                                value.status === 5 ? "Screening Pending Approval" :
                                                                                    value.status === 6 ? "Screen Approved" :
                                                                                        value.status === 7 ? "Complete" :
                                                                                            value.status === 8 ? "Incomplete" :
                                                                                                value.status === 9 ? "End of study" :
                                                                                                    value.status === 10 ? "Early Terminated" : null
                                                        }
                                                        description={value.clinic_trial_info.trial_name}
                                                        onClick={() => SetPatientDetailModalShow(value.id)}
                                                    />
                                                </div>
                                            )
                                        })
                                        :
                                        <div className='col-12'>
                                            <NoDataFound />
                                        </div>
                                    :
                                    [1, 2, 3, 4].map((value, index) => {
                                        return (
                                            <div className='col-lg-6 mb-3' key={index}>
                                                <Skeleton height={100} />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {ManagePatientListSelector && ManagePatientListSelector.data.data.total > 0 &&
                                <div className='mt-5 text-center'>
                                    <Button
                                        isButton="true"
                                        BtnColor="primary"
                                        BtnText="Load More"
                                        onClick={handleLoadMore}
                                        disabled={ManagePatientListSelector.data.last_page === ManagePatientListSelector.data.current_page || loadingSelector.loading}
                                        hasSpinner={loadingSelector.loading}
                                    />
                                </div>
                            }
                        </div>
                    </div>
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
                                <div className='col-lg-6'>
                                    <div>
                                        <h4>Race</h4>
                                        <h2>{PatientDetailState.data.patient_user_info.user_meta_info.race}</h2>
                                    </div>
                                </div>
                            </div>
                            {PatientDetailState.data.patient_user_info.physician_fname &&
                                <div className='invite-col'>
                                    <h2>Primary Physician Details</h2>
                                    <div className='invite-col-inner'>
                                        <div className='doctor-img'>
                                            <img src="/images/placeholder-img.jpg" alt={PatientDetailState.data.patient_user_info.physician_fname} />
                                        </div>
                                        <div className='doctor-detail'>
                                            <div>
                                                <h2>{PatientDetailState.data.patient_user_info.physician_fname} {PatientDetailState.data.patient_user_info.physician_lname}</h2>
                                                <p>{PatientDetailState.data.patient_user_info.physician_phone_number}</p>
                                            </div>
                                            <div>
                                                <Button
                                                    isButton="true"
                                                    BtnColor="primary btn-sm"
                                                    BtnText="Invite"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isLink="true"
                                    URL={`/trial-clinic/patient-visits/${PatientDetailState.data.id}`}
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

export default ClinicManagePatient;
