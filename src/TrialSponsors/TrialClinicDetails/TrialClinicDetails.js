import { useEffect, useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import '../../Patient/TrialClinicDetails/TrialClinicDetails.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import { useDispatch, useSelector } from 'react-redux';
import { TrialClinicDetailsAction } from '../../redux/actions/TrialSponsorAction';
import { useParams } from 'react-router-dom';
import { LogoLoader } from '../../views/Components/Common/LogoLoader/LogoLoader';
import MapIframe from '../../views/Components/MapIframe/MapIframe';

const SponsorsClinicDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const clinicDetailSelector = useSelector(state => state.My_trials.clinic_detail.data);
    const [clinicDetailData, setClinicDetailData] = useState()

    useEffect(() => {
        setClinicDetailData(clinicDetailSelector)
    }, [clinicDetailSelector])

    useEffect(() => {
        dispatch(TrialClinicDetailsAction(id))
    }, [dispatch, id])

    useEffect(() => {
        return () => {
            setClinicDetailData("")
            dispatch(TrialClinicDetailsAction())
        };
    }, [dispatch]);

    return (
        <div className="clinical-dashboard">
            <div className="container">
                {clinicDetailData !== undefined ?
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="trialClinic-detail-bx">
                                <h1> {clinicDetailData.data.clinic_name}</h1>
                                <div className="trialClinic-location">
                                    <span><box-icon name='map' color="#356AA0"></box-icon> {clinicDetailData.data.address + ", " + clinicDetailData.data.address}</span>
                                    {/* <span><box-icon name='map-alt' color="#356AA0"></box-icon> 0 Mi</span> */}
                                </div>
                                <div className='trialClinic-img'>
                                    <img src="/images/clinic-img5.jpg" className='img-fluid' alt={clinicDetailData.data.clinic_name} />
                                </div>
                            </div>

                            {/* <div className="trialClinic-info-bx mt-5">
                                <h2>Specialty</h2>
                                <p>Lorem ipsum dolor sit amet,</p>
                            </div> */}

                            {clinicDetailData.data.user_speciality.length !== 0 &&
                                <div className="trialClinic-info-bx mt-5">
                                    <h2>Specialty</h2>
                                    <ul className='condition-ul'>
                                        {clinicDetailData.data.user_speciality.map((value, index) => {
                                            return (
                                                <li key={index}>{value.speciality_info.speciality_title}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }


                            {clinicDetailData.data.user_condition.length !== 0 &&
                                <div className="trialClinic-info-bx mt-5">
                                    <h2>Condition</h2>
                                    <ul className='condition-ul'>
                                        {clinicDetailData.data.user_condition.map((value, index) => {
                                            return (
                                                <li key={index}>{value.condition_info.condition_title}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }

                            {clinicDetailData.data.user_meta_info.brief_intro !== null &&
                                <div className="trialClinic-info-bx mt-5">
                                    <h2>Description</h2>
                                    <p> {clinicDetailData.data.user_meta_info.brief_intro} </p>
                                </div>
                            }
                        </div>

                        <div className="col-lg-4">
                            <div className="trialClinic-side-bx Clinic-map-view">
                                <MapIframe latitude={clinicDetailData.data.latitude} longitude={clinicDetailData.data.longitude} />
                                <div className='btn-group-custom mt-3'>
                                    <Button
                                        isLink="true"
                                        URL="/trial-sponsors/my-chats"
                                        BtnColor="green"
                                        BtnText="Message"
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary mx-3"
                                        BtnText="Call"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <LogoLoader />
                }
            </div>
        </div>
    );
};

export default SponsorsClinicDetails;
