import { InputText } from "../Common/Inputs/Inputs";

const SearchBx = ({ placeholder }) => {
    return (
        <>
            <div className="search-bx">
                <InputText type="search" placeholder={placeholder} />
                <span className="search-icon"><box-icon name='search' color='#CDEB8B' ></box-icon></span>
            </div>
        </>
    );
}

export default SearchBx;