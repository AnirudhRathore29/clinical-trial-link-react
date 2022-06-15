import { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import Button from '../../views/Components/Common/Buttons/Buttons';
import MyAppointmentBx from '../../views/Components/MyAppointmentBx/MyAppointmentBx';
import '../../Patient/MyAppointments/MyAppointments.css';
import '../../Patient/ClinicListing/ClinicListing.css';
import '../../Patient/MyFavorites/MyFavorites.css'
import { TrialApplicationsAction } from '../../redux/actions/TrialClinicAction';
import { useDispatch, useSelector } from 'react-redux';

const ClinicTrialApplication = () => {
    const dispatch = useDispatch();
    const trialAppSelector = useSelector(state => state.trial_clinic.trial_app.data);
    const isloading = useSelector(state => state.trial_clinic);

    const [tabName, setTabName] = useState("Pending")
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    console.log("trialAppSelector", trialAppSelector)

    useEffect(() => {
        let data = {
            page: loadMoreData,
            application_tab: tabName,
        }
        dispatch(TrialApplicationsAction(data))
    }, [dispatch, tabName])


    const handleSelect = (key) => {
        setTabName(key)
    }
    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Trial Applications</h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="Pending" className="pricing-tabs" id="plans-tabs" onSelect={handleSelect}>
                                <Tab eventKey="Pending" title="Pending">
                                    <div className='row'>
                                        {trialAppSelector && trialAppSelector.data.data.map((value, index) => {
                                            return (
                                                <div className='col-lg-6 mb-5' key={index}>
                                                    <MyAppointmentBx
                                                        onClick={handleShow}
                                                        imgUrl={value.sponsor_user_info.listing_image}
                                                        title="ABF Pharmaceutical"
                                                        status="Pending"
                                                        statusClass="primary"
                                                        location={value.sponsor_user_info.address}
                                                        state={value.sponsor_user_info.state_info.name}
                                                        time="Jan 20, 2022 (09:00 AM to 11:00 AM)"
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Tab>
                                <Tab eventKey="Current" title="Current">
                                    <div className='row'>
                                        {trialAppSelector && trialAppSelector.data.data.map((value, index) => {
                                            return (
                                                <div className='col-lg-6 mb-5' key={index}>
                                                    <MyAppointmentBx
                                                        onClick={handleShow}
                                                        imgUrl={value.sponsor_user_info.listing_image}
                                                        title="ABF Pharmaceutical"
                                                        status="Eligible"
                                                        statusClass="primary"
                                                        location={value.sponsor_user_info.address}
                                                        state={value.sponsor_user_info.state_info.name}
                                                        time="Jan 20, 2022 (09:00 AM to 11:00 AM)"
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* {sponsorsTrialListSelector && sponsorsTrialListSelector.data.data.length >= 20 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => setLoadMoreData(loadMoreData + 1)}
                                                disabled={sponsorsTrialListSelector.data.last_page === sponsorsTrialListSelector.data.current_page}
                                            />
                                        </div>
                                    } */}
                                </Tab>
                                <Tab eventKey="Past" title="Past">
                                    <div className='row'>
                                        <div className='col-lg-6 mb-5'>
                                            <MyAppointmentBx
                                                onClick={handleShow}
                                                imgUrl="clinic-img1.jpg"
                                                title="Barnes Jewish Hospital"
                                                status="Cancelled"
                                                statusClass="danger"
                                                location="Atlanta, Georgia, United States"
                                                time="Jan 20, 2022 (09:00 AM to 11:00 AM)"
                                            />
                                        </div>
                                        <div className='col-lg-6 mb-5'>
                                            <MyAppointmentBx
                                                onClick={handleShow}
                                                imgUrl="clinic-img3.jpg"
                                                title="Barnes Jewish Hospital"
                                                status="completed"
                                                statusClass="success"
                                                location="Atlanta, Georgia, United States"
                                                time="Jan 20, 2022 (09:00 AM to 11:00 AM)"
                                            />
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

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
                        <div className='clnicaltrial-description'>
                            <h2>Cancellation Reason</h2>
                            <p>Not Eligible</p>
                        </div>
                        <div className='clnicaltrial-description'>
                            <h2>Select Recruiting Time</h2>
                            <div className='available-time'>
                                <div className='time-row'>
                                    <label>
                                        <input type="checkbox" name='available_time' defaultChecked="true" />
                                        <span>09:00 AM - 11:00 AM</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" name='available_time' />
                                        <span>11:00 AM - 01:00 PM</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" name='available_time' />
                                        <span>01:00 PM - 03:00 PM</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" name='available_time' />
                                        <span>03:00 PM - 05:00 PM</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" name='available_time' />
                                        <span>05:00 PM - 07:00 PM</span>
                                    </label>
                                    <label>
                                        <input type="checkbox" name='available_time' />
                                        <span>05:00 PM - 07:00 PM</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Start Recruiting"
                                onClick={handleClose}
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default ClinicTrialApplication;
