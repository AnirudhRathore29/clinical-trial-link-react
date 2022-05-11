import { useEffect, useState } from 'react';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial'
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal';
import { InputText, SelectBox, TextArea } from '../../views/Components/Common/Inputs/Inputs';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import {useSelector, useDispatch} from 'react-redux'
import { ListTrials } from '../../redux/actions/TrialAction';
import '../../Patient/MyFavorites/MyFavorites.css';

const SponsorsTrials = () => {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    
    const Trials = useSelector((state) => state);
    console.log("my trials", Trials);
    const dispatch = useDispatch();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);

    const handleShow3 = () => {
        setShow3(true);
        handleClose2(true);
    }
    const handleClose3 = () => setShow3(false);


    useEffect(() => {
        dispatch(ListTrials())
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
                        <div className='col-lg-6'>
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow2}
                                title="Depression Associated with Bipolar Disorder"
                                description="Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a..."
                                status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                iconColor="#356AA0"
                                ShareFav="false"
                            />
                        </div>
                        <div className='col-lg-6'>
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow2}
                                title="Study Seeking Patients with Bipolar Depression"
                                description="A Phase 3, Randomized, Double-Blind, Placebo Controlled, Parallel-Group, Multicenter, Foxed-Dose..."
                                status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                iconColor="#356AA0"
                                ShareFav="false"
                            />
                        </div>
                        <div className='col-lg-6'>
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow2}
                                title="Bipolar Depression Study with 6 Month Open Label Therapy"
                                description="If you or someone you know suffers from bipolar depression, you may be eligible to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                                ShareFav="false"
                            />
                        </div>
                        <div className='col-lg-6'>
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow2}
                                title="Depression Associated with Bipolar Disorder"
                                description="Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                                ShareFav="false"
                            />
                        </div>
                        <div className='col-lg-6'>
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow2}
                                title="Study Seeking Patients with Bipolar Depression"
                                description="A Phase 3, Randomized, Double-Blind, Placebo Controlled, Parallel-Group, Multicenter, Foxed-Dose..."
                                status={<span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>}
                                iconColor="#356AA0"
                                ShareFav="false"
                            />
                        </div>
                        <div className='col-lg-6'>
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow2}
                                title="Bipolar Depression Study with 6 Month Open Label Therapy"
                                description="If you or someone you know suffers from bipolar depression, you may be eligible to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                                ShareFav="false"
                            />
                        </div>
                        <div className='col-lg-6'>
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow2}
                                title="Depression Associated with Bipolar Disorder"
                                description="Adults experiencing depression associated with bipolar disorder have the opportunity to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                                ShareFav="false"
                            />
                        </div>
                        <div className='col-lg-6'>
                            <ClinicTrial
                                className="mb-4 white-trial-bx"
                                onClick={handleShow2}
                                title="Bipolar Depression Study with 6 Month Open Label Therapy"
                                description="If you or someone you know suffers from bipolar depression, you may be eligible to participate in a..."
                                status={<span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>}
                                iconColor="#356AA0"
                                ShareFav="false"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <CommonModal show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Create Trial"
                onClick={handleClose}
                ModalData={
                    <>
                        <InputText
                            type="text"
                            placeholder="Enter Trial Name"
                            labelText="Trial Name"
                        />
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
                            labelText="Compensation"
                        />
                        <TextArea
                            name="description"
                            placeholder="Enter Description"
                            labelText="Description"
                        />
                        <RadioBtn
                            className="checkbox-btn"
                            type="checkbox"
                            name="t_c"
                            labelText="Send Invitation to Trial Clinics."
                        />
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnColor="primary w-100"
                                BtnText="Submit"
                            />
                        </div>
                    </>
                }
            />

            <CommonModal className="custom-size-modal" show={show2} onHide={handleClose2} keyboard={false}
                ModalTitle={
                    <>
                        <h2>Depression Associated with Bipolar Disorder</h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on November 23, 2020</span>
                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                        </div>
                    </>
                }
                onClick={handleClose2}
                ModalData={
                    <>
                        <div className='sponser-price-info'>
                            <div className='sponser-price-row w-100 br-none'>
                                <div className='sponser-price-icon'>
                                    <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                </div>
                                <div>
                                    <h4>Trial Compensation</h4>
                                    <h2>To be Decided by Company</h2>
                                </div>
                            </div>
                        </div>
                        <div className='info-bx'>
                            <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> Lorem ipsum dolor sit amet consectetur adipiscing eli am porta nunc eu nibh dignissim sit amet viverra.
                        </div>
                        <div className='clnicaltrial-description'>
                            <h2>Condition</h2>
                            <ul className='condition-ul'>
                                <li>Opioid Use Disorder</li>
                                <li>Hemorrhoids</li>
                                <li>Dementia</li>
                                <li>Bipolar Disorder</li>
                                <li>Alzheimer’s Disease</li>
                                <li>Depression</li>
                            </ul>
                        </div>
                        <div className='clnicaltrial-description'>
                            <h2>Description</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim, sit amet viverra lorem sagittis. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius. Ut vitae ex tincidunt urna sagittis ullamcorper ut congue elit. Etiam placerat turpis ligula, et lacinia nisl porttitor sed. nunc eu nibh dignissim, sit amet viverra lorem sagittis. In sit amet pulvinar orci. Integer ultrices ipsum vel gravida varius. Ut vitae exasd</p>
                        </div>
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
