import React, { useEffect, useState } from 'react';
import { SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './TrialRequests.css'
import '../../Patient/MyAppointments/MyAppointments.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import { NewScreenTrialRequestDetailAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';

const ClinicTrialScreenRequestDetail = () => {
    const [addVisitModal, setAddVisitModal] = useState(false);
    const [CancelReasonModal, setCancelReasonModal] = useState(false);
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const [SelectedStatus, setSelectedStatus] = useState();
    const [startDate, setStartDate] = useState(new Date());

    const loadingSelector = useSelector(state => state.trial_clinic)
    const screenPatientDetail = useSelector(state => state.trial_clinic.new_screen_trial_detail.data)

    console.log("screenPatientDetail", screenPatientDetail);
    
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(NewScreenTrialRequestDetailAction(id))
    }, [dispatch])

    console.log("SelectedStatus", SelectedStatus);
    const addVisitModalClose = () => {
        setSelectedStatus(0)
        setAddVisitModal(false)
    }

    const CancelReasonModalClose = () => {
        setSelectedStatus(0)
        setCancelReasonModal(false)
    }

    const ConfirmationModalClose = () => {
        setSelectedStatus(0)
        setConfirmationModal(false)
    }

    const CheckStatus = (e) => {
        console.log("CheckStatus", e);
        setConfirmationModal(true)
        setSelectedStatus(e.target.value)
    }

    const ChangeStatus = () => {
        if (SelectedStatus === "2" || SelectedStatus === "3") {
            setAddVisitModal(true)
            setConfirmationModal(false)
        } else {
            setCancelReasonModal(true)
            setConfirmationModal(false)
        }
    }
    return (
        <>
            <div className="clinical-dashboard screenPatientDetail">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Patient Details</h1>
                    </div>
                    <div className='repeat-white-bx mb-5'>
                        <div className='PatientDetailsHeader'>
                            <div className='appointment-detail patient-appointment-details'>
                                <img src="/images/avatar-img3.jpg" alt="clinic-img" />
                                <div className=''>
                                    <h2 className='mb-4'>Barnes Jewish Hospital</h2>
                                    <span className='badge badge-primary d-inline-block'>Approved</span>
                                </div>
                            </div>
                            <div>
                                <SelectBox
                                    name="condition"
                                    FormGroupClass="mb-0"
                                    onChange={CheckStatus}
                                    value={SelectedStatus}
                                    optionData={
                                        <>
                                            <option hidden value="0">Update Status</option>
                                            <option value="1">Not Eligible</option>
                                            <option value="2">Pending Approval</option>
                                            <option value="3">Approved</option>
                                        </>
                                    }
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Gender</h2>
                                    <p>Female</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>DOB</h2>
                                    <p>September 12, 1995</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Phone Number</h2>
                                    <p>9235248354</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Trial for</h2>
                                    <p>Brain Study</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Location</h2>
                                    <p>adress home 1, Alaska</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Date & Time</h2>
                                    <p>August 17, 2022, (11:00 AM to 01:00 PM)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='repeat-white-bx'>
                        <h2 className="section-title"> Patient Visits </h2>

                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='patientVisit'>
                                    <h3>August 17, 2022, (11:00 AM to 01:00 PM)</h3>
                                    <SelectBox
                                        name="condition"
                                        onChange={CheckStatus}
                                        FormGroupClass="mb-0"
                                        optionData={
                                            <>
                                                <option hidden>Update Status</option>
                                                <option value="1">Not Eligible</option>
                                                <option value="2">Pending Approval</option>
                                                <option value="3">Approved</option>
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='patientVisit'>
                                    <h3>August 17, 2022, (11:00 AM to 01:00 PM)</h3>
                                    <SelectBox
                                        name="condition"
                                        onChange={CheckStatus}
                                        FormGroupClass="mb-0"
                                        optionData={
                                            <>
                                                <option hidden>Update Status</option>
                                                <option value="1">Not Eligible</option>
                                                <option value="2">Pending Approval</option>
                                                <option value="3">Approved</option>
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='patientVisit'>
                                    <h3>August 17, 2022, (11:00 AM to 01:00 PM)</h3>
                                    <SelectBox
                                        name="condition"
                                        onChange={CheckStatus}
                                        FormGroupClass="mb-0"
                                        optionData={
                                            <>
                                                <option hidden>Update Status</option>
                                                <option value="1">Not Eligible</option>
                                                <option value="2">Pending Approval</option>
                                                <option value="3">Approved</option>
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='patientVisit'>
                                    <h3>August 17, 2022, (11:00 AM to 01:00 PM)</h3>
                                    <SelectBox
                                        name="condition"
                                        onChange={CheckStatus}
                                        FormGroupClass="mb-0"
                                        optionData={
                                            <>
                                                <option hidden>Update Status</option>
                                                <option value="1">Not Eligible</option>
                                                <option value="2">Pending Approval</option>
                                                <option value="3">Approved</option>
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='patientVisit'>
                                    <h3>August 17, 2022, (11:00 AM to 01:00 PM)</h3>
                                    <SelectBox
                                        name="condition"
                                        onChange={CheckStatus}
                                        FormGroupClass="mb-0"
                                        optionData={
                                            <>
                                                <option hidden>Update Status</option>
                                                <option value="1">Not Eligible</option>
                                                <option value="2">Pending Approval</option>
                                                <option value="3">Approved</option>
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CommonModal show={addVisitModal} onHide={addVisitModalClose} keyboard={false} size="md"
                ModalTitle="Add Another Visit"
                onClick={addVisitModalClose}
                ModalData={
                    <form autoComplete="off">
                        <div className='calender-outer'>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                inline
                            />
                        </div>
                        <div className="available-time">
                            <h2>Available Time</h2>
                            <div className="time-row">
                                <label><input type="radio" name="available_time" defaultChecked /><span>09:00 AM - 11:00 AM</span></label>
                                <label><input type="radio" name="available_time" /><span>11:00 AM - 01:00 PM</span></label>
                                <label><input type="radio" name="available_time" /><span>01:00 PM - 03:00 PM</span></label>
                                <label><input type="radio" name="available_time" /><span>03:00 PM - 05:00 PM</span></label>
                                <label><input type="radio" name="available_time" /><span>05:00 PM - 07:00 PM</span></label>
                            </div>
                        </div>
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Enter Text Note"
                        />
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Confirm"
                                onClick={addVisitModalClose}
                            />
                        </div>
                    </form>
                }
            />

            <CommonModal show={ConfirmationModal} onHide={ConfirmationModalClose} keyboard={false} size="md"
                onClick={ConfirmationModalClose}
                ModalData={
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={ConfirmationModalClose}></button>
                        <div className='congrats-bx'>
                            <h2>Are you Sure?</h2>
                            <p>Do you really want to change the status?</p>
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnColor="primary btn-sm"
                                BtnText="Cancel"
                            />
                            <Button
                                isButton="true"
                                BtnColor="green btn-sm"
                                BtnText="Submit"
                                onClick={ChangeStatus}
                            />
                        </div>
                    </>
                }
            />

            <CommonModal show={CancelReasonModal} onHide={CancelReasonModalClose} keyboard={false} size="md"
                ModalTitle="Enter Reason"
                onClick={CancelReasonModalClose}
                ModalData={
                    <form autoComplete="off">
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Enter Cancelation Reason"
                        />
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="button"
                                BtnColor="primary w-100"
                                BtnText="Submit"
                                onClick={CancelReasonModalClose}
                            />
                        </div>
                    </form>
                }
            />
        </>
    );
};

export default ClinicTrialScreenRequestDetail;
