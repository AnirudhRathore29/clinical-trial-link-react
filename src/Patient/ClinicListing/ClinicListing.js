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
import { MultiSelect } from "react-multi-select-component";
import 'react-loading-skeleton/dist/skeleton.css'
import { authHeader } from '../../redux/actions/authHeader';
import getCurrentHost from '../../redux/constants';

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

    console.log("trialClinicFilter", trialClinicFilter);
    console.log("conditionList", conditionList);
    console.log("specialityList", specialityList);

    useEffect(() => {
        dispatch(PatientClinicListingAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    async function SpecialitiesAction() {
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
    }

    async function ConditionsAction(data) {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(data)
        };
        return fetch(getCurrentHost() + "/get-user-conditions", requestOptions)
            .then(data => data.json())
            .then((response) => {
                var data = response.data;
                var conditionsArr = [];
                for (var i = 0; i < data?.length; i++) {
                    const obj = Object.assign({}, data[i]);
                    obj.label = data[i].condition_info.condition_title;
                    obj.value = data[i].condition_info.id;
                    conditionsArr.push(obj)
                }
                setConditionList(conditionsArr);
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    useEffect(() => {
        SpecialitiesAction();
    }, [])

    const specialityOnChange = (e) => {
        setTrialClinicFilter({ ...trialClinicFilter, specialities: e })
        const speArr = e.map(value => value.speciality_info.id)
        let data = {
            speciality_ids: speArr
        }
        ConditionsAction(data);
    }

    const onchange = (e) => {
        const { name, value } = e.target
        setTrialClinicFilter((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    useEffect(() => {
        dispatch(PatientClinicListingAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    const TrialClinicListFilterSubmit = (e) => {
        e.preventDefault();
        const specialityArr = trialClinicFilter.specialities.map(value => value.speciality_info.id);
        const conditionArr = trialClinicFilter.conditions.map(value => value.condition_info.id);
        let data = {
            page: loadMoreData,
            clinic_name: trialClinicFilter.clinic_name,
            keywords: trialClinicFilter.keywords,
            specialities: specialityArr,
            conditions: conditionArr,
        }
        dispatch(PatientClinicListingAction(data))
    }

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
        TrialClinicListFilterSubmit()
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
