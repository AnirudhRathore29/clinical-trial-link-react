import React, { useEffect, useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import "react-datepicker/dist/react-datepicker.css";
import '../TrialRequests/TrialRequests.css'
import '../../Patient/MyAppointments/MyAppointments.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import { InputText } from '../../views/Components/Common/Inputs/Inputs';
import { TrialRequestAppStatusUpdateAction } from '../../redux/actions/TrialSponsorAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

toast.configure();

const SponsorPayment = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const requestStatusSelector = useSelector(state => state.My_trials)

    const [paymentOption, setPaymentOption] = useState("Cash");
    const [FieldData, setFieldData] = useState({});

    console.log("props?.location?.state", props?.location?.state);
    console.log("FieldData", FieldData);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFieldData((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    };

    const CompletePayment = () => {
        if(paymentOption === "Cash"){
            dispatch(TrialRequestAppStatusUpdateAction({ ...props?.location?.state, amount: FieldData?.amount, paid_by: paymentOption, transaction_datetime: moment(new Date()).format("YYYY-MM-DD HH:MM:SS") }))
        } else {
            toast.error("Bank option not available", { theme: "colored" });
        }
    }

    const PaymentOption = (method) => setPaymentOption(method);

    useEffect(() => {
        if (Object.keys(requestStatusSelector.new_request_status).length > 0 && !requestStatusSelector.loading) {
            toast.success(requestStatusSelector.new_request_status.data.message, { theme: "colored" })
            history.push("/trial-sponsors/trial-requests")
        } else if (Object.keys(requestStatusSelector.error).length > 0 && !requestStatusSelector.loading) {
            toast.error(requestStatusSelector.error.message, { theme: "colored" });
        }
    }, [requestStatusSelector])
    return (
        <>
            <div className="clinical-dashboard screenPatientDetail">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Payment</h1>
                    </div>
                    <div className='repeat-white-bx container-small'>
                        <h2>Choose Payment Option</h2>
                        <div className='update-status'>
                            <RadioBtn className="radio-btn" type="radio" name="payment-option" labelText="Cash" defaultChecked="true" onChange={() => PaymentOption("Cash")} />
                            <RadioBtn className="radio-btn" type="radio" name="payment-option" labelText="Bank" onChange={() => PaymentOption("Bank")} />
                        </div>
                        {
                            paymentOption === "Bank" &&
                                <>
                                    <InputText
                                        type="text"
                                        name="bank_name"
                                        placeholder="Enter Bank Name"
                                        labelText="Name of Bank"
                                        onChange={onChange}
                                    />
                                    <InputText
                                        type="text"
                                        name="account_holder_name"
                                        placeholder="Enter Name"
                                        labelText="Account Holder Name"
                                        onChange={onChange}
                                    />
                                    <InputText
                                        type="text"
                                        name="account_number"
                                        placeholder="Enter Account Number"
                                        labelText="Account Number"
                                        onChange={onChange}
                                    />
                                    <InputText
                                        type="text"
                                        name="routing_number"
                                        placeholder="Enter Routing Number"
                                        labelText="Routing Number"
                                        onChange={onChange}
                                    />
                                </>
                        }
                        <InputText
                            type="text"
                            name="amount"
                            placeholder="Enter Amount"
                            labelText="Amount ($)"
                            onChange={onChange}
                        />
                        <Button
                            isButton="true"
                            BtnType="submit"
                            BtnColor="primary w-100"
                            BtnText="Pay"
                            hasSpinner={requestStatusSelector?.loading}
                            disabled={requestStatusSelector?.loading}
                            onClick={CompletePayment}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SponsorPayment;
