import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
const SponsorsBx = () => {
    const options = {
        items: 5,
        loop: true,
        nav: false,
        margin: 20,
        autoWidth: true,
        dots: false
    };
    return (
        <>
            <div className="trialClinic-info-bx SponsorsBx mt-5">
                <h2>Sponsors</h2>
                <OwlCarousel {...options}>
                    <div className='item'>
                        <img src="/images/sponser-img1.jpg" alt="Sponsors" />
                    </div>
                    <div className='item'>
                        <img src="/images/sponser-img2.jpg" alt="Sponsors" />
                    </div>
                    <div className='item'>
                        <img src="/images/sponser-img3.jpg" alt="Sponsors" />
                    </div>
                </OwlCarousel>
            </div>
        </>
    );
};

export default SponsorsBx;
