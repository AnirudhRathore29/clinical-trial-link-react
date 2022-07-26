import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ClinicTrial from '../../views/Components/ClinicTrial/ClinicTrial';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import { myTrialAction } from '../../redux/actions/TrialSponsorAction';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../Patient/MyFavorites/MyFavorites.css';

const SponsorsMyStudies = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const myTrialSelector = useSelector(state => state.My_trials.my_trial.data)
    const isloading = useSelector(state => state.My_trials);

    const [tabName, setTabName] = useState("Current")
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [selectorData, setSelectorData] = useState(undefined)

    const handleSelect = (key) => {
        setSelectorData(undefined)
        setTabName(key)
    }
    useEffect(() => {
        dispatch(myTrialAction({ page: loadMoreData, application_tab: tabName }))
    }, [dispatch, tabName, loadMoreData])

    useEffect(() => {
        setSelectorData(myTrialSelector)
    }, [myTrialSelector])

    const handleLoadMore = (key) => {
        setLoadMoreData(loadMoreData + 1)
        setTabName(key)
    }
    return (
        <>
            <div className="clinical-dashboard my-appointment-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Trials</h1>
                    </div>
                    <div className='repeat-white-bx'>
                        <div className='tab-outer'>
                            <Tabs defaultActiveKey="Current" className="pricing-tabs" id="plans-tabs" onSelect={handleSelect}>
                                <Tab eventKey="Current" title="Current">
                                    <div className='row text-start'>
                                        {selectorData !== undefined ?
                                            selectorData.data.data.length > 0 ?
                                                selectorData.data.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-3' key={index}>
                                                            <ClinicTrial
                                                                onClick={() => history.push(`/trial-sponsors/appointments-clinics/${value.id}`)}
                                                                className="mb-4 white-trial-bx"
                                                                title={value.trial_name}
                                                                status={
                                                                    value.status === 1 ?
                                                                        <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting </span>
                                                                        :
                                                                        <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close </span>
                                                                }
                                                                dateTime="Jan 25, 2022 (09:00 AM)"
                                                                trialAmount={value.compensation}
                                                                // ShareFav="false"
                                                            />
                                                        </div>
                                                    )
                                                })
                                                :
                                                <NoDataFound />
                                            :
                                            [1, 2, 3, 4].map((_, index) => {
                                                return (
                                                    <div className='col-lg-6 mb-5' key={index}>
                                                        <Skeleton height={200} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    {selectorData && selectorData.data.total > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore("Current")}
                                                disabled={selectorData.data.last_page === selectorData.data.current_page}
                                                hasSpinner={isloading.loading}
                                            />
                                        </div>
                                    }
                                </Tab>
                                <Tab eventKey="Past" title="Past">
                                    <div className='row text-start'>
                                        {selectorData !== undefined ?
                                            selectorData.data.data.length > 0 ?
                                                selectorData.data.data.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-6 mb-3' key={index}>
                                                            <ClinicTrial
                                                                onClick={() => history.push(`/trial-sponsors/appointments-clinics/${value.id}`)}
                                                                className="mb-4 white-trial-bx"
                                                                title={value.trial_name}
                                                                status={
                                                                    value.status === 1 ?
                                                                        <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Completed </span>
                                                                        :
                                                                        <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close </span>
                                                                }
                                                                dateTime="Jan 25, 2022 (09:00 AM)"
                                                                trialAmount={value.compensation}
                                                                // ShareFav="false"
                                                            />
                                                        </div>
                                                    )
                                                })
                                                :
                                                <NoDataFound />
                                            :
                                            [1, 2, 3, 4].map((_, index) => {
                                                return (
                                                    <div className='col-lg-6 mb-5' key={index}>
                                                        <Skeleton height={200} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {selectorData && selectorData.data.total > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore("Past")}
                                                disabled={selectorData.data.last_page === selectorData.data.current_page}
                                                hasSpinner={isloading.loading}
                                            />
                                        </div>
                                    }
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SponsorsMyStudies;
