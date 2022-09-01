import React, { useState } from 'react';
import Button from '../../views/Components/Common/Buttons/Buttons';
import "react-datepicker/dist/react-datepicker.css";
import '../TrialRequests/TrialRequests.css'
import '../../Patient/MyAppointments/MyAppointments.css'
import '../../Patient/MyFavorites/MyFavorites.css'
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import OtpInput from 'react-otp-input';
import { InputText } from '../../views/Components/Common/Inputs/Inputs';

const Payment = () => {
    /* payment option popup */
    const [otpSent, setOtpSent] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);

    const OtpSent = () => {
        setOtpSent(true);
    }

    const PaymentOption = () => {
        setPaymentOption(!paymentOption);
    }
    /* payment option popup */

    const [otp, setOtp] = useState();

    return (
        <>
            <div className="clinical-dashboard screenPatientDetail">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Payment</h1>
                        <button type='button' className='btn-text'>Skip Payment and Create Visit</button>
                    </div>
                    <div className='repeat-white-bx container-small'>
                        <h2>Choose Payment Option</h2>
                        <div className='update-status'>
                            <RadioBtn className="radio-btn" type="radio" name="payment-option" labelText="Cash" defaultChecked="true" onChange={PaymentOption} />
                            {
                                paymentOption ?
                                    null
                                    :
                                    <>
                                        {
                                            otpSent ?
                                                null
                                                :
                                                <div className='send-otp mb-4'>
                                                    <InputText
                                                        type="number"
                                                        labelText="Patient Phone Number"
                                                        placeholder="Enter Patient Phone Number"
                                                    />
                                                    <Button
                                                        isButton="true"
                                                        BtnType="submit"
                                                        BtnColor="primary"
                                                        BtnText="Send OTP"
                                                        onClick={OtpSent}
                                                    />
                                                </div>
                                        }
                                        {
                                            otpSent ?
                                                <div className='from-group otp-bx-outer mb-4'>
                                                    <label>Enter OTP</label>
                                                    <OtpInput
                                                        containerStyle="otp-bx"
                                                        value={otp}
                                                        name="otp"
                                                        onChange={setOtp}
                                                        isInputNum="true"
                                                        numInputs={4}
                                                        inputStyle="form-control"
                                                        shouldAutoFocus={true}
                                                    />
                                                    <div className='resend-otp'>
                                                        <button>Resend OTP?</button>
                                                    </div>
                                                </div>
                                                :
                                                null
                                        }
                                    </>
                            }
                        </div>
                        <div className='update-status'>
                            <RadioBtn className="radio-btn" type="radio" name="payment-option" labelText="Bank" onChange={PaymentOption} />
                            {
                                paymentOption ?
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
                                    </>
                                    :
                                    null
                            }
                            <InputText
                                type="text"
                                name="amount"
                                placeholder="Enter Amount"
                                labelText="Amount ($)"
                            />

                            <Button
                                isButton="true"
                                BtnType="submit"
                                BtnColor="primary w-100"
                                BtnText="Paid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
