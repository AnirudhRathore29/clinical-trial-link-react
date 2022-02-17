import './PaymentHistory.css';

const PatientPaymentHistory = () => {

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
                                        <h4>Total Compensation Received </h4>
                                        <h2>$555.00</h2>
                                    </div>
                                </div>
                                <div className='col-lg-8'>
                                    <div className='payment-history-row'>
                                        <h2 className='mb-4'>Detailed</h2>
                                        <div className='payment-history'>
                                            <div className='payment-history-icon'>
                                                <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                            </div>
                                            <div className='payment-history-details'>
                                                <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$50.00</span></h2>
                                                <p>Nov 30, 202 (11:00 AM)</p>
                                            </div>
                                        </div>
                                        <div className='payment-history'>
                                            <div className='payment-history-icon'>
                                                <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                            </div>
                                            <div className='payment-history-details'>
                                                <h2><span><strong>Visit Number :</strong> 25632780</span> <span className='amount'>$150.00</span></h2>
                                                <p>Nov 30, 202 (11:00 AM)</p>
                                            </div>
                                        </div>
                                        <div className='payment-history'>
                                            <div className='payment-history-icon'>
                                                <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                            </div>
                                            <div className='payment-history-details'>
                                                <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$350.00</span></h2>
                                                <p>Nov 30, 202 (11:00 AM)</p>
                                            </div>
                                        </div>
                                        <div className='payment-history'>
                                            <div className='payment-history-icon'>
                                                <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                            </div>
                                            <div className='payment-history-details'>
                                                <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$90.00</span></h2>
                                                <p>Nov 30, 202 (11:00 AM)</p>
                                            </div>
                                        </div>
                                        <div className='payment-history'>
                                            <div className='payment-history-icon'>
                                                <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                            </div>
                                            <div className='payment-history-details'>
                                                <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$50.00</span></h2>
                                                <p>Nov 30, 202 (11:00 AM)</p>
                                            </div>
                                        </div>
                                        <div className='payment-history'>
                                            <div className='payment-history-icon'>
                                                <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                            </div>
                                            <div className='payment-history-details'>
                                                <h2><span><strong>Visit Number :</strong> 25632780</span> <span className='amount'>$150.00</span></h2>
                                                <p>Nov 30, 202 (11:00 AM)</p>
                                            </div>
                                        </div>
                                        <div className='payment-history'>
                                            <div className='payment-history-icon'>
                                                <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                            </div>
                                            <div className='payment-history-details'>
                                                <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$350.00</span></h2>
                                                <p>Nov 30, 202 (11:00 AM)</p>
                                            </div>
                                        </div>
                                        <div className='payment-history'>
                                            <div className='payment-history-icon'>
                                                <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                            </div>
                                            <div className='payment-history-details'>
                                                <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$90.00</span></h2>
                                                <p>Nov 30, 202 (11:00 AM)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientPaymentHistory;
