import { useState } from "react";
import { useHistory } from "react-router-dom";
import { InputText } from "../Common/Inputs/Inputs";
var jwt = require('jsonwebtoken');

const SearchBx = ({ placeholder }) => {
    const history = useHistory()

    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)

    console.log("profileDetails", profileDetails);

    const [fieldData, setFieldData] = useState();

    const HandleSearch = () => {
        switch (profileDetails?.role) {
            case 2:
                history.push({
                    pathname: `/patient/search-listing?search=${fieldData}`,
                    state: fieldData
                })
            case 3:
                history.push({
                    pathname: `/trial-clinic/sponsors-listing?search=${fieldData}`,
                    state: fieldData
                })
            default: {}
        }
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