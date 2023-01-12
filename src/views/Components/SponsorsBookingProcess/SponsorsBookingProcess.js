import CommonModal from '../Common/Modal/Modal'
import Button from '../Common/Buttons/Buttons';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { TextArea } from '../Common/Inputs/Inputs';
import moment from 'moment';
import { LogoLoader } from '../Common/LogoLoader/LogoLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ApplyForTrialAction } from '../../../redux/actions/TrialClinicAction';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const ClinicSponsorsBookingProcess = ({ trialId, trialDetails, show, handleClose, onClickChat, show2, handleClose2, handleShow2, show3, handleClose3, handleShow3 }) => {
    const dispatch = useDispatch();
    const applyTrialSelector = useSelector(state => state.trial_clinic);
    const totalFiles = 2;
    const [uploadedFile, setUploadFile] = useState([]);
    const [trialBriefIntro, setTrialBriefIntro] = useState();
    const [applySubmit, setApplySubmit] = useState(false);
    const [thanksObj, setThanksObj] = useState()

    const handleRemoveFile = (item) => {
        setUploadFile(uploadedFile.filter(el => el.name !== item.name));
    }

    const handleFileUpload = async (e) => {
        const { value, files } = e.target;
        if (files.length > 0 && files.length <= totalFiles) {
            const extention = value.substr(value.lastIndexOf('.') + 1).toLowerCase();
            if (
                extention === "doc" ||
                extention === "pdf" ||
                extention === "docx"
            ) {
                for (let i = 0; i < files.length; i++) {
                    const reader = new FileReader();
                    reader.readAsDataURL(files[i]);
                    let arr = files[i]
                    setUploadFile(uploadedFile => [...uploadedFile, arr]);
                }
            }
            else {
                toast.error("The Document must be a file of type: doc, pdf, docx.", { theme: "colored" });
            }
        } else (
            toast.error(`You can't upload more then ${totalFiles} files`, { theme: "colored" })
        )
        e.target.value = null;
    }

    useEffect(() => {
        if (applySubmit === true) {
            if (Object.keys(applyTrialSelector.apply_trial).length !== 0) {
                toast.success(applyTrialSelector.apply_trial.data.message, { theme: "colored" });
                setThanksObj(applyTrialSelector.apply_trial.data.data);
                handleShow3();
                setApplySubmit(false)
                setTrialBriefIntro();
                setUploadFile([]);
            } else if (Object.keys(applyTrialSelector.error).length !== 0) {
                toast.error(applyTrialSelector.error.message, { theme: "colored" })
                setApplySubmit(false)
            }
        }
    }, [applyTrialSelector, applySubmit, handleShow3])

    useEffect(() => {
        return () => {
            setTrialBriefIntro();
            setUploadFile([]);
        }
    }, [handleClose2, handleShow3])

    const Validation = (intro, file) => {
        if (file.length === 0) {
            toast.error(`The Document field is required.`, { theme: "colored" })
            return false
        } else if (file.length > totalFiles) {
            toast.error(`You can't upload more then ${totalFiles} files`, { theme: "colored" })
            return false
        }
        if (intro === undefined || intro.length === 0) {
            toast.error(`The Brief intro field is required.`, { theme: "colored" })
            return false
        }
        return true
    }

    const handleApplyTrialSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("clinic_trial_id", trialId);
        formData.append("brief_intro", trialBriefIntro);
        for (let i = 0; i < uploadedFile.length; i++) {
            formData.append(`documents[${i}]`, uploadedFile[i]);
        }
        const isVaild = Validation(trialBriefIntro, uploadedFile)
        if (isVaild) {
            dispatch(ApplyForTrialAction(formData))
            setApplySubmit(true)
        }
    }
    return (
        <>
            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle={
                    trialDetails !== undefined &&
                    <>
                        <h2> {trialDetails.data.trial_name} </h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on {moment(trialDetails.data.recruitment_start_date).format("MMM Do YY")}</span>
                            {trialDetails.data.status === 1 ?
                                <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                :
                                <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                            }
                        </div>
                    </>
                }
                onClick={handleClose}
                ModalData={
                    trialDetails !== undefined ?
                        <>
                            <div className='sponser-price-info'>
                                <div className='sponser-price-row w-100 br-none'>
                                    <div className='sponser-price-icon'>
                                        <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                    </div>
                                    <div>
                                        <h4>To be Decided by Company</h4>
                                        <h2>{trialDetails.data.compensation !== null ? trialDetails.data.compensation : "0.00"}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='info-bx'>
                                <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> Lorem ipsum dolor sit amet consectetur adipiscing eli am porta nunc eu nibh dignissim sit amet viverra.
                            </div>

                            {trialDetails.data.conditions.length !== 0 &&
                                <div className='clnicaltrial-description'>
                                    <h2>Condition</h2>
                                    <ul className='condition-ul'>
                                        {trialDetails.data.conditions.map((value, index) => {
                                            return (
                                                <li key={index}>{value.condition_detail.condition_title}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }

                            {trialDetails.data.description !== null &&
                                <div className='clnicaltrial-description'>
                                    <h2>Description</h2>
                                    <p>{trialDetails.data.description}</p>
                                </div>
                            }
                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green"
                                    BtnText={!trialDetails.data.alreadyApplied ? "Apply for Trial" : "Already Applied"}
                                    onClick={() => handleShow2(trialDetails.data.id)}
                                    disabled={trialDetails.data.alreadyApplied || trialDetails.data.status === 2}
                                />

                                <button className="btn-action btn-primary" onClick={() => onClickChat()}>
                                    <box-icon name='message-rounded-dots' color="#ffffff"></box-icon>
                                </button>
                            </div>
                        </>
                        :
                        <LogoLoader />
                }
            />

            <CommonModal show={show2} onHide={handleClose2} keyboard={false} size="md"
                ModalTitle="Apply for Trial"
                onClick={handleClose2}
                ModalData={
                    <form onSubmit={handleApplyTrialSubmit} autoComplete="off" className='row'>
                        <div className="col-12 form-group">
                            <label>Upload Clinic Document</label>
                            <label className="upload-document w-100" htmlFor="uploadClinicDoc">
                                <input type="file" id="uploadClinicDoc" className='d-none' hidden="" name="documents" accept=".doc,.pdf,.docx" multiple onChange={handleFileUpload} max={totalFiles} />
                                <div>
                                    <h4>No File Uploaded</h4>
                                    <h3>Tap Here to Upload your File</h3>
                                </div>
                            </label>
                        </div>

                        {uploadedFile?.map((value, index) => {
                            return (
                                <div className="col-md-6 mb-3" key={index}>
                                    <div className="uploaded-file text-center">
                                        <span className="uploaded-type"> {value.name.substr(value.name.lastIndexOf('.') + 1)} </span>
                                        <span className="uploaded-name"> {value.name.split("." + value.name.substr(value.name.lastIndexOf('.') + 1))[0]} </span>
                                        <button type="button" className="btn" onClick={() => handleRemoveFile(value)}><box-icon name='x' size="18px" color="#ffffff"></box-icon></button>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='col-12'>
                            <div className='info-bx br-none p-0 form-group'>
                                <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> Upload your Trial Document as the main requirement to Apply for a Trial
                            </div>
                        </div>
                        <div className="col-12">
                            <TextArea
                                name="brief_intro"
                                placeholder="Enter Brief Intro"
                                labelText="Brief Intro"
                                onChange={(e) => setTrialBriefIntro(e.target.value)}
                                maxLength="800"
                            />
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0 col-12'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Confirm"
                                hasSpinner={applySubmit === true && applyTrialSelector.loading}
                                disabled={applySubmit === true && applyTrialSelector.loading}
                            />
                        </div>
                    </form>
                }
            />

            <CommonModal show={show3} onHide={handleClose3} keyboard={false} size="md"
                onClick={handleClose3}
                ModalData={
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose3}></button>
                        <div className='congrats-bx'>
                            <h2>Congratulations!</h2>
                            <img src="/images/congrats.svg" alt="Congratulations" />
                            {thanksObj !== undefined && <p>You applied an Trial with <strong>{thanksObj.sponsor_name}</strong> <br /> for <strong>{thanksObj.trial_name}</strong> Disorder</p>}
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isLink="true"
                                URL="/trial-clinic/trial-applications"
                                BtnColor="primary w-100"
                                BtnText="Go to Trial Applications"
                            />
                        </div>
                    </>
                }
            />
        </>
    );
}

export default ClinicSponsorsBookingProcess;