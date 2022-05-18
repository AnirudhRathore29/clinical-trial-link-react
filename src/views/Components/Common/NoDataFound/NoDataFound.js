import './NoDataFound.css';


export const NoDataFound = () => {
    return (
        <div className='no-result-found'>
            <img src="/images/no-data-found.svg" alt="no-data-found" />
            <h2>No Result Found !</h2>
        </div>
    );
}