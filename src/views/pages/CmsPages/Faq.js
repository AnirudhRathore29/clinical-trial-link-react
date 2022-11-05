import { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaqDetailAction } from "../../../redux/actions/cmsAction";
import InnerBanner from "../../Components/Common/InnerBanner/InnerBanner";
import { LogoLoader } from "../../Components/Common/LogoLoader/LogoLoader";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import './AboutUs.css';


const Faq = () => {
    const dispatch = useDispatch()

    const FaqDetailSelector = useSelector(state => state.cms_content.faq_page_detail.data)
    const LoadingSelectorSelector = useSelector(state => state.cms_content.loading)

    console.log("FaqDetail", FaqDetailSelector);
    console.log("LoadingSelectorSelector", LoadingSelectorSelector);


    useEffect(() => {
        dispatch(FaqDetailAction("terms-and-conditions"))
    }, [])
    return (
        <>
            {
                LoadingSelectorSelector ?
                    <div className='fullPageLoader'>
                        <LogoLoader />
                    </div>
                    :
                    FaqDetailSelector &&
                    <>
                        <InnerBanner
                            pageTitle="Frequently asked questions"
                            subTitle="Have questions? We're here to help"
                        />
                        <section className="repeat-section">
                            <div div className="container">
                                <Accordion defaultActiveKey="0">
                                    {
                                       FaqDetailSelector.data.map((value, index) => {
                                        return (
                                            <Accordion.Item eventKey={index}>
                                                <Accordion.Header>{value.question}</Accordion.Header>
                                                <Accordion.Body>
                                                    <div dangerouslySetInnerHTML={{ __html: value.answer }}></div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )                                        
                                       })
                                    }
                                </Accordion>
                            </div>
                        </section>
                    </>
            }
        </>
    );
};

export default Faq;
