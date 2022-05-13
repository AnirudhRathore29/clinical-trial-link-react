import { useEffect, useState } from 'react';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import { InputText, SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import { useSelector, useDispatch } from 'react-redux'
import { ListTrials, ViewTrials } from '../../redux/actions/TrialSponsorAction';
import moment from 'moment';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import '../../Patient/MyFavorites/MyFavorites.css';
import { Form } from 'react-bootstrap';

const SponsorsTrials = () => {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [selectSpeciality, setSelectSpeciality] = useState([]);
    const [specialityList, setSpecialityList] = useState([]);
    const TrialsDetails = useSelector((state) => state.View_trials.data);
    const trials = useSelector((state) => state.My_trials.data);
    const [createTrialFieldData, setCreateTrialFieldData] = useState({
        trial_name: "",
        compensation: "",
    });

    const dispatch = useDispatch()


    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const handleShow2 = (id) => {
        setShow2(true);
        dispatch(ViewTrials(id))
    }
    const handleClose2 = () => {
        setShow2(false);
    }

    const handleShow3 = () => {
        setShow3(true);
        handleClose2(true);
    }
    const handleClose3 = () => setShow3(false);

    async function SpecialitiesAction() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        return fetch(getCurrentHost() + "/get-clinical-specialities", requestOptions)
            .then(data => data.json())
            .then((response) => {
                console.log("response.data", response.data)
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

    // const CreateTrial = () =>{
    //     SpecialitiesAction()
    // }

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

    // const handleSignUPSubmit = () => {
    //     dispatch(SignupAction(regData))
    // };

    useEffect(() => {
        dispatch(ListTrials())
        SpecialitiesAction()
    }, []);

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
                            trials !== undefined &&
                                trials?.length !== 0 ?
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
                        }
                    </div>
                </div>
            </div>

            <CommonModal show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Create Trial"
                onClick={handleClose}
                ModalData={
                    <>
                        <Form autoComplete="off">
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
                                    value={selectSpeciality}
                                    onChange={setSelectSpeciality}
                                    disableSearch={true}
                                    labelledBy="Specialty"
                                    className="multiSelect-control"
                                    name="speciality"
                                />
                            </div>
                            {/* <SelectBox
                                labelText="Specialty"
                                optionData=
                                {
                                    <>
                                        <option value="">Specialty</option>
                                        <option value="">Specialty 1</option>
                                        <option value="">Specialty 1</option>
                                        <option value="">Specialty 1</option>
                                        <option value="">Specialty 1</option>
                                    </>
                                }
                            /> */}
                            <SelectBox
                                labelText="Condition"
                                optionData=
                                {
                                    <>
                                        <option value="">Select Condition</option>
                                        <option value="">Condition 1</option>
                                        <option value="">Condition 1</option>
                                        <option value="">Condition 1</option>
                                        <option value="">Condition 1</option>
                                    </>
                                }
                            />
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
                                />
                            </div>
                        </Form>
                    </>
                }
            />

            <CommonModal className="custom-size-modal" show={show2} onHide={handleClose2} keyboard={false}
                ModalTitle={
                    <>
                        {/* <button type="button" className="btn-close" aria-label="Close" onClick={handleClose2}></button> */}
                        {TrialsDetails !== undefined &&
                            <>
                                <h2>{TrialsDetails.data.trial_name}</h2>
                                <div className="trialClinic-location">
                                    <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on {moment(TrialsDetails.data.updated_at).format("MMM Do YY")}</span>
                                    {TrialsDetails.data.status == 1
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
                        {TrialsDetails !== undefined ?
                            <>
                                <div className='sponser-price-info'>
                                    <div className='sponser-price-row w-100 br-none'>
                                        <div className='sponser-price-icon'>
                                            <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                        </div>
                                        <div>
                                            <h4>Trial Compensation</h4>
                                            <h2>{TrialsDetails.data.compensation !== null ? TrialsDetails.data.compensation : "0.00"}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='info-bx'>
                                    <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> Lorem ipsum dolor sit amet consectetur adipiscing eli am porta nunc eu nibh dignissim sit amet viverra.
                                </div>
                                {TrialsDetails.data.conditions.length !== 0 &&
                                    <div className='clnicaltrial-description'>
                                        <h2>Condition</h2>
                                        <ul className='condition-ul'>
                                            {
                                                TrialsDetails.data.conditions.length !== 0
                                                    ?
                                                    TrialsDetails.data.conditions.map((value, index) => {
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
                                {TrialsDetails.data.specialities.length !== 0 &&
                                    <div className='clnicaltrial-description'>
                                        <h2>Specialty</h2>
                                        <ul className='condition-ul'>
                                            {
                                                TrialsDetails.data.specialities.length !== 0
                                                    ?
                                                    TrialsDetails.data.specialities.map((value, index) => {
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
                                {TrialsDetails.data.description !== null &&
                                    <div className='clnicaltrial-description'>
                                        <h2>Description</h2>
                                        <p>{TrialsDetails.data.description}</p>
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
                                        onClick={handleShow3}
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
                        <InputText
                            type="email"
                            placeholder="Enter Email"
                            labelText="Email"
                        />
                        <div className='mb-4'>Or</div>
                        <div className="col-lg-12 form-group">
                            <label>Upload List of Emails</label>
                            <label className="upload-document w-100">
                                <input type="file" />
                                <div>
                                    <h4>No File Uploaded</h4>
                                    <h3>Tap Here to Upload your File</h3>
                                </div>
                            </label>
                        </div>
                        <div className="col-lg-12">
                            <TextArea
                                name="additional_information"
                                placeholder="Enter Additional Information"
                                labelText="Additional Information"
                            />
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Send"
                                onClick={handleClose3}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default SponsorsTrials;
