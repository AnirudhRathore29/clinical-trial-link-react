import '../trialClinicDetails/TrialClinicDetails.css'
import 'owl.carousel/dist/assets/owl.carousel.css';

const clinicalTrialDetails = () => {
    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="CommanWhiteBx trialClinic-detail-bx">
                                <h1>Depression Associated with Bipolar Disorder <div><button className="share-btn"><box-icon name='heart' color="#356AA0"></box-icon></button><button className="share-btn"><box-icon name='share-alt' type='solid' color="#356AA0"></box-icon></button></div></h1>
                                <div className="trialClinic-location">
                                    <span><box-icon name='edit-alt' color="#356AA0"></box-icon> Updated on November 23, 2020</span>
                                    <span className='badge badge-success'><box-icon name='check' size="18px" color="#356AA0"></box-icon> Recruiting</span>
                                </div>
                            </div>
                            <div className='info-bx'>
                                <box-icon type='solid' name='info-circle' color="#CDEB8B" size="24px"></box-icon> The Compensation and the Mode of Payment will be Decided by the Trial Clinics/Pharma Companies.
                            </div>
                            <div className="trialClinic-info-bx mt-5">
                                <h2>Description</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat vitae urna nec hendrerit. Vivamus eu aliquet metus, eget eleifend massa. Suspendisse potenti. Curabitur eu est in erat semper maximus a ut felis. Sed libero nunc, volutpat non imperdiet vel, pretium at erat. Sed cursus tincidunt ultricies. Aenean blandit posuere lorem ac hendrerit. Nam nisl lacus, posuere eget sollicitudin a, pharetra et sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus lacinia dictum ante, porttitor rhoncus augue vehicula non. Praesent pretium placerat turpis nec fringilla. Vestibulum hendrerit lorem et nulla malesuada, sed luctus ante varius. Duis quis dolor lacinia, aliquam nisi ut, vestibulum magna. Sed pellentesque ornare ex nec vestibulum. Donec facilisis quam sit amet bibendum volutpat. Maecenas turpis lectus, sodales eu ligula nec, aliquam viverra erat. Proin scelerisque nulla quis tortor fringilla tempor. Vestibulum accumsan pretium lobortis. Sed ac neque id risus cursus pretium. Aliquam in mollis sem. Proin congue ante non eros interdum ultricies. Pellentesque in lacinia sapien.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="trialClinic-side-bx Clinic-map-view">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199449.42991383024!2d-90.561729281034!3d38.63974312559989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8cb73a8250543%3A0xa331c23a38649978!2sBarnes%20Jewish%20Hospital!5e0!3m2!1sen!2sin!4v1644306553902!5m2!1sen!2sin" title="myFrame" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default clinicalTrialDetails;
