import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InputText, SelectBox } from '../../views/Components/Common/Inputs/Inputs';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ListBox from '../../views/Components/ListBox/ListBox';
import './ClinicListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { PatientClinicListingAction } from '../../redux/actions/PatientAction';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PatientClinicListing = () => {
    const dispatch = useDispatch();
    const clinicListingSelector = useSelector(state => state.patient.listing_clinic.data)
    const loadingSelector = useSelector(state => state.patient)
    const [loadMoreData, setLoadMoreData] = useState(1);

    useEffect(() => {
        dispatch(PatientClinicListingAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
    }

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
                                            <option>Condition 1</option>
                                            <option>Condition 2</option>
                                        </>
                                    }
                                />
                                {/* <div className='form-group'>
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
                                </div> */}

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
                            {clinicListingSelector !== undefined ?
                                clinicListingSelector.data?.data?.length !== 0 ?
                                    clinicListingSelector.data?.data?.map((value, index) => {
                                        console.log("value", value)
                                        return (
                                            <Link to={"/patient/trial-clinic-details/" + value.id} key={index}>
                                                <ListBox
                                                    imgUrl={value.listing_image}
                                                    title={value.clinic_name}
                                                    location={value.address}
                                                    state={value.state_info.name}
                                                    description={value.user_meta_info.brief_intro}
                                                    distance="0 Mi"
                                                />
                                            </Link>
                                        )
                                    })
                                    :
                                    <NoDataFound />
                                :
                                [1, 2, 3].map((_, index) => {
                                    return (
                                        <div className='mb-3' key={index}>
                                            <Skeleton height={240} borderRadius="1rem" style={{ marginBottom: 20 }} />
                                        </div>
                                    )
                                })
                            }

                            {clinicListingSelector && clinicListingSelector.data.total > 16 &&
                                <div className='mt-5 text-center'>
                                    <Button
                                        isButton="true"
                                        BtnColor="primary"
                                        BtnText="Load More"
                                        onClick={handleLoadMore}
                                        disabled={clinicListingSelector.data.last_page === clinicListingSelector.data.current_page}
                                        hasSpinner={loadingSelector.loading}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientClinicListing;
