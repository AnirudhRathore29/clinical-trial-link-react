import { useState, useEffect } from "react"
import { InputText } from '../../views/Components/Common/Inputs/Inputs';
import Button from '../../views/Components/Common/Buttons/Buttons';
import ListBox from '../../views/Components/ListBox/ListBox';
import '../../Patient/ClinicListing/ClinicListing.css';
import { useDispatch, useSelector } from 'react-redux';
import { SponsorListAction } from '../../redux/actions/TrialClinicAction';
import { MultiSelect } from "react-multi-select-component";
import getCurrentHost from "../../redux/constants";
import { authHeader } from "../../redux/actions/authHeader";
import { Link, useLocation } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NoDataFound } from '../../views/Components/Common/NoDataFound/NoDataFound';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // toast.configure();
const ClinicSponsorsListing = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const listSelector = useSelector(state => state.trial_clinic)
    const isloading = useSelector(state => state.trial_clinic);
    const trialListData = listSelector.data.data

    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [sponsoreListFilter, setsponsoreListFilter] = useState({
        keywords: location?.search?.split("=").pop(),
        specialities: [],
        conditions: [],
    });

    console.log("location", location);

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

    const onchange = (e) => {
        const { name, value } = e.target
        setsponsoreListFilter((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const specialityOnChange = (e) => {
        setsponsoreListFilter({ ...sponsoreListFilter, specialities: e })
        const speArr = e.map(value => value.speciality_info.id)
        let data = {
            speciality_ids: speArr
        }
        ConditionsAction(data);
    }

    useEffect(() => {
        dispatch(SponsorListAction({ page: loadMoreData, }))
    }, [dispatch, loadMoreData])
    useEffect(() => {
        setsponsoreListFilter({
            keywords: '',
            specialities: [],
            conditions: [],
        })
        dispatch(SponsorListAction({ page: loadMoreData, keywords: location?.search?.split("=").pop()}))
    }, [dispatch, location?.search, location?.state?.count])

    const SponsorListFilterSubmit = (e) => {
        e.preventDefault();
        const specialityArr = sponsoreListFilter.specialities.map(value => value.speciality_info.id);
        const conditionArr = sponsoreListFilter.conditions.map(value => value.condition_info.id);
        let data = {
            page: loadMoreData,
            keywords: sponsoreListFilter.keywords,
            specialities: specialityArr,
            conditions: conditionArr,
        }
        dispatch(SponsorListAction(data))
    }

    const handleLoadMore = () => {
        setLoadMoreData(loadMoreData + 1)
        SponsorListFilterSubmit()
    }

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
                                <form onSubmit={SponsorListFilterSubmit} autoComplete="off">
                                    <div className="form-group">
                                        <label> Specialty </label>
                                        <MultiSelect
                                            options={specialityList !== undefined && specialityList}
                                            value={sponsoreListFilter.specialities}
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
                                            value={sponsoreListFilter.conditions}
                                            onChange={(e) => setsponsoreListFilter({ ...sponsoreListFilter, conditions: e })}
                                            disableSearch={true}
                                            labelledBy="Condition"
                                            className="multiSelect-control"
                                            name="conditions"
                                        />
                                    </div>

                                    <InputText
                                        type="search"
                                        labelText="Keywords"
                                        placeholder="Enter Keywords"
                                        name="keywords"
                                        value={sponsoreListFilter?.keywords}
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
                            {trialListData !== undefined ?
                                trialListData.data?.data?.length !== 0 ?
                                    trialListData.data?.data?.map((value, index) => {
                                        return (
                                            <Link to={"/trial-clinic/sponsors-details/" + value.id} key={index}>
                                                <ListBox
                                                    imgUrl={value.listing_image}
                                                    title={value.sponsor_name}
                                                    location={value.address}
                                                    state={value.state_info.name}
                                                    description={value.user_meta_info.brief_intro}
                                                    distance={value.distance && value.distance.toFixed(3) + " " + "Mi"}
                                                    index={index}
                                                    trialCount={value?.trials_count}
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

                            {trialListData && trialListData.data?.data.length > 10 &&
                                <div className='mt-5 text-center'>
                                    <Button
                                        isButton="true"
                                        BtnColor="primary"
                                        BtnText="Load More"
                                        disabled={trialListData.data.last_page === trialListData.data.current_page}
                                        hasSpinner={loadMoreData && isloading.loading}
                                        onClick={handleLoadMore}
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

export default ClinicSponsorsListing;
