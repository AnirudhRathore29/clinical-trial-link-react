import moment from 'moment';
import { useEffect, useState } from 'react';
import '../../Patient/PaymentHistory/PaymentHistory.css';
import { authHeader } from '../../redux/actions/authHeader';
import getCurrentHost from '../../redux/constants';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Button from '../../views/Components/Common/Buttons/Buttons';

var jwt = require('jsonwebtoken');
const SponsorsPaymentHistory = () => {
    const [ListSelectorState, setListSelectorState] = useState(undefined);
    const [Loader, setLoader] = useState(false);
    const [LoadMoreState, setLoadMoreState] = useState(1)

    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)

    console.log("ListSelectorState", ListSelectorState);
    console.log("profileDetails", profileDetails);

    const handleLoadMore = () => {
        setLoader(true)
        setLoadMoreState(LoadMoreState + 1)
    }

    useEffect(() => {
        const configure = {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({ page: LoadMoreState, })
        }
        fetch(getCurrentHost() + `/${profileDetails?.role === 5 ? "sponsor" : profileDetails?.role === 2 ? "patient" : profileDetails?.role === 4 ? "physician" : null}/get-payment-history`, configure)
            .then(response => response.json())
            .then(response => {
                setLoader(false)
                setListSelectorState(response)
            })
    }, [LoadMoreState])

    return (
        <>
            <div className="clinical-dashboard my-favorites-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Payment History</h1>
                    </div>
                    <div className="repeat-white-bx">
                        <div className='container-smallx'>
                            <div className='row'>
                                <div className='col-lg-4'>
                                    <div className='total-compensation'>
                                        <h4>{(profileDetails?.role === 2 || profileDetails?.role === 4) ? "Total Compensation Received" : profileDetails?.role === 5 ? "Total Compensation Paid" : null}</h4>
                                        <h2>${(profileDetails?.role === 2 || profileDetails?.role === 4) ? ListSelectorState?.totalCompensationReceived : ListSelectorState?.totalCompensationPaid}</h2>
                                    </div>
                                </div>
                                <div className='col-lg-8'>
                                    <div className='payment-history-row'>
                                        <h2 className='mb-4'>Transactions</h2>
                                        {ListSelectorState !== undefined ?
                                            ListSelectorState?.data?.data?.length > 0 ?
                                                ListSelectorState?.data?.data?.map((value, index) => {
                                                    return (
                                                        <div className='payment-history' key={index}>
                                                            <div className='payment-history-icon'>
                                                                <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                            </div>
                                                            <div className='payment-history-details'>
                                                                <h2 className='mb-0'><span><strong>Transaction ID :</strong> {value?.transaction_id}</span> <span className='amount'>${value?.amount}</span></h2>
                                                                <small>{moment(value?.transaction_datetime).format("MMMM DD, YYYY (HH:MM:SS)")}</small>
                                                                <p><strong>Visit Number :</strong> {value?.trial_clinic_appointment_info?.visit_number}</p>
                                                                <p><strong>Type :</strong> {value?.paid_by}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <NoDataFound />
                                            :
                                            [1, 2, 3, 4].map((_, index) => {
                                                return (
                                                    <div className='mb-2' key={index}>
                                                        <Skeleton height={120} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    {ListSelectorState?.data?.data?.length > 16 &&
                                        <div className='mt-5 text-center'>
                                            <Button
                                                isButton="true"
                                                BtnColor="primary"
                                                BtnText="Load More"
                                                onClick={() => handleLoadMore()}
                                                disabled={ListSelectorState?.data?.last_page === ListSelectorState?.data?.current_page}
                                                hasSpinner={Loader}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SponsorsPaymentHistory;
