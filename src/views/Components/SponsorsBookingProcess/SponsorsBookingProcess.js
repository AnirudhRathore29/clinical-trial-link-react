import CommonModal from '../Common/Modal/Modal'
import Button from '../Common/Buttons/Buttons';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { TextArea } from '../Common/Inputs/Inputs';

const ClinicSponsorsBookingProcess = ({ show, handleClose, show2, handleClose2, handleShow2, show3, handleClose3, handleShow3 }) => {

    return (
        <>
            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle={
                    <>
                        <h2>Depression Associated with Bipolar Disorder</h2>
                        <div className="trialClinic-location">
                            <span><box-icon name='edit-alt' color="#356AA0" size="18px"></box-icon> Updated on November 23, 2020</span>
                            <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                        </div>
                    </>
                }
                onClick={handleClose}
                ModalData={
                    <>
                        <div className='sponser-price-info'>
                            <div className='sponser-price-row w-100 br-none'>
                                <div className='sponser-price-icon'>
                                    <box-icon name='dollar' size="30px" color="#356AA0"></box-icon>
                                </div>
                                <div>
                                    <h4>To be Decided by Company</h4>
                                    <h2>Trial Reimbursement</h2>
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
                                BtnType="submit"
                                BtnColor="green"
                                BtnText="Apply for Trial"
                                onClick={handleShow2}
                            />
                            <Link to="/trial-clinic/my-chats" className="btn-action btn-primary"><box-icon name='message-rounded-dots' color="#ffffff"></box-icon></Link>
                        </div>
                    </>
                }
            />

            <CommonModal show={show2} onHide={handleClose2} keyboard={false} size="md"
                ModalTitle="Apply for Trial"
                onClick={handleClose2}
                ModalData={
                    <>
                        <div className="col-lg-12 form-group">
                            <label>Upload Clinic Document</label>
                            <label className="upload-document w-100">
                                <input type="file" />
                                <div>
                                    <h4>No File Uploaded</h4>
                                    <h3>Tap Here to Upload your File</h3>
                                </div>
                            </label>
                        </div>
                        <div className='info-bx br-none p-0 form-group'>
                            <box-icon type='solid' name='info-circle' color="#4096EE" size="34px"></box-icon> Upload your Trial Document as the main requirement to Apply for a Trial
                        </div>
                        <div className="col-lg-12">
                            <TextArea
                                name="brief_intro"
                                placeholder="Enter Brief Intro"
                                labelText="Brief Intro"
                            />
                        </div>
                        <div className='clnicaltrial-detail-ftr mt-0'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Confirm"
                                onClick={handleShow3}
                            />
                        </div>
                    </>
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
                            <p>You applied an Trial with <strong>ABF Pharmaceutical</strong> <br /> for <strong>Depression Associated with Bipolar</strong> <br /> Disorder</p>
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