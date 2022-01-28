import './Banner.css'

const Banner = (props) => {
    return (
        <>
            <section className="hero-section inner-banner-section">
                <div className="banner-bg">
                    <img src="/images/banner-top-vector.svg" alt="banner-vectors" />
                </div>
                <div className="banner-btm-bg">
                    <img src="/images/banner-btm-vector.svg" alt="banner-vectors" />
                </div>
                <div className="container-fluid">
                    <div className="hero-caption text-center">
                        <div className="hero-heading">
                            <h1 className="h1"> {props.BannerHeading} </h1>
                        </div>
                        {props.BannerSubHeading}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Banner;