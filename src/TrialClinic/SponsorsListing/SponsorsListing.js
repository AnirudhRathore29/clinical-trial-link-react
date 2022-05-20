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
// import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const ClinicSponsorsListing = () => {
    const dispatch = useDispatch()
    const listSelector = useSelector(state => state.trial_clinic)
    const trialListData = listSelector.data.data
    const [specialityList, setSpecialityList] = useState([]);
    const [conditionList, setConditionList] = useState([]);
    const [loadMoreData, setLoadMoreData] = useState(1);
    const [sponsoreListFilter, setsponsoreListFilter] = useState({
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
        setsponsoreListFilter({ ...sponsoreListFilter, speciality: e })
        const speArr = e.map(value => value.id)
        let data = {
            speciality: speArr
        }
        ConditionsAction(data);
    }

    useEffect(() => {
        dispatch(SponsorListAction({ page: loadMoreData }))
    }, [dispatch, loadMoreData])

    const SponsorListFilterSubmit = (e) => {
        e.preventDefault();
        const specialityArr = sponsoreListFilter.speciality.map(value => value.id);
        const conditionArr = sponsoreListFilter.condition.map(value => value.id);
        let data = {
            page: loadMoreData,
            keywords: sponsoreListFilter.keywords,
            speciality: specialityArr,
            condition: conditionArr,
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
                                            value={sponsoreListFilter.speciality}
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
                                            value={sponsoreListFilter.condition}
                                            onChange={(e) => setsponsoreListFilter({ ...sponsoreListFilter, condition: e })}
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
                                    />

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
                            {trialListData && trialListData.data?.data?.map((value, index) => {
                                console.log("value", value)
                                return (
                                    <ListBox
                                        imgUrl="clinic-img1.jpg"
                                        title={value.sponsor_name}
                                        location={value.address}
                                        description={value.user_meta_info.brief_intro}
                                        distance="5000.52 Mi"
                                        index={index}
                                    />
                                )
                            })}

                            {trialListData && trialListData.data?.data.length > 10 &&
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

export default ClinicSponsorsListing;
