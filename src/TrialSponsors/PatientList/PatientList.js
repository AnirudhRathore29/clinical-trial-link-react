import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Button from '../../views/Components/Common/Buttons/Buttons';
import CommonModal from '../../views/Components/Common/Modal/Modal'
import { InputText } from '../../views/Components/Common/Inputs/Inputs';
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { TrialSpoPatientListAction, TrialSpoPatientDetailAction } from '../../redux/actions/TrialSponsorAction';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import moment from 'moment';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const SponsorsPatientList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams()
    const trialAppPatientSelector = useSelector(state => state.My_trials.patient_list.data)
    const patientDetailSelector = useSelector(state => state.My_trials.patient_detail.data)
    const isloading = useSelector(state => state.My_trials);

    const [loadMoreData, setLoadMoreData] = useState(1);
    const [patientDetail, setPatientDetail] = useState();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    console.log("patientDetail", patientDetail);

    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: null
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Patient',
            colorByPoint: true,
            data: [{
                name: 'No. of Patient Applied',
                y: 2000,
                color: "#CDEB8B"
            }, {
                name: 'No. of Patient Attended',
                y: 1000,
                color: "#4096EE"
            }]
        }]
    }

    const handleShow2 = () => {
        setShow(false)
        setShow2(true)
    }
    const handleClose2 = () => setShow2(false);

    useEffect(() => {
        dispatch(TrialSpoPatientListAction(id, { page: loadMoreData }))
    }, [dispatch, loadMoreData])

    useEffect(() => {
        setPatientDetail(patientDetailSelector)
    }, [patientDetailSelector]);

    const handlePatientModalOpen = (id) => {
        dispatch(TrialSpoPatientDetailAction(id))
        setShow(true)
    };

    const handleClose = () => {
        setShow(false)
        setPatientDetail()
    };

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }

    const handleRedirectUser2Chat = (data) => {
        history.push({
            pathname: "/trial-sponsors/my-chats",
            state: {
                full_name: data.patient_user_info.first_name + " " + data.patient_user_info.last_name,
                id: data.patient_user_info.id,
                profile_image: data.patient_user_info.profile_image,
            }
        })
    }

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Patient List <span>Bipolar Depression Study with 6 Month Open Label Therapy</span></h1>
                    </div>

                    <div className='row'>
                        {trialAppPatientSelector !== undefined ?
                            trialAppPatientSelector.isPast ?
                                <div className='col-lg-3'>
                                    <div className='patientChartInfo'>
                                        <h2>Patient information</h2>
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                        />
                                        <div className='chart-legends'>
                                            <span>No. of Patient Applied</span>
                                            <span>No. of Patient Attended</span>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className={trialAppPatientSelector.isPast ? "col-lg-9" : 'col-12'}>
                                    <table className='patient-list-table'>
                                        <thead>
                                            <tr>
                                                <th align='center'>#</th>
                                                <th>Patient Name</th>
                                                <th>Status</th>
                                                <th>Visit Number</th>
                                                <th>Location</th>
                                                <th>Date & Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trialAppPatientSelector.data.data?.length !== 0 ?
                                                trialAppPatientSelector.data.data.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className='patient-img'>
                                                                    <img src={value.patient_user_info.profile_image !== null ? value.patient_user_info.profile_image : "/images/placeholder-img.jpg"} alt={value.patient_user_info.first_name} />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <h2>{value.patient_user_info.first_name} {value.patient_user_info.last_name}</h2>
                                                            </td>
                                                            <td>
                                                                {value.status === 1 ?
                                                                    <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                                                    :
                                                                    value.status === 3 ?
                                                                        <span className='badge badge-success d-inline-block mb-3'>Completed</span>
                                                                        :
                                                                        <span className='badge badge-danger d-inline-block mb-3'> Cancelled </span>
                                                                }
                                                            </td>
                                                            <td>
                                                                <strong>{value.patient_user_info.phone_number}</strong>
                                                            </td>
                                                            <td>{value.patient_user_info.address}, {value.patient_user_info.state_info.name}</td>
                                                            <td className='no-wrap'>{moment(value.appointment_date).format("MMMM DD, YYYY")},
                                                                <br /> ({value.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to {value.trial_clinic_appointment_slot_info.booking_slot_info.to_time})
                                                            </td>
                                                            <td>
                                                                <div className='btn-group-custom'>
                                                                    <button className="btn-action btn-green" onClick={() => handlePatientModalOpen(value.id)}><box-icon type='solid' name='info-circle' color="#ffffff"></box-icon></button>
                                                                    {!trialAppPatientSelector.isPast &&
                                                                        <>
                                                                            <a href={`tel:${value.patient_user_info.phone_number}`} className="btn-action btn-primary"><box-icon name='phone' color="#ffffff"></box-icon></a>

                                                                            <button className="btn-action btn-primary" onClick={() => handleRedirectUser2Chat(value)}>
                                                                                <box-icon name='message-rounded-dots' color="#ffffff"></box-icon>
                                                                            </button>
                                                                        </>
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td colSpan="8">
                                                        <NoDataFound />
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                    {trialAppPatientSelector.data.total > 16 &&
                                        <div className='col-12 mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={handleLoadMore}
                                                disabled={trialAppPatientSelector.data.last_page === trialAppPatientSelector.data.current_page || isloading.loading}
                                                hasSpinner={isloading.loading}
                                            />
                                        </div>
                                    }
                                </div>
                            :
                            [1, 2, 3, 4].map((_, index) => {
                                return (
                                    <div className='bg-transparent' key={index}>
                                        <div className='p-0' colSpan="8">
                                            <Skeleton height={125} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <CommonModal className="custom-size-modal" show={show} onHide={handleClose} keyboard={false}
                ModalTitle="Patient Details"
                onClick={handleClose}
                ModalData={
                    patientDetail !== undefined ?
                        <>
                            <div className='appointment-detail patient-appointment-details'>
                                <img src={patientDetail.data.patient_user_info.profile_image !== null ? patientDetail.data.patient_user_info.profile_image : "/images/placeholder-img.jpg"} alt={patientDetail.data.patient_user_info.first_name} />

                                <div>
                                    <h2> {patientDetail.data.patient_user_info.first_name + " " + patientDetail.data.patient_user_info.last_name} </h2>
                                    {patientDetail.data.status === 1 ?
                                        <span className='badge badge-primary d-inline-block mb-3'>Approved</span>
                                        :
                                        <span className='badge badge-success d-inline-block mb-3'>Completed</span>
                                    }
                                    <p><strong>Visit Number :</strong> {patientDetail.data.visit_number} </p>
                                </div>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Date & Time</h2>
                                <p>{moment(patientDetail.data.appointment_date).format("MMMM DD, YYYY")} ({patientDetail.data.trial_clinic_appointment_slot_info.booking_slot_info.from_time} to {patientDetail.data.trial_clinic_appointment_slot_info.booking_slot_info.to_time})</p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Clinic Address</h2>
                                <p> {patientDetail.data.trial_clinic_user_info.address} </p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Trial for</h2>
                                <p> {patientDetail.data.clinic_trial_info.trial_name} </p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Trial Compensation</h2>
                                <p>$ {patientDetail.data.compensation == null ? "0" : patientDetail.data.compensation} </p>
                            </div>
                            <div className='appointment-detail-col'>
                                <h2>Trial Clinic</h2>
                                <p> {patientDetail.data.trial_clinic_user_info.clinic_name} </p>
                            </div>
                            <div className='clnicaltrial-detail-ftr'>
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="primary w-100"
                                    BtnText="Pay"
                                    onClick={handleShow2}
                                />
                            </div>
                        </>
                        :
                        <LogoLoader />
                }
            />

            <CommonModal show={show2} onHide={handleClose2} keyboard={false}
                ModalTitle="Payment"
                onClick={handleClose2}
                size="md"
                ModalData={
                    <>
                        <InputText
                            type="text"
                            name="bank_name"
                            placeholder="Enter Bank Name"
                            labelText="Name of Bank"
                        />
                        <InputText
                            type="text"
                            name="account_holder_name"
                            placeholder="Enter Name"
                            labelText="Account Holder Name"
                        />
                        <InputText
                            type="text"
                            name="account_number"
                            placeholder="Enter Account Number"
                            labelText="Account Number"
                        />
                        <InputText
                            type="text"
                            name="routing_number"
                            placeholder="Enter Routing Number"
                            labelText="Routing Number"
                        />
                        <InputText
                            type="text"
                            name="amount"
                            placeholder="Enter Amount"
                            labelText="Amount ($)"
                        />
                        <div className='clnicaltrial-detail-ftr'>
                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Paid"
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};

export default SponsorsPatientList;
