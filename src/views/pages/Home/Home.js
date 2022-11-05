import React, { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { HomePageDetailAction } from '../../../redux/actions/cmsAction';
import 'react-loading-skeleton/dist/skeleton.css'
import { LogoLoader } from '../../Components/Common/LogoLoader/LogoLoader';

const Home = (props) => {
    const dispatch = useDispatch()

    const HomePageDetailSelector = useSelector(state => state.cms_content.home_page_detail.data)
    const LoadingSelectorSelector = useSelector(state => state.cms_content.loading)

    console.log("HomePageDetail", HomePageDetailSelector);
    console.log("LoadingSelectorSelector", LoadingSelectorSelector);


    useEffect(() => {
        dispatch(HomePageDetailAction())
    }, [dispatch])
    return (
        <>
            {
                LoadingSelectorSelector ?
                    <div className='fullPageLoader'>
                        <LogoLoader />
                    </div>
                    :
                    <>
                        <section className="home-banner-section">
                            <div className="container-fluid">
                                <div className="row align-items-center">
                                    <div className="col-lg-5 home-banner-caption">
                                        <h1> {HomePageDetailSelector && HomePageDetailSelector.data.bannerSection.title} </h1>
                                        <p>{HomePageDetailSelector && HomePageDetailSelector.data.bannerSection.content}</p>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="home-banner-img text-end">
                                            <img src={HomePageDetailSelector && HomePageDetailSelector.data.bannerSection.image ? HomePageDetailSelector.data.bannerSection.image : "/images/banner-img-placeholder.svg"} alt="Finding Clinical Trials for Patients" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="what-section repeat-section" id='aboutus'>
                            <div className="container">
                                {
                                    HomePageDetailSelector?.data.sectionOne !== undefined &&
                                    <div className="sec-title text-center">
                                        <h2 className="h2"> {HomePageDetailSelector.data.sectionOne.title} </h2>
                                        <img src="/images/heading-clip-1.svg" alt="shape vector" />
                                        <p class="what-sec-text pad-t-30">{HomePageDetailSelector.data.sectionOne.sub_title}</p>
                                        <div className='what-is-clinicaltrial' dangerouslySetInnerHTML={{ __html: HomePageDetailSelector.data.sectionOne.content }}></div>
                                    </div>
                                }
                            </div>
                        </section>

                        <section className="clinical-info-section repeat-section">
                            <div className="container">
                                {
                                    HomePageDetailSelector?.data.sectionTwo !== undefined &&
                                    <div className="row align-items-center">
                                        <div className="col-lg-5">
                                            <div className='clinicalImgBx'>
                                                <img src={HomePageDetailSelector.data.sectionTwo.image ? HomePageDetailSelector.data.sectionTwo.image : "/images/placeholder-img2.svg"} alt="Patients & Families" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 offset-lg-1">
                                            <div className="sec-title">
                                                <h2 className="h2"> {HomePageDetailSelector.data.sectionTwo.title} </h2>
                                                <img src="/images/heading-clip-1.svg" alt="shape vector" />
                                                <p className='what-sec-text mx-0 pad-t-30' dangerouslySetInnerHTML={{ __html: HomePageDetailSelector.data.sectionTwo.content }}></p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    HomePageDetailSelector?.data.sectionThree !== undefined &&
                                    <div className="row align-items-center">
                                        <div className="col-lg-5 order-last offset-lg-1">
                                            <div className='clinicalImgBx'>
                                                <img src={HomePageDetailSelector.data.sectionThree.image ? HomePageDetailSelector.data.sectionThree.image : "/images/placeholder-img2.svg"} alt="Trial Clinic & Physicians" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="sec-title">
                                                <h2 className="h2"> {HomePageDetailSelector.data.sectionThree.title} </h2>
                                                <img src="/images/heading-clip-1.svg" alt="shape vector" />
                                                <p className='what-sec-text mx-0 pad-t-30' dangerouslySetInnerHTML={{ __html: HomePageDetailSelector.data.sectionThree.content }}></p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    HomePageDetailSelector?.data.sectionFour !== undefined &&
                                    <div className="row align-items-center">
                                        <div className="col-lg-5">
                                            <div className='clinicalImgBx'>
                                                <img src={HomePageDetailSelector.data.sectionFour.image ? HomePageDetailSelector.data.sectionFour.image : "/images/placeholder-img2.svg"} alt="Pharma Companies & CRO" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 offset-lg-1">
                                            <div className="sec-title">
                                                <h2 className="h2"> {HomePageDetailSelector.data.sectionFour.title} </h2>
                                                <img src="/images/heading-clip-1.svg" alt="shape vector" />
                                                <p className='what-sec-text mx-0 pad-t-30' dangerouslySetInnerHTML={{ __html: HomePageDetailSelector.data.sectionFour.content }}></p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </section>

                        <section className="why-choose-clinicaltrial repeat-section">
                            <div className="container">
                                {
                                    HomePageDetailSelector?.data.sectionFive !== undefined &&
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <div className="sec-title mb-5">
                                                <h2 className="h2"> {HomePageDetailSelector.data.sectionFive.title} </h2>
                                                <img src="/images/heading-clip-2.svg" alt="shape vector" />
                                            </div>
                                            <ul className="why-choose-points">
                                                <li count="01">
                                                    <h2>{HomePageDetailSelector.data.sectionFive.content_heading}</h2>
                                                    <p>{HomePageDetailSelector.data.sectionFive.content}</p>
                                                </li>
                                                <li count="02">
                                                    <h2>{HomePageDetailSelector.data.sectionFive.sec_content_heading}</h2>
                                                    <p>{HomePageDetailSelector.data.sectionFive.sec_content}</p>
                                                </li>
                                                <li count="03">
                                                    <h2>{HomePageDetailSelector.data.sectionFive.third_content_heading}</h2>
                                                    <p>{HomePageDetailSelector.data.sectionFive.third_content}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 text-end">
                                            <img src={HomePageDetailSelector.data.sectionFive.image ? HomePageDetailSelector.data.sectionFive.image : "/images/how-it-works.svg"} alt="How It Works" />
                                        </div>
                                    </div>
                                }
                            </div>
                        </section>
                    </>
            }
        </>
    );
}

export default Home;