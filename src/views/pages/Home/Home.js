import React from 'react';
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import Button from "../../Components/Common/Buttons/Buttons";
import { InputText, SelectBox } from "../../Components/Common/Inputs/Inputs";
import './Home.css';

const Home = (props) => {

    const SearchSubmit = () => {
        props.history.push("/clinic-listing")
    }

    return (
        <>
            <section className="home-banner-section">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-5 home-banner-caption">
                            <div className='news-bx'>
                                <span>News</span> Lorem ipsum dolor amet consectetur adipiscing elit.
                            </div>

                            <h1> Finding Clinical Trials for Patients </h1>
                            <p> Search for mental health clinical trials. </p>
                            <form action="" className='searchTrial-form-bx'>
                                <div className='row align-items-center'>
                                    <div className='col search-from-col'>
                                        <label>Search for Trial</label>
                                        <InputText
                                            type="search"
                                            FormGroupClass="mb-0"
                                            placeholder="Keywords"
                                        />
                                    </div>
                                    <div className='col search-from-col'>
                                        <label>Condition</label>
                                        <SelectBox
                                            type="search"
                                            placeholder="Keywords"
                                            FormGroupClass="mb-0"
                                            optionData={
                                                <>
                                                    <option>Select</option>
                                                    <option>Critical</option>
                                                    <option>Average</option>
                                                </>
                                            }
                                        />
                                    </div>
                                    <div className='col search-from-col'>
                                        <label>Zip Code</label>
                                        <InputText
                                            type="text"
                                            FormGroupClass="mb-0"
                                            placeholder="Enter Code"
                                        />
                                    </div>
                                    <div className='col search-btn-col'>
                                        <button onClick={SearchSubmit}><img src="/images/search-icon.svg" alt="icon" /></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-7">
                            <div className="home-banner-img text-end">
                                <img src="/images/home-banner-img.png" alt="Finding Clinical Trials for Patients" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="what-section repeat-section" id='aboutus'>
                <div className="container">
                    <SectionTitle CustomClass="text-center" title="What is Clinical Trial Link?" SubHeading={<p className="what-sec-text pad-t-30"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a dolor aliquam, pulvinar augue at, dictum nibh.</p>} ShapeImage="heading-clip-1.svg" />
                    <div className="what-is-clinicaltrial">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a dolor aliquam, pulvinar augue at, dictum nibh. Curabitur vel lobortis eros. Nam eu sem lobortis, pretium erat sit amet, egestas neque. Ut mattis arcu eu dolor blandit, sit amet convallis lectus fringilla. Duis ante lorem, tincidunt eu commodo quis, condimentum ut sapien. Pellentesque vitae nulla felis. Integer scelerisque elit ac dui sollicitudin, sit amet lacinia leo euismod.</p>
                        <p>Quisque dignissim vitae sem sit amet convallis. Vivamus a aliquet odio. Vestibulum eu pretium nunc, vel vehicula sapien. Curabitur sed ornare neque. Maecenas vel sollicitudin velit. Ut ac ipsum sed metus euismod sagittis. Sed at fermentum erat, in ornare velit. Curabitur eleifend sed urna non fringilla. Cras purus tellus, rutrum eget est eget, sagittis pellentesque massa. Suspendisse molestie et sapien sed suscipit. Aenean aliquam eros et tellus finibus commodo.</p>
                    </div>
                </div>
            </section>

            <section className="clinical-info-section repeat-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className='clinicalImgBx'>
                                <img src="/images/patients-families-img.jpg" alt="Patients & Families" />
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <SectionTitle title="Patients & Families" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text mx-0 pad-t-30">Lorem ipsum dolor sit amet consectetur dipiscing elit vivamus a dolor aliquam pulvinar augue ctum nibh curabitur vel lobortis eros nam eu lobortis pretium erat sit amet egestas neque.</p>} HeadingBtn={<Button isLink="true" URL="/sign-up" BtnColor="primary mt-5" BtnText="Learn More" />} />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-5 order-last offset-lg-1">
                            <div className='clinicalImgBx'>
                                <img src="/images/doctor-img.jpg" alt="Trial Clinic & Physicians" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <SectionTitle title="Trial Clinic & Physicians" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text mx-0 pad-t-30">Lorem ipsum dolor sit amet consectetur dipiscing elit vivamus a dolor aliquam pulvinar augue ctum nibh curabitur vel lobortis eros nam eu lobortis pretium erat sit amet egestas neque.</p>} HeadingBtn={<Button isLink="true" URL="/sign-up" BtnColor="primary mt-5" BtnText="Learn More" />} />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className='clinicalImgBx'>
                                <img src="/images/pharma-companies.jpg" alt="Pharma Companies & CRO" />
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <SectionTitle title="Pharma Companies & CRO" ShapeImage="heading-clip-2.svg" SubHeading={<p className="what-sec-text mx-0 pad-t-30">Lorem ipsum dolor sit amet consectetur dipiscing elit vivamus a dolor aliquam pulvinar augue ctum nibh curabitur vel lobortis eros nam eu lobortis pretium erat sit amet egestas neque.</p>} HeadingBtn={<Button isLink="true" URL="/sign-up" BtnColor="primary mt-5" BtnText="Learn More" />} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-choose-clinicaltrial repeat-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <SectionTitle title="How It Works" CustomClass="mb-5" ShapeImage="heading-clip-2.svg" />
                            <ul className="why-choose-points">
                                <li count="01">
                                    <h2>See Matching Clinical Trials.</h2>
                                    <p>Clinical Trial Link, based on your mental health condition and geographical location, will match you with appropriate clinical trials.</p>
                                </li>
                                <li count="02">
                                    <h2>Contact the Health Care Facility</h2>
                                    <p>Once you identify a clinical trial, you can contact the health care provider to enquire about your participation in the trial.</p>
                                </li>
                                <li count="03">
                                    <h2>Obtain Customized Insights</h2>
                                    <p>We send you personalized notifications about new clinical trials that might be suitable for you.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6 text-end">
                            <img src="/images/how-it-works.svg" alt="How It Works " />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;