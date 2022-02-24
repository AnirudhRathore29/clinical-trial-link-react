import './InnerBanner.css'

const InnerBanner = ({pageTitle, subTitle}) => {
    return (
        <>
            <section className="repeat-section inner-banner-section">
                <div className="container">
                    <div className="inner-banner-caption">
                        <h1>{pageTitle} </h1>
                        <p>{subTitle}</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default InnerBanner;