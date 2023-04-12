import { useState, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom';
import { InputText } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ListBox from '../../views/Components/ListBox/ListBox';
import '../../Patient/ClinicListing/ClinicListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { TrialClinicListAction } from "../../redux/actions/TrialSponsorAction";
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';

const SponsorsClinicListing = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const listSelector = useSelector(state => state.My_trials.clinic_list.data)
    const isloading = useSelector(state => state.My_trials);
    
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [trialClinicFilter, setTrialClinicFilter] = useState({
        clinic_name: location?.search?.split("=").pop(),
        keywords: "",
        specialities: [],
        conditions: [],
    });

    console.log("trialClinicFilter", trialClinicFilter);
    console.log("conditionList", conditionList);
    console.log("specialityList", specialityList);
    console.log("location?.state", location?.state);
    console.log("listSelector", listSelector);

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
        if(!location?.search){
            dispatch(TrialClinicListAction({ page: loadMoreData}))
        }
    }, [dispatch, loadMoreData])

    useEffect(() => {
        setTrialClinicFilter({
            clinic_name: '',
            keywords: "",
            specialities: [],
            conditions: [],
        })
        dispatch(TrialClinicListAction({ page: loadMoreData, clinic_name: location?.search?.split("=").pop()}))
    }, [dispatch, location?.search, location?.state?.count])
    
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
        dispatch(TrialClinicListAction(data))
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
                            <div className="filter-sidebar">
                                <h2>Filter</h2>
                                <form onSubmit={TrialClinicListFilterSubmit} autoComplete="off">
                                    <InputText
                                        type="text"
                                        labelText="Clinic Name"
                                        placeholder="Enter Clinic Name"
                                        name="clinic_name"
                                        value={trialClinicFilter?.clinic_name}
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
                                        value={trialClinicFilter?.keywords}
                                        onChange={onchange}
                                    />
                                    <Button
                                        isButton="true"
                                        BtnType="submit"
                                        BtnColor="green w-100"
                                        BtnText="Apply"
                                        hasSpinner={isloading.loading}
                                        disabled={isloading.loading}
                                    />
                                </form>
                            </div>
                        </div>
                        <div className='col-lg-8'>
                            {listSelector !== undefined ?
                                listSelector.data?.data?.length !== 0 ?
                                    listSelector.data?.data?.map((value, index) => {
                                        console.log("value", value)
                                        return (
                                            <Link to={"/trial-sponsors/clinic-details/" + value.id} key={index}>
                                                <ListBox
                                                    imgUrl={value.listing_image}
                                                    title={value.clinic_name}
                                                    location={value.address}
                                                    state={value.state_info.name}
                                                    description={value.user_meta_info.brief_intro}
                                                    distance={value.distance && value.distance.toFixed(3) + " " + "Mi"}
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

                            {listSelector && listSelector.data?.data.length > 10 &&
                                <div className='mt-5 text-center'>
                                    <Button
                                        isButton="true"
                                        BtnColor="primary"
                                        BtnText="Load More"
                                        onClick={handleLoadMore}
                                        disabled={listSelector.data.last_page === listSelector.data.current_page}
                                        hasSpinner={loadMoreData && isloading.loading}
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

export default SponsorsClinicListing;
