import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';

const SponsorsBx = ({ data }) => {
    const options = {
        items: 5,
        loop: false,
        nav: false,
        margin: 20,
        autoWidth: true,
        dots: false
    };
    return (
        <div className="trialClinic-info-bx SponsorsBx mt-5">
            <h2>Sponsors</h2>
            <OwlCarousel {...options}>
                {data.map((value, index) => {
                    return (
                        <div className='item sponsor-logo-img' key={index}>
                            <img src={value.sponsor_user_info.profile_image ? value.sponsor_user_info.profile_image : "/images/placeholder-img.jpg"} alt="Sponsors" />
                        </div>
                    )
                })}
            </OwlCarousel>
        </div>
    );
};

export default SponsorsBx;
