import SectionTitle from '../../components/Common/SectionTitle/SectionTitle';
import Button from '../../components/Common/Buttons/Buttons';
import './ThankYou.css'

const ThankYou = () => {
    
    return (
        <>
            <section className="instruction-section pad-t-80 pad-b-80">
                <div className="container text-center">
                    <SectionTitle title={<><img src="/images/smile-emoji.svg" width={130} className='mb-3' alt="icons" /> <span className='d-block'>Thank You</span></>} ShapeImage="heading-clip-1.svg" SubHeading={<p className="what-sec-text mt-3"> Nulla porttitor accumsan tincidun.</p>} />
                    <Button isLink="true" URL="/" BtnColor="green mt-5" BtnText="Back to home"/>
                </div>
            </section>
        </>
    );
}

export default ThankYou;