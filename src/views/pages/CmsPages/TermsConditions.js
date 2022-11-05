import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CmsPageDetailAction } from "../../../redux/actions/cmsAction";
import InnerBanner from "../../Components/Common/InnerBanner/InnerBanner";
import { LogoLoader } from "../../Components/Common/LogoLoader/LogoLoader";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import './AboutUs.css';


const TermsConditions = () => {
    const dispatch = useDispatch()

    const TermsPageDetailSelector = useSelector(state => state.cms_content.cms_page_detail.data)
    const LoadingSelectorSelector = useSelector(state => state.cms_content.loading)

    console.log("TermsPageDetail", TermsPageDetailSelector);
    console.log("LoadingSelectorSelector", LoadingSelectorSelector);


    useEffect(() => {
        dispatch(CmsPageDetailAction("terms-and-conditions"))
    }, [])
    return (
        <>
            {
                LoadingSelectorSelector ?
                    <div className='fullPageLoader'>
                        <LogoLoader />
                    </div>
                    :
                    TermsPageDetailSelector &&
                    <>
                        <InnerBanner
                            pageTitle={TermsPageDetailSelector.data.title}
                            subTitle={TermsPageDetailSelector.data.title_short_note}
                        />
                        <div className="container">
                            <div className="repeat-section about-us-section cms-content-section" dangerouslySetInnerHTML={{ __html: TermsPageDetailSelector.data.description }} />
                        </div>
                    </>
            }
        </>
    );
};

export default TermsConditions;
