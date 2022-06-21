import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import { getImageUrl } from '../../../redux/constants';

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
                    <div className='item' key={index}>
                        <img src={getImageUrl() + value.sponsor_user_info.profile_image} alt="Sponsors" />
                    </div>
                })}
            </OwlCarousel>
        </div>
    );
};

export default SponsorsBx;
