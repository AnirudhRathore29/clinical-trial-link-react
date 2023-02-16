import { useRef, useState } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { useSelector } from 'react-redux';
import { MultiSelect } from "react-multi-select-component";
import CommonModal from '../Common/Modal/Modal';
import Button from '../Common/Buttons/Buttons';
import { authHeader } from '../../../redux/actions/authHeader';
import getCurrentHost from '../../../redux/constants';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

var jwt = require('jsonwebtoken');

const ClinicTrial = ({ onClick, onClickFav, id, title, description, status, iconType, iconColor, className, ShareFav, dateTime, trialAmount, favBtnDisable, trialId }) => {
    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)
    const isLoading = useSelector(state => state.patient.loading);
    // var url = profileDetails?.role === 2 ? "/patient/trial-listing/" : profileDetails?.role === 3 ? "/trial-clinic/sponsors-trial-listing/" : profileDetails?.role === 4 ? "/physician/trial-listing/" : null
    var url = "/patient/trial-listing/"

    const [tooltip, setTooltip] = useState(false);
    const [referTrialModal, setReferTrialModal] = useState(false);
    const [PatientList, setPatientList] = useState([]);
    const [fieldData, setFieldData] = useState({
        trial_clinic_appointment_id: trialId,
        patient_ids: [],
        loading: false
    });
    const target = useRef(null);

    console.log("iconType", iconType);
    console.log("profileDetails", profileDetails);
    console.log("location", window.location.origin);
    console.log("PatientList", PatientList);
    console.log("fieldData", fieldData);

    const ShareTrial = () => {
        if (profileDetails?.role !== 4) {
            setTooltip(!tooltip)
            console.log("navigator.clipboard", navigator.clipboard);
            navigator.clipboard
                .writeText(window?.location?.origin + url + id)
                .then(() => {
                    setTimeout(() => {
                        setTooltip(false)
                    }, 1000);
                })
                .catch(() => {
                    alert("something went wrong");
                });
        } else {
            const requestOptions = {
                method: 'GET',
                headers: authHeader()
            };
            fetch(getCurrentHost() + `/physician/get-trial-related-patient-list/${trialId}`, requestOptions)
                .then(data => data.json())
                .then((response) => {
                    setPatientList(response.data);
                })
                .catch(err => {
                    console.log("err", err)
                })
            setReferTrialModal(true)
        }
    }

    const CloseReferTrialModal = () => {
        setReferTrialModal(false)
        setFieldData({...fieldData, patient_ids: []})
    }

    const OnChange = (e) => {
        setFieldData({ ...fieldData, patient_ids: e })
    }

    const SubmitReferral = (e) => {
        e.preventDefault()
        setFieldData({ ...fieldData, loading: true })
        const patientIds = fieldData.patient_ids.map((value) => value.value)
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({
                trial_clinic_appointment_id: trialId,
                patient_ids: patientIds
            })
        };
        fetch(getCurrentHost() + `/physician/send-referal-mail`, requestOptions)
            .then(data => data.json())
            .then((response) => {
                setFieldData({ ...fieldData, loading: false })
                
                console.log("responseresponse", response);
                if(response.status){
                    toast.success(response.message, { theme: "colored" })
                    setReferTrialModal(false)
                    setFieldData({...fieldData, patient_ids: []})
                } else {
                    toast.error(response.message, { theme: "colored" })
                }
            })
            .catch(err => {
            })
    }

    return (
        <>
            <div className={`item clinicalTrial-bx ${className}`}>
                <h2 onClick={onClick}>{title}</h2>
                {description &&
                    <p className="description" onClick={onClick}>{description}</p>
                }
                {dateTime &&
                    <p className="hasIcon-p"><box-icon name='calendar' color="#356AA0" size="20px"></box-icon> {dateTime}</p>
                }
                {trialAmount &&
                    <p className="hasIcon-p"><box-icon name='dollar-circle' color="#356AA0" size="20px"></box-icon> {trialAmount}</p>
                }
                <div className='clinicalTrial-bx-ftr'>
                    {status}
                    {
                        ShareFav ?
                            null
                            :
                            <div>
                                {favBtnDisable ? null : <button className='icon-btn' disabled={isLoading} onClick={onClickFav}><box-icon name='heart' type={iconType} color={iconColor}></box-icon></button>}
                                <button className='icon-btn' ref={target} onClick={ShareTrial}><box-icon name='share-alt' color={iconColor}></box-icon></button>

                                <Overlay target={target.current} show={tooltip} placement="top">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}> URL Copied! </Tooltip>
                                    )}
                                </Overlay>
                            </div>
                    }
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={referTrialModal} onHide={CloseReferTrialModal} keyboard={false}
                ModalTitle={
                    <h2>Refer the Trial</h2>
                }
                onClick={CloseReferTrialModal}
                ModalData={
                    <form onSubmit={SubmitReferral}>
                        <div className="form-group">
                            <label>Select Patient's</label>
                            <MultiSelect
                                options={
                                    PatientList?.length > 0 ?
                                        PatientList?.map((item) => {
                                            console.log("asdsdas", { value: item?.id, label: item?.email });
                                            return { value: item?.id, label: item?.first_name }
                                        })
                                        :
                                        []
                                }
                                value={fieldData?.patient_ids}
                                onChange={OnChange}
                                disableSearch={true}
                                labelledBy="Seeking Trials for"
                                className="multiSelect-control"
                                name="patient"
                            />
                        </div>

                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnColor="primary w-100"
                                BtnText="Refer Now"
                                hasSpinner={fieldData?.loading}
                                disabled={fieldData?.loading}
                            />
                        </div>
                    </form>
                }
            />
        </>
    );
}

ClinicTrial.defaultProps = {
    iconColor: "#ffffff"
}

export default ClinicTrial;