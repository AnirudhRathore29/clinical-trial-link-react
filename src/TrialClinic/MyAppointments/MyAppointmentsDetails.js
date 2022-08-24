import React, { useEffect, useState } from 'react';
import { SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import '../TrialRequests/TrialRequests.css'
import '../../Patient/MyAppointments/MyAppointments.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import { NewScreenTrialRequestDetailAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';

const MyAppointmentsDetails = () => {
    const [addVisitModal, setAddVisitModal] = useState(false);
    const [CancelReasonModal, setCancelReasonModal] = useState(false);
    const [ConfirmationModal, setConfirmationModal] = useState(false);
    const [CompleteTrialModal, setCompleteTrialModal] = useState(false);
    const [SelectedStatus, setSelectedStatus] = useState();
    const [startDate, setStartDate] = useState(new Date());

    const loadingSelector = useSelector(state => state.trial_clinic)
    const screenPatientDetail = useSelector(state => state.trial_clinic.new_screen_trial_detail.data)

    const { id } = useParams()
    const dispatch = useDispatch()

    console.log("screenPatientDetail", screenPatientDetail);


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
        setCompleteTrialModal(true)
    }

    const ConfirmationModalClose = () => {
        setSelectedStatus(0)
        setConfirmationModal(false)
    }

    const CompleteTrialModalClose = () => {
        setCompleteTrialModal(false)
        setAddVisitModal(true)
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
                        <h1>Appointment Details</h1>
                    </div>
                    <div className='repeat-white-bx mb-5'>
                        <div className='PatientDetailsHeader'>
                            <div className='appointment-detail patient-appointment-details'>
                                <img src="/images/avatar-img3.jpg" alt="clinic-img" />
                                <div className=''>
                                    <h2 className='mb-2'>Barnes Jewish Hospital</h2>
                                    <span className='badge badge-primary d-inline-block mb-2'>Approved</span>
                                    <p><strong>Trial Visit Number :</strong> 25632156</p>
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
                                            <option value="1">Complete</option>
                                            <option value="2">Incomplete</option>
                                            <option value="3">Early Termination</option>
                                        </>
                                    }
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Date & Time</h2>
                                    <p>Jan 25, 2022 (09:00 AM to 11:00 AM)</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Clinic Address</h2>
                                    <p>Atlanta, Georgia, United States</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Trial for</h2>
                                    <p>Adolescents with ADHD and a Parent with Bipolar Disorder</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Trial Compensation</h2>
                                    <p>To be Decided at Clinic</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment-detail-col'>
                                    <h2>Sponsor</h2>
                                    <p>Emerson Resources</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='repeat-white-bx'>
                        <h2 className="section-title"> Trial Visits </h2>

                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='patientVisit'>
                                    <h3><strong>Visit Number :</strong> 25632156</h3>
                                    <p>Jan 25, 2022 (09:00 AM to 11:00 AM)</p>
                                    <span className='badge badge-success d-inline-block mb-3'>Completed</span>
                                    <p>Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='patientVisit'>
                                    <h3><strong>Visit Number :</strong> 25632156</h3>
                                    <p>Jan 25, 2022 (09:00 AM to 11:00 AM)</p>
                                    <span className='badge badge-danger d-inline-block mb-3'>Incomplete</span>
                                    <p>Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='patientVisit'>
                                    <h3><strong>Visit Number :</strong> 25632156</h3>
                                    <p>August 17, 2022, (11:00 AM to 01:00 PM)</p>
                                    <SelectBox
                                        name="condition"
                                        FormGroupClass="mb-0"
                                        onChange={CheckStatus}
                                        value={SelectedStatus}
                                        optionData={
                                            <>
                                                <option hidden value="0">Update Status</option>
                                                <option value="1">Complete</option>
                                                <option value="2">Incomplete</option>
                                                <option value="3">Early Termination</option>
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
                                BtnType="button"
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
                ModalTitle="Appointment Notes"
                onClick={CancelReasonModalClose}
                ModalData={
                    <form autoComplete="off">
                        <TextArea
                            placeholder="Enter Here..."
                            labelText="Enter Appointment Notes"
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

            <CommonModal show={CompleteTrialModal} onHide={CompleteTrialModalClose} keyboard={false} size="md"
                onClick={CompleteTrialModalClose}
                ModalData={
                    <>
                        <button type="button" className="btn-close" aria-label="Close" onClick={CompleteTrialModalClose}></button>
                        <div className='congrats-bx'>
                            <h2>Trial Visit Successfully Completed</h2>
                            <p>Lorem ipsum dolor amet sectetur adipiscing vehicula diam nis in congue tortor sem, varius eu nulla volutpatmollis . </p>
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isLink="true"
                                URL="/trial-clinic/payment"
                                BtnColor="green btn-sm"
                                BtnText="End of Study"
                            />
                            <Button
                                isButton="true"
                                BtnColor="primary btn-sm"
                                BtnText="Create New Visit"
                                onClick={CompleteTrialModalClose}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default MyAppointmentsDetails;
