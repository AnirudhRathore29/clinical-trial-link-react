import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
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
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// toast.configure();
const SponsorsClinicListing = () => {
    const dispatch = useDispatch()
    const listSelector = useSelector(state => state.My_trials.clinic_list.data)
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [trialClinicFilter, setTrialClinicFilter] = useState({
        clinic_name: "",
        keywords: "",
        speciality: [],
        condition: [],
    });

    async function SpecialitiesAction() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(true)
        };
        return fetch(getCurrentHost() + "/get-clinical-specialities", requestOptions)
            .then(data => data.json())
            .then((response) => {
                let data = response.data;
                for (var i = 0; i < data?.length; i++) {
                    const obj = Object.assign({}, data[i]);
                    obj.label = data[i].speciality_title;
                    obj.value = data[i].id;
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
            headers: authHeader(true),
            body: JSON.stringify(data)
        };
        return fetch(getCurrentHost() + "/get-clinical-conditions", requestOptions)
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
    }

    useEffect(() => {
        SpecialitiesAction();
    }, [])

    const specialityOnChange = (e) => {
        setTrialClinicFilter({ ...trialClinicFilter, speciality: e })
        const speArr = e.map(value => value.id)
        let data = {
            speciality: speArr
        }
        ConditionsAction(data);
    }

    useEffect(() => {
        dispatch(TrialClinicListAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    const TrialClinicListFilterSubmit = (e) => {
        e.preventDefault();
        const specialityArr = trialClinicFilter.speciality.map(value => value.id);
        const conditionArr = trialClinicFilter.condition.map(value => value.id);
        let data = {
            page: loadMoreData,
            clinic_name: trialClinicFilter.clinic_name,
            keywords: trialClinicFilter.keywords,
            speciality: specialityArr,
            condition: conditionArr,
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
                                    />
                                    <div className="form-group">
                                        <label> Specialty </label>
                                        <MultiSelect
                                            options={specialityList !== undefined && specialityList}
                                            value={trialClinicFilter.speciality}
                                            onChange={specialityOnChange}
                                            disableSearch={true}
                                            labelledBy="Specialty"
                                            className="multiSelect-control"
                                            name="speciality"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label> Condition </label>
                                        <MultiSelect
                                            options={conditionList !== undefined && conditionList}
                                            value={trialClinicFilter.condition}
                                            onChange={(e) => setTrialClinicFilter({ ...trialClinicFilter, condition: e })}
                                            disableSearch={true}
                                            labelledBy="Condition"
                                            className="multiSelect-control"
                                            name="condition"
                                        />
                                    </div>

                                    <InputText type="search" labelText="Keywords" placeholder="Enter Keywords" />
                                    <Button
                                        isButton="true"
                                        BtnType="submit"
                                        BtnColor="green w-100"
                                        BtnText="Apply"
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
                                                    // distance="5000.52 Mi"
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
