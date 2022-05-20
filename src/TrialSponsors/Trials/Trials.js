import { useEffect, useState } from 'react';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import { InputText, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import { useSelector, useDispatch } from 'react-redux'
import { ListTrials, ViewTrials, CreateTrials, SendTrialInvitation } from '../../redux/actions/TrialSponsorAction';
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
var loadingTechSkeleton = [];
const SponsorsTrials = () => {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const trials = useSelector((state) => state.My_trials.data.data);
    const resData = useSelector((state) => state.My_trials.create_trial.data);
    const [createTrials, setCreateTrials] = useState();
    const TrialsDetails = useSelector((state) => state.My_trials.trial_detail.data);
    const [trialsState, setTrialsState] = useState();
    const [TrialId, setTrialId] = useState();
    const isLoading = useSelector((state) => state.My_trials);
    const [isSelected, setIsSelected] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const SelectedFileName = selectedFile !== undefined && selectedFile.name.split('.');

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const [createTrialFieldData, setCreateTrialFieldData] = useState({
        trial_name: "",
        compensation: "",
        speciality: [],
        condition: [],
        description: "",
        send_invitation: ""
    });

    const [sendInvitationData, setSendInvitationData] = useState({
        clinic_trial_id: "",
        email_address: "",
        email_list: "",
        additional_information: ""
    })

    const dispatch = useDispatch()

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow2 = (id) => {
        setShow2(true);
        dispatch(ViewTrials(id))
    }
    const handleClose2 = () => {
        setShow2(false);
        setTrialsState(undefined)
        setIsSelected(false);
    }

    const handleShow3 = (id) => {
        setShow3(true);
        handleClose2(true);
        setTrialId(id)
    }
    const handleClose3 = () => {
        setShow3(false);
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
        if (name === "send_invitation") {
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

    const onChange2 = (e) => {
        const { name, value } = e.target;
        setSendInvitationData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    };

    const CreateTrial = (event) => {
        event.preventDefault();
        const specialityArr = createTrialFieldData.speciality.map(value => value.id);
        const conditionArr = createTrialFieldData.condition.map(value => value.id);
        const fieldData = {
            trial_name: createTrialFieldData.trial_name,
            compensation: createTrialFieldData.compensation,
            speciality: specialityArr,
            condition: conditionArr,
            description: createTrialFieldData.description,
            send_invitation: createTrialFieldData.send_invitation

        }
        dispatch(CreateTrials(fieldData))
        dispatch(ListTrials())
    }

    const SendInvitation = (event) => {
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
        console.log("createTrials", createTrials);
    }

    useEffect(() => {
        dispatch(ListTrials())
        SpecialitiesAction()
    }, []);

    useEffect(() => {
        if (createTrials !== undefined && createTrials.status_code == 200) {
            setShow(false);
            // setCreateTrials(undefined)
            setCreateTrialFieldData({
                trial_name: "",
                compensation: "",
                speciality: [],
                condition: [],
                description: "",
                send_invitation: "0"
            })

            setShow3(false);
            setSendInvitationData({
                clinic_trial_id: "",
                email_address: "",
                email_list: "",
                additional_information: ""
            })
            setSelectedFile(undefined)
        }
    }, [createTrials])

    useEffect(() => {
        setTrialsState(TrialsDetails)
    }, [TrialsDetails]);

    useEffect(() => {
        setCreateTrials(resData)
    }, [resData]);

    useEffect(() => {
        for (let i = 0; i < 12; i++) {
            return (
                loadingTechSkeleton.push(
                    <div className='col-lg-6' key={i}>
                        <Skeleton height={150} borderRadius="1rem" style={{ marginBottom: 20 }} />
                    </div>
                )
            )
        }
    })

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
                            onClick={handleShow}
                        />
                    </div>

                    <div className='row'>
                        {
                            trials !== undefined ?
                                trials.data?.length !== 0 ?
                                    trials.data.map((value, index) => {
                                        return (
                                            <div className='col-lg-6' key={index}>
                                                <ClinicTrial
                                                    className="mb-4 white-trial-bx"
                                                    onClick={() => handleShow2(value.id)}
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
                                <div className='row'>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => {
                                            return (
                                                <div className='col-lg-6' key={index}>
                                                    <Skeleton height={150} borderRadius="1rem" style={{ marginBottom: 20 }} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>

            <CommonModal show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Create Trial"
                onClick={handleClose}
                ModalData={
                    <>
                        <Form onSubmit={CreateTrial} autoComplete="off">
                            <InputText
                                type="text"
                                name="trial_name"
                                placeholder="Enter Trial Name"
                                labelText="Trial Name"
                                onChange={onChange}
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
                            />
                            <TextArea
                                name="description"
                                placeholder="Enter Description"
                                labelText="Description"
                                onChange={onChange}
                                maxLength="500"
                            />
                            <RadioBtn
                                className="checkbox-btn"
                                type="checkbox"
                                name="send_invitation"
                                labelText="Send Invitation to Trial Clinics."
                                onChange={onChange}
                            />
                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isButton="true"
                                    BtnColor="primary w-100"
                                    BtnText="Submit"
                                    onClick={CreateTrial}
                                    hasSpinner={isLoading.loading}
                                    disabled={isLoading.loading}
                                />
                            </div>
                        </Form>
                    </>
                }
            />

            <CommonModal className={`custom-size-modal ${!isLoading.loading ? null : "br-none-modal"}`} show={show2} onHide={handleClose2} keyboard={false}
                ModalTitle={
                    <>
                        {/* <button type="button" className="btn-close" aria-label="Close" onClick={handleClose2}></button> */}
                        {trialsState !== undefined &&
                            <>
                                <h2>{trialsState.data.trial_name}</h2>
                                <div className="trialClinic-location">
                                    <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on {moment(trialsState.data.recruitment_start_date).format("MMM Do YY")}</span>
                                    {trialsState.data.status == 1
                                        ?
                                        <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                        :
                                        <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                    }
                                </div>
                            </>
                        }
                    </>
                }
                onClick={handleClose2}
                ModalData={
                    <>
                        {trialsState !== undefined ?
                            <>
                                <div className='sponser-price-info'>
                                    <div className='sponser-price-row w-100 br-none'>
                                        <div className='sponser-price-icon'>
                                            <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                        </div>
                                        <div>
                                            <h4>Trial Compensation</h4>
                                            <h2>{trialsState.data.compensation !== null ? trialsState.data.compensation : "0.00"}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='info-bx'>
                                    <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> Lorem ipsum dolor sit amet consectetur adipiscing eli am porta nunc eu nibh dignissim sit amet viverra.
                                </div>
                                {trialsState.data.specialities.length !== 0 &&
                                    <div className='clnicaltrial-description'>
                                        <h2>Specialty</h2>
                                        <ul className='condition-ul'>
                                            {
                                                trialsState.data.specialities.length !== 0
                                                    ?
                                                    trialsState.data.specialities.map((value, index) => {
                                                        return (
                                                            <li key={index}>{value.speciality_detail.speciality_title}</li>
                                                        )
                                                    })
                                                    :
                                                    <div class="alert alert-primary w-100" role="alert">
                                                        No Specialty Found!
                                                    </div>
                                            }
                                        </ul>
                                    </div>
                                }

                                {trialsState.data.conditions.length !== 0 &&
                                    <div className='clnicaltrial-description'>
                                        <h2>Condition</h2>
                                        <ul className='condition-ul'>
                                            {
                                                trialsState.data.conditions.length !== 0
                                                    ?
                                                    trialsState.data.conditions.map((value, index) => {
                                                        return (
                                                            <li key={index}>{value.condition_detail.condition_title}</li>
                                                        )
                                                    })
                                                    :
                                                    <div class="alert alert-primary w-100" role="alert">
                                                        No Condition Found!
                                                    </div>
                                            }
                                        </ul>
                                    </div>
                                }

                                {trialsState.data.description !== null &&
                                    <div className='clnicaltrial-description'>
                                        <h2>Description</h2>
                                        <p>{trialsState.data.description}</p>
                                    </div>
                                }
                                <div className='clnicaltrial-detail-ftr'>
                                    <Button
                                        isButton="true"
                                        BtnColor="green"
                                        BtnText="Stop Recruiting"
                                        onClick={handleClose2}
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary w-20"
                                        BtnText="Invite"
                                        onClick={() => handleShow3(trialsState.data.id)}
                                    />
                                </div>
                            </>
                            :
                            <LogoLoader />
                        }
                    </>
                }
            />

            <CommonModal show={show3} onHide={handleClose3} keyboard={false} size="md"
                ModalTitle="Send Invitation"
                onClick={handleClose3}
                ModalData={
                    <>
                        <Form onSubmit={SendInvitation} autoComplete="off">
                            <InputText
                                type="email"
                                name="email_address"
                                placeholder="Enter Email"
                                labelText="Email"
                                onChange={onChange2}
                            />
                            <div className='mb-4'>Or</div>
                            <div className="col-lg-12 form-group">
                                <label>Upload List of Emails</label>
                                <label className="upload-document single-file-uploader w-100">
                                    <input type="file" name="documents" accept=".xls,.xlsx,.csv" onChange={changeHandler} />
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
                                    onChange={onChange2}
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
                    </>
                }
            />
        </>
    );
};

export default SponsorsTrials;
