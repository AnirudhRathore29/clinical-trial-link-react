import { Tabs, Tab } from 'react-bootstrap';
import '../../Patient/PaymentHistory/PaymentHistory.css';

const ClinicPaymentHistory = () => {

    return (
        <>
            <div className="clinical-dashboard my-favorites-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Payment History</h1>
                    </div>
                    <div className="repeat-white-bx">
                        <div className='container-smallx'>
                            <div className='tab-outer'>
                                <Tabs defaultActiveKey="received-compensation" className="pricing-tabs" id="plans-tabs">
                                    <Tab eventKey="received-compensation" title="Received">
                                        <div className='row text-start'>
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
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632780</span> <span className='amount'>$150.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$350.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$90.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$50.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632780</span> <span className='amount'>$150.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$350.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$90.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="paid-compensation" title="Paid">
                                        <div className='row text-start'>
                                            <div className='col-lg-4'>
                                                <div className='total-compensation'>
                                                    <h4>Total Compensation Paid </h4>
                                                    <h2>$55.00</h2>
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
                                                            <h2><span><strong>Visit Number :</strong> 25632780</span> <span className='amount'>$150.00</span></h2>
                                                            <p>Nov 15, 2022 (10:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25665780</span> <span className='amount'>$120.00</span></h2>
                                                            <p>Nov 16, 2022 (12:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25635660</span> <span className='amount'>$250.00</span></h2>
                                                            <p>Nov 18, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$190.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$150.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632780</span> <span className='amount'>$150.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$350.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                    <div className='payment-history'>
                                                        <div className='payment-history-icon'>
                                                            <box-icon name='history' color="#356AA0" size="40px"></box-icon>
                                                        </div>
                                                        <div className='payment-history-details'>
                                                            <h2><span><strong>Visit Number :</strong> 25632160</span> <span className='amount'>$90.00</span></h2>
                                                            <p>Nov 30, 2022 (11:00 AM)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClinicPaymentHistory;
