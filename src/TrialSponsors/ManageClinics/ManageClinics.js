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
import getCurrentHost from '../../redux/constants';
import { authHeader } from '../../redux/actions/authHeader';
import { MultiSelect } from "react-multi-select-component";
import { Form } from 'react-bootstrap';
import { Download } from '../../views/Components/Common/Download/Download';

const SponsorsManageClinics = () => {
    const dispatch = useDispatch();
    const trialManageClinicSelector = useSelector(state => state.My_trials.manage_clinic.data)
    const clinicDetailSelector = useSelector(state => state.My_trials.new_request_detail.data)
    const isloading = useSelector(state => state.My_trials);

    const [show, setShow] = useState(false);
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [Loading, setLoading] = useState(true);
    const [clinicDetail, setClinicDetail] = useState();
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [DownloadDocData, setDownloadDocData] = useState({});
    const [specialitySelected, setSpecialitySelected] = useState({
        specialities: [],
        conditions: []
    });
    const [formData, setFormData] = useState({
        speciality_ids: [],
        conditions: []
    });

    console.log("specialityList", specialityList !== undefined && specialityList);
    console.log("conditionList", conditionList !== undefined && conditionList);
    console.log("formData", formData);
    console.log("specialitySelected", specialitySelected);

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

    const onchange = (e) => {
        const { name, value } = e.target
        setFormData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    useEffect(() => {
        const configure = {
            method: 'GET',
            headers: authHeader()
        }
        fetch(getCurrentHost() + "/get-user-specialitites", configure)
            .then(response => response.json())
            .then(response => {
                let data = response.data

                for (var i = 0; i < data.length; i++) {
                    const object = Object.assign({}, data[i])
                    object.label = data[i].speciality_info.speciality_title;
                    object.value = data[i].speciality_info.id;
                    setSpecialityList((preValue) => [...preValue, object])
                }
            })
    }, [])

    const getCondition = (specialities) => {
        const configure = {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify(specialities)
        };
        return fetch(getCurrentHost() + "/get-user-conditions", configure)
            .then(response => response.json())
            .then(response => {
                const data = response.data

                for (var i = 0; i < data.length; i++) {
                    const object = Object.assign({}, data[i])
                    object.label = data[i].condition_info.condition_title;
                    object.value = data[i].condition_info.id;
                    setConditionList((preValue) => [...preValue, object])
                }
            })
    }

    const specialityOnchange = (data) => {
        const id = data.map((value) => value.speciality_info.id)
        setFormData({ ...formData, specialities: id, conditions: [] })
        setSpecialitySelected({...specialitySelected, specialities: data, conditions: [] })
        const updatedData = {
            speciality_ids: id
        }
        setConditionList([])
        getCondition(updatedData)
    }

    const conditionsOnchange = (data) => {
        const id = data.map((value) => value.condition_info.id)
        setFormData({ ...formData, conditions: id })
        setSpecialitySelected({ ...specialitySelected, conditions: data })
    }

    const applyFilterHandle = (e) => {
        e.preventDefault()
        setDownloadDocData(formData)
        dispatch(TrialManageClinicsListAction({ page: loadMoreData, ...formData }))
    }
    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Manage Clinics</h1>
                        <Download
                            apiUrl="/sponsor/export-manage-clinics-list"
                            apiParameters={DownloadDocData}
                        />
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className="filter-sidebar">
                                <h2>Filter</h2>
                                <Form onSubmit={applyFilterHandle}>

                                    <InputText
                                        type="text"
                                        labelText="Clinic Name"
                                        placeholder="Enter Clinic Name"
                                        name="clinic_name"
                                        onChange={onchange}
                                    />
                                    <div className="form-group">
                                        <label> Specialty</label>
                                        <MultiSelect
                                            options={specialityList !== undefined && specialityList}
                                            value={specialitySelected.specialities}
                                            onChange={specialityOnchange}
                                            disableSearch={true}
                                            labelledBy="Specialty"
                                            className="multiSelect-control"
                                            name="specialities"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Condition</label>
                                        <MultiSelect
                                            options={conditionList !== undefined && conditionList}
                                            value={specialitySelected.conditions}
                                            onChange={conditionsOnchange}
                                            disableSearch={true}
                                            labelledBy="Condition"
                                            className="multiSelect-control"
                                            name="conditions"
                                        />
                                    </div>
                                    <InputText
                                        type="search"
                                        labelText="Keywords"
                                        placeholder="Enter Keywords"
                                        name="keywords"
                                        onChange={onchange}
                                    />
                                    <Button
                                        isButton="true"
                                        BtnType="submit"
                                        BtnColor="green w-100"
                                        BtnText="Apply"
                                        onClick={() => setLoading(false)}
                                        disabled={!Loading && isloading.loading}
                                        hasSpinner={!Loading && isloading.loading}
                                    />
                                </Form>
                            </div>
                        </div>

                        <div className='col-lg-8'>
                            <div className='row'>
                                {console.log("trialManageClinicSelector", trialManageClinicSelector)}
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
                                            onClick={() => {handleLoadMore()
                                                setLoading(true)}
                                            }
                                            disabled={trialManageClinicSelector.data.last_page === trialManageClinicSelector.data.current_page || isloading.loading}
                                            hasSpinner={Loading && isloading.loading}
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
                                            const docName = value.real_doc_name.split(".")
                                            return (
                                                <div className='col-lg-6 mb-3' key={index}>
                                                    <a href={value.document} className='downloadDoc' download target="_blank">
                                                        <p><span>{docName[0]}</span>.{docName[1]}</p>
                                                        <box-icon type='solid' name='download'></box-icon>
                                                    </a>
                                                    {/* <img src={value.document} alt={requestDetailData.trial_clinic_user_info.clinic_name} /> */}
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
