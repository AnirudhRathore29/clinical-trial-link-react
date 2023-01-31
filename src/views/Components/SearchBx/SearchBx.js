import { useState } from "react";
import { useHistory } from "react-router-dom";
import { InputText } from "../Common/Inputs/Inputs";
var jwt = require('jsonwebtoken');

const SearchBx = ({ placeholder }) => {
    const history = useHistory()

    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)

    console.log("profileDetails", profileDetails);

    const [fieldData, setFieldData] = useState("");

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



    return (
        <>
            <form className="search-bx" onSubmit={HandleSearch}>
                <InputText
                    type="search"
                    placeholder={placeholder}
                    onChange={(e) => setFieldData(e.target.value)}
                />
                <button type="button" className="search-icon"><box-icon name='search' color='#CDEB8B' ></box-icon></button>
            </form>
        </>
    );
}

export default SearchBx;