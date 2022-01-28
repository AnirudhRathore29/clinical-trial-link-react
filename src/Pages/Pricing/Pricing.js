import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Banner from "../../Components/Common/Banner/Banner";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import Plans from "../../Components/Plans/Plans";
import CommonModal from '../../Components/Common/Modal/Modal';
import { SelectBox, InputText } from '../../Components/Common/Inputs/Inputs';
import CommonButton from '../../Components/Common/Buttons/Buttons';
import './Pricing.css';
import '../../Components/Common/ContactForm/ContactForm.css'

const Pricing = () => {
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    return (
        <>
            <Banner BannerHeading="Pricing" BannerSubHeading={<p>Interactive digital content solution, for the best price.</p>} />
            <section className="what-section pad-t-80 pad-b-80">
                <div className="container">
                    <SectionTitle CustomClass="text-center pad-b-50" title="Pricing Plans" ShapeImage="heading-clip-1.svg" />
                    <div className="tab-outer">
                        <Tabs defaultActiveKey="termly-plans" className="pricing-tabs" id="plans-tabs">
                            <Tab eventKey="monthly-plans" title="Monthly plans">
                                <Plans BronzePrice="25" SilverPrice="21" GoldPrice="18" PlanDuration="Monthly" />
                            </Tab>
                            <Tab eventKey="termly-plans" title="Termly plans">
                                <Plans BronzePrice="22" SilverPrice="19" GoldPrice="16" PlanDuration="Termly" />
                            </Tab>
                            <Tab eventKey="yearly-plans" title="Yearly plans">
                                <Plans BronzePrice="18" SilverPrice="15" GoldPrice="14" PlanDuration="Yearly" />
                            </Tab>
                        </Tabs>
                    </div>

                    <div className="free-trail-bx">
                        <div>
                            <h2>Start 14 Day Free Trial</h2>
                            <p>Try First & decide later, no credit card required</p>
                        </div>
                        <CommonButton isButton="true" BtnColor="dark" BtnText="Start Trial" onClick={handleShow} />
                    </div>
                </div>
            </section>

            <CommonModal show={show} handleClose={show} keyboard={false}
                ModalTitle="Request free trial"
                handleClose={handleClose}
                ModalData={
                    <>
                        <InputText
                            type="text"
                            placeholder="Full Name"
                        />
                        <InputText
                            type="email"
                            placeholder="Email Address"
                        />
                        <SelectBox
                            optionData=
                            {
                                <>
                                    <option value="">Select Subjects</option>
                                    <option value="">Mathematical Activities</option>
                                    <option value="">English Activities</option>
                                    <option value="">Kiswahili Activities</option>
                                    <option value="">Environmental Activities</option>
                                </>
                            }
                        />
                        <div className="form-group">
                            <textarea name="" className="form-control" placeholder="Message"></textarea>
                        </div>
                        <div className="contact-info">
                            <p>For questions about our API, pricing or implementation please feel free to contact us on <a href="mailto:support@msingipack.com">support@msingipack.com</a>.</p>
                        </div>
                    </>
                }
            />
        </>
    );
}

export default Pricing;