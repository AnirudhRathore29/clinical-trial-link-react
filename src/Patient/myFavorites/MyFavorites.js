import { useState } from 'react';
import PatientBookingProcess from '../../views/components/bookingProcess/BookingProcess';
import './MyFavorites.css';

const PatientMyFavorites = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [show2, setShow2] = useState(false);

    const handleShow2 = () => {
        setShow2(true);
        handleClose();
    }
    const handleClose2 = () => setShow2(false);

    const [show3, setShow3] = useState(false);

    const handleShow3 = () => {
        setShow3(true);
        handleClose2();
    }
    const handleClose3 = () => setShow3(false);

    return (
        <>
            <div className="clinical-dashboard my-favorites-section">
                <div className="container">
                    <div className="heading-bx">
                        <h1>My Favorites</h1>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='clinicalTrial-bx mb-4' onClick={handleShow}>
                                <h2>Bipolar Depression Study with 6 Month Open Label Therapy</h2>
                                <p>If you or someone you know suffers from bipolar depression, you may be eligible to participate in a...</p>
                                <div className='clinicalTrial-bx-ftr'>
                                    <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                    <div>
                                        <button className='icon-btn'><box-icon name='heart' type="solid" color="#356AA0"></box-icon></button>
                                        <button className='icon-btn'><box-icon name='share-alt' color="#356AA0"></box-icon></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='clinicalTrial-bx mb-4' onClick={handleShow}>
                                <h2>Bipolar Depression Study with 6 Month Open Label Therapy</h2>
                                <p>If you or someone you know suffers from bipolar depression, you may be eligible to participate in a...</p>
                                <div className='clinicalTrial-bx-ftr'>
                                    <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                    <div>
                                        <button className='icon-btn'><box-icon name='heart' type="solid" color="#356AA0"></box-icon></button>
                                        <button className='icon-btn'><box-icon name='share-alt' color="#356AA0"></box-icon></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='clinicalTrial-bx mb-4' onClick={handleShow}>
                                <h2>Bipolar Depression Study with 6 Month Open Label Therapy</h2>
                                <p>If you or someone you know suffers from bipolar depression, you may be eligible to participate in a...</p>
                                <div className='clinicalTrial-bx-ftr'>
                                    <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                    <div>
                                        <button className='icon-btn'><box-icon name='heart' type="solid" color="#356AA0"></box-icon></button>
                                        <button className='icon-btn'><box-icon name='share-alt' color="#356AA0"></box-icon></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='clinicalTrial-bx mb-4' onClick={handleShow}>
                                <h2>Bipolar Depression Study with 6 Month Open Label Therapy</h2>
                                <p>If you or someone you know suffers from bipolar depression, you may be eligible to participate in a...</p>
                                <div className='clinicalTrial-bx-ftr'>
                                    <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                    <div>
                                        <button className='icon-btn'><box-icon name='heart' type="solid" color="#356AA0"></box-icon></button>
                                        <button className='icon-btn'><box-icon name='share-alt' color="#356AA0"></box-icon></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='clinicalTrial-bx mb-4' onClick={handleShow}>
                                <h2>Bipolar Depression Study with 6 Month Open Label Therapy</h2>
                                <p>If you or someone you know suffers from bipolar depression, you may be eligible to participate in a...</p>
                                <div className='clinicalTrial-bx-ftr'>
                                    <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                    <div>
                                        <button className='icon-btn'><box-icon name='heart' type="solid" color="#356AA0"></box-icon></button>
                                        <button className='icon-btn'><box-icon name='share-alt' color="#356AA0"></box-icon></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='clinicalTrial-bx mb-4' onClick={handleShow}>
                                <h2>Bipolar Depression Study with 6 Month Open Label Therapy</h2>
                                <p>If you or someone you know suffers from bipolar depression, you may be eligible to participate in a...</p>
                                <div className='clinicalTrial-bx-ftr'>
                                    <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                    <div>
                                        <button className='icon-btn'><box-icon name='heart' type="solid" color="#356AA0"></box-icon></button>
                                        <button className='icon-btn'><box-icon name='share-alt' color="#356AA0"></box-icon></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='clinicalTrial-bx mb-4' onClick={handleShow}>
                                <h2>Bipolar Depression Study with 6 Month Open Label Therapy</h2>
                                <p>If you or someone you know suffers from bipolar depression, you may be eligible to participate in a...</p>
                                <div className='clinicalTrial-bx-ftr'>
                                    <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                    <div>
                                        <button className='icon-btn'><box-icon name='heart' type="solid" color="#356AA0"></box-icon></button>
                                        <button className='icon-btn'><box-icon name='share-alt' color="#356AA0"></box-icon></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='clinicalTrial-bx mb-4' onClick={handleShow}>
                                <h2>Bipolar Depression Study with 6 Month Open Label Therapy</h2>
                                <p>If you or someone you know suffers from bipolar depression, you may be eligible to participate in a...</p>
                                <div className='clinicalTrial-bx-ftr'>
                                    <span className='badge badge-danger'><box-icon name='x' size="18px" color="#ffffff"></box-icon> Close</span>
                                    <div>
                                        <button className='icon-btn'><box-icon name='heart' type="solid" color="#356AA0"></box-icon></button>
                                        <button className='icon-btn'><box-icon name='share-alt' color="#356AA0"></box-icon></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PatientBookingProcess show={show} handleClose={handleClose} show2={show2} handleClose2={handleClose2} handleShow2={handleShow2} show3={show3} handleClose3={handleClose3} handleShow3={handleShow3} />

        </>
    );
};

export default PatientMyFavorites;
