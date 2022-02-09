import { Link } from 'react-router-dom';
import { InputText, SelectBox } from '../../views/components/Common/Inputs/Inputs';
import RadioBtn from '../../views/components/Common/RadioBtn/RadioBtn';
import Button from '../../views/components/Common/Buttons/Buttons';
import './ClinicListing.css';

const PatientClinicListing = () => {

    return (
        <>
            <div className="clinical-dashboard main-clinic-listing">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Clinics</h1>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className="filter-sidebar">
                                <h2>Filter</h2>
                                <SelectBox
                                    name="condition"
                                    labelText="Condition"
                                    optionData={
                                        <>
                                            <option>Select</option>
                                            <option>Conidtion 1</option>
                                            <option>Conidtion 2</option>
                                        </>
                                    }
                                />
                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Male" defaultChecked="true" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Female" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Nonbinary" />
                                    </div>
                                </div>
                                <InputText type="text" labelText="Zip Code" placeholder="Enter zip code" />
                                <InputText type="search" labelText="Keywords" placeholder="Enter Keywords" />
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Apply"
                                />
                            </div>
                        </div>
                        <div className='col-lg-8'>
                            <Link to="/patient/trial-clinic-details">
                                <div className='clinic-list-bx'>
                                    <div className='clinic-img'>
                                        <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                    </div>
                                    <div className='clinic-info'>
                                        <h2>Barnes Jewish Hospital</h2>
                                        <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                        <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,</p>
                                        <span className="away-from">5000.52 Mi</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/patient/trial-clinic-details">
                                <div className='clinic-list-bx'>
                                    <div className='clinic-img'>
                                        <img src="/images/clinic-img2.jpg" alt="clinic-img" />
                                    </div>
                                    <div className='clinic-info'>
                                        <h2>University of California</h2>
                                        <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                        <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,</p>
                                        <span className="away-from">5000.52 Mi</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/patient/trial-clinic-details">
                                <div className='clinic-list-bx'>
                                    <div className='clinic-img'>
                                        <img src="/images/clinic-img3.jpg" alt="clinic-img" />
                                    </div>
                                    <div className='clinic-info'>
                                        <h2>UC Health</h2>
                                        <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                        <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,</p>
                                        <span className="away-from">5000.52 Mi</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/patient/trial-clinic-details">
                                <div className='clinic-list-bx'>
                                    <div className='clinic-img'>
                                        <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                    </div>
                                    <div className='clinic-info'>
                                        <h2>Bayou City Research</h2>
                                        <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                        <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,</p>
                                        <span className="away-from">5000.52 Mi</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/patient/trial-clinic-details">
                                <div className='clinic-list-bx'>
                                    <div className='clinic-img'>
                                        <img src="/images/clinic-img2.jpg" alt="clinic-img" />
                                    </div>
                                    <div className='clinic-info'>
                                        <h2>Segal Institute for Clinic</h2>
                                        <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                        <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,</p>
                                        <span className="away-from">5000.52 Mi</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/patient/trial-clinic-details">
                                <div className='clinic-list-bx'>
                                    <div className='clinic-img'>
                                        <img src="/images/clinic-img1.jpg" alt="clinic-img" />
                                    </div>
                                    <div className='clinic-info'>
                                        <h2>Bayou City Research</h2>
                                        <p className='location'><box-icon name='map' color="#356AA0" size="18px"></box-icon> Atlanta, Georgia, United States</p>
                                        <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,</p>
                                        <span className="away-from">5000.52 Mi</span>
                                    </div>
                                </div>
                            </Link>

                            <div className='mt-5 text-center'>
                                <Button
                                    isButton="true"
                                    BtnColor="primary"
                                    BtnText="Load More"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientClinicListing;
