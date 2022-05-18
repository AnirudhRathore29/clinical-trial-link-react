import './LogoLoader.css';


export const LogoLoader = () => {
    return (
        <div className='loading-bx text-center'>
            <img src="/images/loader-border.svg" width={150} alt="loader-icon" />
            <span>Loading...</span>
        </div>
    );
}