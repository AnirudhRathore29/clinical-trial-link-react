import { Link } from 'react-router-dom';
import { InputText, SelectBox } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ListBox from '../../views/Components/ListBox/ListBox';
import '../../Patient/ClinicListing/ClinicListing.css';

const ClinicSponsorsListing = () => {
    return (
        <>
            <div className="clinical-dashboard main-clinic-listing">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Trial Sponsors/CRO</h1>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className="filter-sidebar">
                                <h2>Filter</h2>
                                <SelectBox
                                    name="specialty"
                                    labelText="Specialty"
                                    optionData={
                                        <>
                                            <option>Select Specialty</option>
                                            <option>Specialty 1</option>
                                            <option>Specialty 2</option>
                                        </>
                                    }
                                />
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
                            <Link to="/trial-clinic/sponsors-details">
                                <ListBox
                                    imgUrl="clinic-img1.jpg"
                                    title="ABF Pharmaceutical"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/trial-clinic/sponsors-details">
                                <ListBox
                                    imgUrl="clinic-img2.jpg"
                                    title="University of California"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/trial-clinic/sponsors-details">
                                <ListBox
                                    imgUrl="clinic-img3.jpg"
                                    title="UC Health"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/trial-clinic/sponsors-details">
                                <ListBox
                                    imgUrl="clinic-img1.jpg"
                                    title="Bayou City Research"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/trial-clinic/sponsors-details">
                                <ListBox
                                    imgUrl="clinic-img2.jpg"
                                    title="University of California"
                                    location="Atlanta, Georgia, United States"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                    distance="5000.52 Mi"
                                />
                            </Link>
                            <Link to="/trial-clinic/sponsors-details">
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

export default ClinicSponsorsListing;
