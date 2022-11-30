import { useEffect, useState } from 'react';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import { InputText, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import { useSelector, useDispatch } from 'react-redux'
import { ListTrials, ViewTrialsAction, CreateTrialsAction, SendTrialInvitation, TrialRecruitingUpdateAction } from '../../redux/actions/TrialSponsorAction';
import moment from 'moment';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import { Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '../../Patient/MyFavorites/MyFavorites.css';

const SponsorsTrials = () => {
    const dispatch = useDispatch()
    const trials = useSelector((state) => state.My_trials.data.data);
    const createTrialSelector = useSelector((state) => state.My_trials.create_trial.data);
    const TrialsDetailSelector = useSelector((state) => state.My_trials.trial_detail.data);
    const RecruitingStatusSelector = useSelector((state) => state.My_trials.trial_detail_status);
    const isLoading = useSelector((state) => state.My_trials);

    const [TrialId, setTrialId] = useState();
    const [loadMoreData, setLoadMoreData] = useState(1);

    const [createTrialModalOpen, setCreateTrialModalOpen] = useState(false);
    const [trialDetailModalOpen, setTrialDetailModalOpen] = useState(false);
    const [sendInviteModalOpen, setSendInviteModalOpen] = useState(false);

    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);

    const [createTrials, setCreateTrials] = useState();
    const [trialDetailData, setTrialDetailData] = useState();
    const [isSelected, setIsSelected] = useState();
    const [selectedFile, setSelectedFile] = useState();

    const [recruitingClickBtn, setRecruitingClickBtn] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false)
    const [recruitingData, setRecruitingData] = useState()

    console.log("createTrials", createTrials);
    console.log("recruitingData", recruitingData);
    console.log("createTrialSelector", createTrialSelector);
    console.log("RecruitingStatusSelector", RecruitingStatusSelector);

    const [createTrialFieldData, setCreateTrialFieldData] = useState({
        trial_name: "",
        compensation: "",
        speciality: [],
        condition: [],
        description: "",
        invite_sent_to_clinics: false
    });
    const [sendInvitationData, setSendInvitationData] = useState({
        clinic_trial_id: "",
        email_address: "",
        email_list: "",
        additional_information: ""
    })

    useEffect(() => {
        dispatch(ListTrials({ page: loadMoreData }))
        SpecialitiesAction()
    }, [dispatch, loadMoreData]);

    const handleTrialDetailModalOpen = (id) => {
        setTrialDetailModalOpen(true);
        dispatch(ViewTrialsAction(id))
    }
    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }

    //Create Trial Modal Function
    const handleShowCreateTrialModal = () => setCreateTrialModalOpen(true);

    const handleCreateTrialModalClose = () => {
        setCreateTrialModalOpen(false);
        setRecruitingData("")
    }

    async function SpecialitiesAction() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return fetch(getCurrentHost() + "/get-clinical-specialities", requestOptions)
            .then(data => data.json())
            .then((response) => {
                let data = response.data;
                for (var i = 0; i < data?.length; i++) {
                    const obj = Object.assign({}, data[i]);
                    obj.label = data[i].speciality_title;
                    obj.value = data[i].id;
                    setSpecialityList(oldArray => [...oldArray, obj]);
                }
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    async function ConditionsAction(data) {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(true),
            body: JSON.stringify(data)
        };
        return fetch(getCurrentHost() + "/get-clinical-conditions", requestOptions)
            .then(data => data.json())
            .then((response) => {
                var data = response.data;
                var conditionsArr = [];
                for (var i = 0; i < data?.length; i++) {
                    const obj = Object.assign({}, data[i]);
                    obj.label = data[i].condition_title;
                    obj.value = data[i].id;
                    conditionsArr.push(obj)
                }
                setConditionList(conditionsArr);
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    const specialityOnChange = (e) => {
        setCreateTrialFieldData({ ...createTrialFieldData, speciality: e })
        const speArr = e.map(value => value.id)
        let data = {
            speciality: speArr
        }
        ConditionsAction(data);
    }

    const onChange = (e) => {
        const { name, checked, value } = e.target;
        if (name === "invite_sent_to_clinics") {
            setCreateTrialFieldData((preValue) => {
                return {
                    ...preValue,
                    [name]: checked
                };
            });
        } else {
            setCreateTrialFieldData((preValue) => {
                return {
                    ...preValue,
                    [name]: value
                };
            });
        }
    };

    useEffect(() => {
        setCreateTrials(createTrialSelector)
    }, [createTrialSelector]);

    useEffect(() => {
        if (createTrials !== undefined && createTrials.status_code === 200) {
            setCreateTrialModalOpen(false);
            setCreateTrialFieldData({
                trial_name: "",
                compensation: "",
                speciality: [],
                condition: [],
                description: "",
                invite_sent_to_clinics: false
            })
            setSendInviteModalOpen(false);
            setSendInvitationData({
                clinic_trial_id: "",
                email_address: "",
                email_list: "",
                additional_information: ""
            })
            setSelectedFile(undefined)
            dispatch(ListTrials({ page: loadMoreData }))
        }
    }, [createTrials])

    useEffect(() => {
        if (RecruitingStatusSelector !== undefined && RecruitingStatusSelector.data.status_code === 200) {
            dispatch(ListTrials({ page: loadMoreData }))
        }
    }, [RecruitingStatusSelector])

    const handleCreateTrialSubmit = (event) => {
        event.preventDefault();
        const specialityArr = createTrialFieldData.speciality.map(value => value.id);
        const conditionArr = createTrialFieldData.condition.map(value => value.id);
        const fieldData = {
            trial_name: createTrialFieldData.trial_name,
            compensation: createTrialFieldData.compensation,
            speciality: specialityArr,
            condition: conditionArr,
            description: createTrialFieldData.description,
            invite_sent_to_clinics: createTrialFieldData.invite_sent_to_clinics
        }
        dispatch(CreateTrialsAction(fieldData))
        dispatch(ListTrials({ page: loadMoreData }))
    }

    //Trial Details Modal Funciton
    useEffect(() => {
        setTrialDetailData(TrialsDetailSelector)
    }, [TrialsDetailSelector]);

    const handleInviteModalOpen = (id) => {
        setSendInviteModalOpen(true);
        hanleTrialDetailModalClose();
        setTrialId(id)
    }

    const hanleTrialDetailModalClose = () => {
        setTrialDetailModalOpen(false);
        setTrialDetailData()
        setIsSelected(false);
    }

    useEffect(() => {
        setRecruitingData(RecruitingStatusSelector)
    }, [RecruitingStatusSelector])

    useEffect(() => {
        if (recruitingClickBtn === true) {
            setStatusLoading(true)
            if (recruitingData && recruitingData.status === 200) {
                if (Object.keys(recruitingData.data).length !== 0) {
                    setStatusLoading(false)
                    setRecruitingData("")
                    hanleTrialDetailModalClose()
                }
                setRecruitingClickBtn(false)
            }
        }
    }, [recruitingData, recruitingClickBtn])

    const handleRecruiting = (id, status) => {
        let data = {
            status: status,
            trial_id: id
        }
        dispatch(TrialRecruitingUpdateAction(data))
        // dispatch(ListTrials({ page: loadMoreData }))
        setRecruitingClickBtn(true)
    }

    //Send Invitation Modal Functions
    const handleSendInviteModalClose = () => setSendInviteModalOpen(false)

    const SelectedFileName = selectedFile !== undefined && selectedFile.name.split('.');

    const updateFileHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const sendInviteOnChange = (e) => {
        const { name, value } = e.target;
        setSendInvitationData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    };

    const handleSendInvitationModalSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("clinic_trial_id", TrialId);
        formData.append("additional_information", sendInvitationData.additional_information);
        if (sendInvitationData.email_address.length > 0) {
            formData.append("email_address", sendInvitationData.email_address);
        } else if (selectedFile !== undefined) {
            formData.append("email_list", selectedFile);
        }
        dispatch(SendTrialInvitation(formData))
    }

    return (
        <>
            <div className="clinical-dashboard my-favorites-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Trials</h1>
                        <Button
                            isButton="true"
                            BtnColor="green btn-sm"
                            BtnText="Add Trial"
                            onClick={handleShowCreateTrialModal}
                        />
                    </div>

                    <div className='row'>
                        {
                            trials !== undefined ?
                                trials.data.data?.length !== 0 ?
                                    trials.data.data.map((value, index) => {
                                        return (
                                            <div className='col-lg-6' key={index}>
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    onClick={() => handleTrialDetailModalOpen(value.id)}
                                                    title={value.trial_name}
                                                    description={value.description}
                                                    status={
                                                        value.status === 1
                                                            ?
                                                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                                            :
                                                            <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                                    }
                                                    iconColor="#356AA0"
                                                    ShareFav="false"
                                                />
                                            </div>
                                        )
                                    })
                                    :
                                    <NoDataFound />
                                :
                                [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                                    return (
                                        <div className='col-lg-6' key={index}>
                                            <Skeleton height={150} borderRadius="1rem" style={{ marginBottom: 20 }} />
                                        </div>
                                    )
                                })
                        }

                        {trials && trials.data?.total > 16 &&
                            <div className='col-12 mt-5 text-center'>
                                <Button
                                    isButton="true"
                                    BtnColor="primary"
                                    BtnText="Load More"
                                    onClick={handleLoadMore}
                                    disabled={trials.data.last_page === trials.data.current_page}
                                    hasSpinner={isLoading.loading}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>

            <CommonModal show={createTrialModalOpen} onHide={handleCreateTrialModalClose} keyboard={false} ModalTitle="Create Trial"
                ModalData={
                    <>
                        <Form onSubmit={handleCreateTrialSubmit} autoComplete="off">
                            <InputText
                                type="text"
                                name="trial_name"
                                placeholder="Enter Trial Name"
                                labelText="Trial Name"
                                onChange={onChange}
                                required={true}
                            />
                            <div className="form-group">
                                <label> Specialty </label>
                                <MultiSelect
                                    options={specialityList !== undefined && specialityList}
                                    value={createTrialFieldData.speciality}
                                    onChange={specialityOnChange}
                                    disableSearch={true}
                                    labelledBy="Specialty"
                                    className="multiSelect-control"
                                    name="speciality"
                                />
                            </div>
                            <div className="form-group">
                                <label> Mental Health Condition </label>
                                <MultiSelect
                                    options={conditionList !== undefined && conditionList}
                                    value={createTrialFieldData.condition}
                                    onChange={(e) => setCreateTrialFieldData({ ...createTrialFieldData, condition: e })}
                                    disableSearch={true}
                                    labelledBy="Mental Health Condition"
                                    className="multiSelect-control"
                                    name="condition"
                                />
                            </div>
                            <InputText
                                type="text"
                                placeholder="Enter Compensation"
                                name="compensation"
                                labelText="Compensation"
                                onChange={onChange}
                                maxLength="100"
                                required={true}
                            />
                            <TextArea
                                name="description"
                                placeholder="Enter Description"
                                labelText="Description"
                                onChange={onChange}
                                maxLength="500"
                                required={true}
                            />
                            <RadioBtn
                                className="checkbox-btn"
                                type="checkbox"
                                name="invite_sent_to_clinics"
                                labelText="Send Invitation to Trial Clinics."
                                onChange={onChange}
                            />
                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isButton="true"
                                    BtnColor="primary w-100"
                                    BtnText="Submit"
                                    hasSpinner={isLoading.loading}
                                    disabled={isLoading.loading}
                                />
                            </div>
                        </Form>
                    </>
                }
            />

            <CommonModal className={`custom-size-modal ${!isLoading.loading ? null : "br-none-modal"}`} show={trialDetailModalOpen} onHide={hanleTrialDetailModalClose} keyboard={false}
                ModalTitle={
                    trialDetailData !== undefined &&
                    <>
                        <h2>{trialDetailData.data.trial_name}</h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on {moment(trialDetailData.data.recruitment_start_date).format("MMM Do YY")}</span>
                            {trialDetailData.data.status === 1 ?
                                <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                :
                                <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                            }
                        </div>
                    </>
                }
                ModalData={
                    trialDetailData !== undefined ?
                        <>
                            <div className='sponser-price-info'>
                                <div className='sponser-price-row w-100 br-none'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>Trial Compensation</h4>
                                        <h2>{trialDetailData.data.compensation !== null ? trialDetailData.data.compensation : "0.00"}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className='info-bx'>
                                <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> Lorem ipsum dolor sit amet consectetur adipiscing eli am porta nunc eu nibh dignissim sit amet viverra.
                            </div>

                            {trialDetailData.data.specialities.length !== 0 &&
                                <div className='clnicaltrial-description'>
                                    <h2>Specialty</h2>
                                    <ul className='condition-ul'>
                                        {trialDetailData.data.specialities.map((value, index) => {
                                            return (
                                                <li key={index}>{value.speciality_detail.speciality_title}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }

                            {trialDetailData.data.conditions.length !== 0 &&
                                <div className='clnicaltrial-description'>
                                    <h2>Condition</h2>
                                    <ul className='condition-ul'>
                                        {trialDetailData.data.conditions.map((value, index) => {
                                            return (
                                                <li key={index}>{value.condition_detail.condition_title}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }

                            {trialDetailData.data.description !== null &&
                                <div className='clnicaltrial-description'>
                                    <h2>Description</h2>
                                    <p>{trialDetailData.data.description}</p>
                                </div>
                            }

                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isButton="true"
                                    BtnColor={trialDetailData.data.status === 1 ? "red" : trialDetailData.data.status === 2 ? "green" : "red"}
                                    hasSpinner={statusLoading}
                                    disabled={trialDetailData.data.status === 0 || trialDetailData.data.status === 3 ? true : statusLoading}
                                    BtnText={trialDetailData.data.status === 1 ? "Stop Recruiting" : trialDetailData.data.status === 2 ? "Start Recruiting" : trialDetailData.data.status === 0 ? "Approval Pending" : "Trial Request Rejected"}
                                    onClick={
                                        trialDetailData.data.status === 1 ?
                                            () => handleRecruiting(trialDetailData.data.id, 2)
                                            :
                                            () => handleRecruiting(trialDetailData.data.id, 1)
                                    }
                                />

                                <Button
                                    isButton="true"
                                    BtnColor="primary w-20"
                                    BtnText="Invite"
                                    onClick={() => handleInviteModalOpen(trialDetailData.data.id)}
                                />
                            </div>
                        </>
                        :
                        <LogoLoader />
                }
            />

            <CommonModal show={sendInviteModalOpen} onHide={handleSendInviteModalClose} keyboard={false} size="md" ModalTitle="Send Invitation"
                ModalData={
                    <Form onSubmit={handleSendInvitationModalSubmit} autoComplete="off">
                        <InputText
                            type="email"
                            name="email_address"
                            placeholder="Enter Email"
                            labelText="Email"
                            onChange={sendInviteOnChange}
                        />

                        <div className='mb-4'>Or</div>

                        <div className="col-lg-12 form-group">
                            <label>Upload List of Emails</label>
                            <label className="upload-document single-file-uploader w-100">
                                <input type="file" name="documents" accept=".xls,.xlsx,.csv" onChange={updateFileHandler} />
                                <div>
                                    <h4>
                                        {isSelected ? "1 File is selected" : "No File Uploaded"}
                                    </h4>
                                    <h3>{isSelected ? <><span className='fileName'>{SelectedFileName[0]}</span><span>.{SelectedFileName[1]}</span></> : "Tap Here to Upload your File"}</h3>
                                </div>
                            </label>
                        </div>

                        <div className="col-lg-12">
                            <TextArea
                                name="additional_information"
                                placeholder="Enter Additional Information"
                                labelText="Additional Information"
                                maxLength="500"
                                onChange={sendInviteOnChange}
                            />
                        </div>

                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Send"
                                hasSpinner={isLoading.loading}
                                disabled={isLoading.loading}
                            />
                        </div>
                    </Form>
                }
            />
        </>
    );
};

export default SponsorsTrials;