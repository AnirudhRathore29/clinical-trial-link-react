import InnerBanner from "../../Components/Common/InnerBanner/InnerBanner";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import './AboutUs.css';


const AboutUS = () => {

    return (
        <>
            <InnerBanner
                pageTitle="About Us"
                subTitle={<>Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem <br /> Sed porttitor lectus nibh  sapien massa</>}
            />
            <div className="repeat-section about-us-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <SectionTitle title="And these are our principles" ShapeImage="heading-clip-1.svg" />
                        </div>
                        <div className="col-lg-6">
                            <p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla quis lorem ut libero malesuada feugiat.</p>
                            <p>Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada. Curabitur aliquet quam id dui posuere blandit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUS;
