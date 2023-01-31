import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InputText } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ListBox from '../../views/Components/ListBox/ListBox';
import '../../Patient/ClinicListing/ClinicListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { PhysicianClinicListingAction } from '../../redux/actions/PhysicianAction';
import { authHeader } from '../../redux/actions/authHeader';
import getCurrentHost from '../../redux/constants';
import { MultiSelect } from "react-multi-select-component";

const PatientClinicListing = () => {
    const dispatch = useDispatch();
    const clinicListingSelector = useSelector(state => state.patient.listing_clinic.data)
    const loadingSelector = useSelector(state => state.patient)

    const [loadMoreData, setLoadMoreData] = useState(1);
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [trialClinicFilter, setTrialClinicFilter] = useState({
        clinic_name: "",
        keywords: "",
        specialities: [],
        conditions: [],
    });

    console.log("specialityList", specialityList);
    console.log("conditionList", conditionList);
    console.log("trialClinicFilter", trialClinicFilter);

    useEffect(() => {
        dispatch(PhysicianClinicListingAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    useEffect(() => {
        (async () => {
            const requestOptions = {
                method: 'GET',
                headers: authHeader()
            };
            return fetch(getCurrentHost() + "/get-user-specialitites", requestOptions)
                .then(data => data.json())
                .then((response) => {
                    let data = response.data;
                    for (var i = 0; i < data?.length; i++) {
                        const obj = Object.assign({}, data[i]);
                        obj.label = data[i].speciality_info.speciality_title;
                        obj.value = data[i].speciality_info.id;
                        console.log("data[i].speciality_info.id", data[i].speciality_info.id);
                        setSpecialityList(oldArray => [...oldArray, obj]);
                    }
                })
                .catch(err => {
                    console.log("err", err)
                })
        })();

        (async () => {
            const requestOptions = {
                method: 'GET',
                headers: authHeader(),
            };
            return fetch(getCurrentHost() + "/get-all-conditions", requestOptions)
                .then(data => data.json())
                .then((response) => {
                    var data = response.data;
                    var conditionsArr = [];
                    for (var i = 0; i < data?.length; i++) {
                        const obj = Object.assign({}, data[i]);
                        obj.label = data[i].condition_title;
                        obj.value = data[i].id;
                        conditionsArr.push(obj)
                    }
                    setConditionList(conditionsArr);
                })
                .catch(err => {
                    console.log("err", err)
                })
        })();
    }, [])

    const onchange = (e) => {
        const { name, value } = e.target
        setTrialClinicFilter((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const specialityOnChange = (e) => {
        setTrialClinicFilter({ ...trialClinicFilter, specialities: e })
        // const speArr = e.map(value => value.speciality_info.id)
        // let data = {
        //     speciality_ids: speArr
        // }
        // ConditionsAction(data);
    }

    const TrialClinicListFilterSubmit = (e) => {
        e.preventDefault();
        const specialityArr = trialClinicFilter.specialities.map(value => value.speciality_info.id);
        const conditionArr = trialClinicFilter.conditions.map(value => value.id);
        let data = {
            page: loadMoreData,
            clinic_name: trialClinicFilter.clinic_name,
            keywords: trialClinicFilter.keywords,
            specialities: specialityArr,
            conditions: conditionArr,
        }
        dispatch(PhysicianClinicListingAction(data))
    }

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
                            <form className='filter-sidebar' onSubmit={TrialClinicListFilterSubmit} autoComplete="off">
                                <h2>Filter</h2>
                                <InputText
                                    type="text"
                                    labelText="Clinic Name"
                                    placeholder="Enter Clinic Name"
                                    name="clinic_name"
                                    onChange={onchange}
                                />
                                <div className="form-group">
                                    <label> Specialty </label>
                                    <MultiSelect
                                        options={specialityList !== undefined && specialityList}
                                        value={trialClinicFilter.specialities}
                                        onChange={specialityOnChange}
                                        disableSearch={true}
                                        labelledBy="Specialty"
                                        className="multiSelect-control"
                                        name="specialities"
                                    />
                                </div>

                                <div className="form-group">
                                    <label> Condition </label>
                                    <MultiSelect
                                        options={conditionList !== undefined && conditionList}
                                        value={trialClinicFilter.conditions}
                                        onChange={(e) => setTrialClinicFilter({ ...trialClinicFilter, conditions: e })}
                                        disableSearch={true}
                                        labelledBy="Condition"
                                        className="multiSelect-control"
                                        name="condition"
                                    />
                                </div>

                                <InputText
                                    type="search"
                                    labelText="Keywords"
                                    placeholder="Enter Keywords"
                                    name="keywords"
                                    onChange={onchange}
                                />
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Apply"
                                    hasSpinner={loadingSelector.loading}
                                    disabled={loadingSelector.loading}
                                />
                            </form>
                        </div>
                        <div className='col-lg-8'>
                            {clinicListingSelector !== undefined ?
                                clinicListingSelector.data?.data?.length !== 0 ?
                                    clinicListingSelector.data?.data?.map((value, index) => {
                                        return (
                                            <Link to={"/physician/clinic-details/" + value.id} key={index}>
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
