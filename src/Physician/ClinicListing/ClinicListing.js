import { Link } from 'react-router-dom';
import { InputText, SelectBox } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ListBox from '../../views/Components/ListBox/ListBox';
import '../../Patient/ClinicListing/ClinicListing.css';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';

const PhysicianClinicListing = () => {
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
                                            <option>Select Condition</option>
                                            <option>Condition 1</option>
                                            <option>Condition 2</option>
                                        </>
                                    }
                                />
                                <div className='form-group'>
                                    <label>Age Range</label>
                                    <div className='age-range'>
                                        <div className='age-range-bix'>
                                            <span>Min</span>
                                            <InputText type="number" placeholder="Min Age" min="18" />
                                        </div>
                                        <div className='p-3'>-</div>
                                        <div className='age-range-bix'>
                                            <span>Max</span>
                                            <InputText type="number" placeholder="Max Age" max="60" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Male" defaultChecked="true" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Female" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Nonbinary" />
                                    </div>
                                </div>
                                <InputText type="text" labelText="Zip Code" placeholder="Enter Zip Code" />
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
                            <Link to="/physician/clinic-details">
                                <ListBox
                                    imgUrl="clinic-img1.jpg"
                                    title="Barnes Jewish Hospital"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/physician/clinic-details">
                                <ListBox
                                    imgUrl="clinic-img2.jpg"
                                    title="University of California"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/physician/clinic-details">
                                <ListBox
                                    imgUrl="clinic-img3.jpg"
                                    title="UC Health"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/physician/clinic-details">
                                <ListBox
                                    imgUrl="clinic-img1.jpg"
                                    title="Bayou City Research"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/physician/clinic-details">
                                <ListBox
                                    imgUrl="clinic-img2.jpg"
                                    title="University of California"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/physician/clinic-details">
                                <ListBox
                                    imgUrl="clinic-img2.jpg"
                                    title="University of California"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
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

export default PhysicianClinicListing;
