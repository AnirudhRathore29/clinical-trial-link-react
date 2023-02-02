import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { InputText } from "../Common/Inputs/Inputs";
import { useSelector } from 'react-redux';
var jwt = require('jsonwebtoken');

const SearchBx = ({ placeholder }) => {
    const history = useHistory()
    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)

    const Loading = useSelector((state) => state?.trial_clinic?.loading)

    const [fieldData, setFieldData] = useState("");

    console.log("LoadingLoading", Loading);
    console.log("profileDetails", profileDetails);

    const HandleSearch = (e) => {
        e.preventDefault()
        history.push({
            pathname: profileDetails?.role === 2 ? `/patient/search-listing` : 
            profileDetails?.role === 3 ? `/trial-clinic/sponsors-listing` : 
            profileDetails?.role === 5 ? `/trial-sponsors/clinic-listing` : `/physician/search-listing` ,
            search: `?search=${fieldData}`,
            state: fieldData
        })
    }

    const HandleOnBlur = () => {
        setFieldData("")
    }
    
    return (
        <>
            <form className="search-bx" onSubmit={HandleSearch}>
                <InputText
                    type="search"
                    placeholder={placeholder}
                    value={fieldData}
                    onChange={(e) => setFieldData(e.target.value)}
                    onBlur={HandleOnBlur}
                />
                <button type="button" className="search-icon"><box-icon name='search' color='#CDEB8B' ></box-icon></button>
            </form>
        </>
    );
}

export default SearchBx;