import { InputText, SelectBox } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ListBox from '../../views/Components/ListBox/ListBox';
import '../../Patient/ClinicListing/ClinicListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SponsorListAction } from '../../redux/actions/TrialClinicAction';

const ClinicSponsorsListing = () => {
    const dispatch = useDispatch() 
    const listSelector = useSelector(state => state.trial_clinic)

    useEffect(() => {
        dispatch(SponsorListAction())
    }, [dispatch])

    console.log("listSelector", listSelector)

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
                            <ListBox
                                imgUrl="clinic-img1.jpg"
                                title="ABF Pharmaceutical"
                                location="Atlanta, Georgia, United States"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porta nunc eu nibh dignissim,"
                                distance="5000.52 Mi"
                            />

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
