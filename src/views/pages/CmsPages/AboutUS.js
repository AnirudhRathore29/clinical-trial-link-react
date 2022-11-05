import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CmsPageDetailAction } from "../../../redux/actions/cmsAction";
import InnerBanner from "../../Components/Common/InnerBanner/InnerBanner";
import { LogoLoader } from "../../Components/Common/LogoLoader/LogoLoader";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import './AboutUs.css';


const AboutUS = () => {
    const dispatch = useDispatch()

    const AboutDetailSelector = useSelector(state => state.cms_content.cms_page_detail.data)
    const LoadingSelectorSelector = useSelector(state => state.cms_content.loading)

    console.log("AboutDetail", AboutDetailSelector);
    console.log("LoadingSelectorSelector", LoadingSelectorSelector);


    useEffect(() => {
        dispatch(CmsPageDetailAction("about-us"))
    }, [])
    return (
        <>
            {
                LoadingSelectorSelector ?
                    <div className='fullPageLoader'>
                        <LogoLoader />
                    </div>
                    :
                    AboutDetailSelector &&
                    <>
                        <InnerBanner
                            pageTitle={AboutDetailSelector.data.title}
                            subTitle={AboutDetailSelector.data.title_short_note}
                        />
                        <div className="repeat-section about-us-section">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <SectionTitle title={AboutDetailSelector.data.description_side_title} ShapeImage="heading-clip-1.svg" />
                                    </div>
                                    <div className="col-lg-6" dangerouslySetInnerHTML={{ __html: AboutDetailSelector.data.description }} />
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    );
};

export default AboutUS;
