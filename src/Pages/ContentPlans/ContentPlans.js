import React from 'react';
import Banner from "../../Components/Common/Banner/Banner";
import { Tab, Tabs } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import { InputText } from '../../Components/Common/Inputs/Inputs';
import CommonButton from '../../Components/Common/Buttons/Buttons';
import './ContentPlans.css';

const ContentPlans = () => {
    let { id } = useParams();

    return (
        <>
            <Banner BannerHeading="Content Plans" BannerSubHeading={<p>Curated and approved content by Kenya Institute <br /> of Curriculum Development (KICD)</p>} />
            <section className="what-section pad-t-80 pad-b-80">
                <div className="container">
                    <ol className="breadcrumb mb-5">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Content Plans</li>
                    </ol>
                    <Tabs defaultActiveKey={id} className="ContentPlansTabs" id="ContentPlansTabs">
                        <Tab eventKey="bronze-plans" title={<><img src="/images/bronze-icon.svg" alt="bronze" /> <h2>Bronze</h2> <p>Up to 25% off</p></>}>
                            <div className="contentPlans-bx" offer="UP TO 25% OFF">
                                <div className="row align-items-center">
                                    <div className='col-lg-7'>
                                        <div className="alert alert-primary mb-0" role="alert"> Please select either Monthly, Termly or Yearly plan then select your subjects. (Minimum 1 subject MUST bet selected). Enter the number of users that will access the content and continue. </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="row mb-2">
                                            <div className="col text-center">Monthly</div>
                                            <div className="col text-center">Termly</div>
                                            <div className="col text-center">Yearly</div>
                                        </div>
                                        <div className="priceBx mb-4">
                                            <div className="row">
                                                <label className="col">
                                                    <input type="radio" name="bronze" defaultChecked={true} />
                                                    <span>KSh 25.00</span>
                                                </label>
                                                <label className="col">
                                                    <input type="radio" name="bronze" />
                                                    <span>KSh 22.00</span>
                                                </label>
                                                <label className="col">
                                                    <input type="radio" name="bronze" />
                                                    <span>KSh 18.00</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-parent-row'>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 1 <span className="subject-price">(Each subject Kshs.25.00)</span></h2>
                                        <div className="row mt-4">
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Mathematical Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> English  Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Kiswahili Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> CRE Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Environmental Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Hygiene & Nutrition Activities</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 2 <span className="subject-price">(Each subject Kshs.25.00)</span></h2>
                                        <div className="row mt-4">
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Mathematical Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> English  Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Kiswahili Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> CRE Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Environmental Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Hygiene & Nutrition Activities</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 3 <span className="subject-price">(Each subject Kshs.25.00)</span></h2>
                                        <div className="row mt-4">
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Mathematical Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> English  Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Kiswahili Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> CRE Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Environmental Activities</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Hygiene & Nutrition Activities</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 4 <span className="subject-price">(Each subject Kshs.25.00)</span></h2>
                                        <div className="row mt-4">
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> English</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Kiswahili</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Home Science</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Agriculture</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Science and Technology</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Mathematics</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Religious Education (CRE)</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Social Studies</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 5 <span className="subject-price">(Each subject Kshs.25.00)</span></h2>
                                        <div className="row mt-4">
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> English</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Kiswahili</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Home Science</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Agriculture</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Science and Technology</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Mathematics</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Religious Education (CRE)</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Creative Arts (Music)</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Physical and Health Education</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Social Studies</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Class 6 <span className="subject-price">(Each subject Kshs.25.00)</span></h2>
                                        <div className="row mt-4">
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Mathematics</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> English</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Kiswahili</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Science</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i>  Social Studies</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> CRE</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Class 7 <span className="subject-price">(Each subject Kshs.25.00)</span></h2>
                                        <div className="row mt-4">
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Mathematics</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> English</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Kiswahili</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Science</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i>  Social Studies</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> CRE</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Class 8 <span className="subject-price">(Each subject Kshs.25.00)</span></h2>
                                        <div className="row mt-4">
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Mathematics</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> English</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Kiswahili</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Science</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i>  Social Studies</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> CRE</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">KCPE Revision <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <div className="row mt-4">
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Mathematics</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> English</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Kiswahili</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> Science</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i>  Social Studies</span>
                                                </label>
                                            </div>
                                            <div className="col-lg-4 mt-4">
                                                <label className="checkbox2">
                                                    <input type="checkbox" />
                                                    <span><i></i> CRE</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="subscription-total">
                                        <div className="num-of-user">
                                            <label>No. of users <small>(Please enter the number of users to be accessing the content)</small></label>
                                            <InputText FormGroupClass="mb-0" type="number"/>
                                        </div>
                                        <div className="grand-total-bx">
                                            <p><strong>Total:</strong> KSh 25.00</p>
                                            <CommonButton isLink="true" URL="/order-details" BtnColor="green" BtnText="Continue" hasIconImg="true" IconImgPath="right-arrow.svg"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="silver-plans" title={<><img src="/images/silver-icon.svg" alt="silver" /> <h2>Silver</h2> <p>Up to 36% off</p></>}>
                            <div className="contentPlans-bx" offer="UP TO 36% OFF">
                                <div className="row align-items-center">
                                    <div className='col-lg-7'>
                                        <div className="alert alert-primary mb-0" role="alert"> Please select either Monthly, Termly or Yearly plan then select your subjects. (Minimum 1 Grade/Class Level MUST bet selected). Enter the number of users that will access the content and continue.</div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="row mb-2">
                                            <div className="col text-center">Monthly</div>
                                            <div className="col text-center">Termly</div>
                                            <div className="col text-center">Yearly</div>
                                        </div>
                                        <div className="priceBx mb-4">
                                            <div className="row">
                                                <label className="col">
                                                    <input type="radio" name="silvergrade" defaultChecked={true} />
                                                    <span>KSh 127.00</span>
                                                </label>
                                                <label className="col">
                                                    <input type="radio" name="silvergrade" />
                                                    <span>KSh 114.00</span>
                                                </label>
                                                <label className="col">
                                                    <input type="radio" name="silvergrade" />
                                                    <span>KSh 95.00</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-parent-row'>
                                    <label className="contentPlans-col-outer">
                                        <input type="checkbox" />
                                        <div className="contentPlans-col">
                                            <h2 className="contentPlans-title"><i></i> Grade 1 <span className="subject-price">(Each subject Ksh.21.00)</span></h2>
                                            <ul className="check-ul mt-4">
                                                <li>Mathematical Activities</li>
                                                <li>English  Activities</li>
                                                <li>Kiswahili Activities</li>
                                                <li>CRE Activities</li>
                                                <li>Environmental Activities</li>
                                                <li>Hygiene & Nutrition Activities</li>
                                            </ul>
                                        </div>
                                    </label>

                                    <label className="contentPlans-col-outer">
                                        <input type="checkbox" />
                                        <div className="contentPlans-col">
                                            <h2 className="contentPlans-title"><i></i> Grade 2 <span className="subject-price">(Each subject Ksh.21.00)</span> </h2>
                                            <ul className="check-ul mt-4">
                                                <li>Mathematical Activities</li>
                                                <li>English  Activities</li>
                                                <li>Kiswahili Activities</li>
                                                <li>CRE Activities</li>
                                                <li>Environmental Activities</li>
                                                <li>Hygiene & Nutrition Activities</li>
                                            </ul>
                                        </div>
                                    </label>

                                    <label className="contentPlans-col-outer">
                                        <input type="checkbox" />
                                        <div className="contentPlans-col">
                                            <h2 className="contentPlans-title"><i></i> Grade 3 <span className="subject-price">(Each subject Ksh.21.00)</span></h2>
                                            <ul className="check-ul mt-4">
                                                <li>Mathematical Activities</li>
                                                <li>English  Activities</li>
                                                <li>Kiswahili Activities</li>
                                                <li>CRE Activities</li>
                                                <li>Environmental Activities</li>
                                                <li>Hygiene & Nutrition Activities</li>
                                            </ul>
                                        </div>
                                    </label>
                                    <label className="contentPlans-col-outer">
                                        <input type="checkbox" />
                                        <div className="contentPlans-col">
                                            <h2 className="contentPlans-title"><i></i> Grade 4 <span className="subject-price">(Each subject Ksh.21.00)</span></h2>
                                            <ul className="check-ul mt-4">
                                                <li>English</li>
                                                <li>Kiswahili</li>
                                                <li>Home Science</li>
                                                <li>Agriculture</li>
                                                <li>Science and Technology</li>
                                                <li>Mathematics</li>
                                                <li>Religious Education (CRE)</li>
                                                <li>Social Studies</li>
                                            </ul>
                                        </div>
                                    </label>
                                    <label className="contentPlans-col-outer">
                                        <input type="checkbox" />
                                        <div className="contentPlans-col">
                                            <div className="row align-items-center">
                                                <div className="col-sm-7">
                                                    <h2 className="contentPlans-title"><i></i> Grade 5 <span className="subject-price">(Each subject Ksh.21.00)</span> </h2>
                                                </div>
                                                <div className="col-sm-5">
                                                    <div className="row mb-2">
                                                        <div className="col text-center">Monthly</div>
                                                        <div className="col text-center">Termly</div>
                                                        <div className="col text-center">Yearly</div>
                                                    </div>
                                                    <div className="priceBx mb-4">
                                                        <div className="row">
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 127.00</span>
                                                            </label>
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 114.00</span>
                                                            </label>
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 95.00</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="check-ul mt-4">
                                                <li>English</li>
                                                <li>Kiswahili</li>
                                                <li>Home Science</li>
                                                <li>Agriculture</li>
                                                <li>Science and Technology</li>
                                                <li>Mathematics</li>
                                                <li>Religious Education (CRE)</li>
                                                <li>Creative Arts (Music)</li>
                                                <li>Physical and Health Education</li>
                                                <li>Social Studies</li>
                                            </ul>
                                        </div>
                                    </label>

                                    <label className="contentPlans-col-outer">
                                        <input type="checkbox" />
                                        <div className="contentPlans-col">
                                            <div className="row align-items-center">
                                                <div className="col-sm-7">
                                                    <h2 className="contentPlans-title"><i></i> Class 6 <span className="subject-price">(Each subject Ksh.21.00)</span> </h2>
                                                </div>
                                                <div className="col-sm-5">
                                                    <div className="row mb-2">
                                                        <div className="col text-center">Monthly</div>
                                                        <div className="col text-center">Termly</div>
                                                        <div className="col text-center">Yearly</div>
                                                    </div>
                                                    <div className="priceBx mb-4">
                                                        <div className="row">
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 127.00</span>
                                                            </label>
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 114.00</span>
                                                            </label>
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 95.00</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="check-ul mt-4">
                                                <li>Mathematics</li>
                                                <li>English</li>
                                                <li>Kiswahili</li>
                                                <li>Science</li>
                                                <li>Social Studies</li>
                                                <li>CRE</li>
                                            </ul>
                                        </div>
                                    </label>

                                    <label className="contentPlans-col-outer">
                                        <input type="checkbox" />
                                        <div className="contentPlans-col">
                                            <div className="row align-items-center">
                                                <div className="col-sm-7">
                                                    <h2 className="contentPlans-title"><i></i> Class 7 <span className="subject-price">(Each subject Ksh.21.00)</span> </h2>
                                                </div>
                                                <div className="col-sm-5">
                                                    <div className="row mb-2">
                                                        <div className="col text-center">Monthly</div>
                                                        <div className="col text-center">Termly</div>
                                                        <div className="col text-center">Yearly</div>
                                                    </div>
                                                    <div className="priceBx mb-4">
                                                        <div className="row">
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 127.00</span>
                                                            </label>
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 114.00</span>
                                                            </label>
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 95.00</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="check-ul mt-4">
                                                <li>Mathematics</li>
                                                <li>English</li>
                                                <li>Kiswahili</li>
                                                <li>Science</li>
                                                <li>Social Studies</li>
                                                <li>CRE</li>
                                            </ul>
                                        </div>
                                    </label>

                                    <label className="contentPlans-col-outer">
                                        <input type="checkbox" />
                                        <div className="contentPlans-col">
                                            <div className="row align-items-center">
                                                <div className="col-sm-7">
                                                    <h2 className="contentPlans-title"><i></i> Class 8 <span className="subject-price">(Each subject Ksh.21.00)</span> </h2>
                                                </div>
                                                <div className="col-sm-5">
                                                    <div className="row mb-2">
                                                        <div className="col text-center">Monthly</div>
                                                        <div className="col text-center">Termly</div>
                                                        <div className="col text-center">Yearly</div>
                                                    </div>
                                                    <div className="priceBx mb-4">
                                                        <div className="row">
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 127.00</span>
                                                            </label>
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 114.00</span>
                                                            </label>
                                                            <label className="col">
                                                                <input type="radio" name="silvergrade" />
                                                                <span>KSh 95.00</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="check-ul mt-4">
                                                <li>Mathematics</li>
                                                <li>English</li>
                                                <li>Kiswahili</li>
                                                <li>Science</li>
                                                <li>Social Studies</li>
                                                <li>CRE</li>
                                            </ul>
                                        </div>
                                    </label>

                                    <label className="contentPlans-col-outer">
                                        <input type="checkbox" />
                                        <div className="contentPlans-col">
                                            <h2 className="contentPlans-title"><i></i> KCPE Revision <span className="subject-price">(Each subject Ksh.21.00)</span> </h2>
                                            <ul className="check-ul mt-4">
                                                <li>Mathematics</li>
                                                <li>English</li>
                                                <li>Kiswahili</li>
                                                <li>Science</li>
                                                <li>Social Studies</li>
                                                <li>CRE</li>
                                            </ul>
                                        </div>
                                    </label>
                                    <div className="subscription-total">
                                        <div className="num-of-user">
                                            <label>No. of users <small>(Please enter the number of users to be accessing the content)</small></label>
                                            <InputText FormGroupClass="mb-0" type="number" />
                                        </div>
                                        <div className="grand-total-bx">
                                            <p><strong>Total:</strong> KSh 25.00</p>
                                            <CommonButton isLink="true" URL="/order-details" BtnColor="green" BtnText="Continue" hasIconImg="true" IconImgPath="right-arrow.svg"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="gold-plans" title={<><img src="/images/gold-icon.svg" alt="gold" /> <h2>Gold</h2> <p>Up to 44% off</p></>}>
                            <div className="contentPlans-bx" offer="UP TO 44% OFF">
                                <div className="row align-items-center">
                                    <div className='col-lg-7'>
                                        <div className="alert alert-primary mb-0" role="alert"> Please select either Monthly, Termly or Yearly plan.(All subjects for all levels will be selected automatically). Enter the number of users that will access the content and continue.</div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="row mb-2">
                                            <div className="col text-center">Monthly</div>
                                            <div className="col text-center">Termly</div>
                                            <div className="col text-center">Yearly</div>
                                        </div>
                                        <div className="priceBx mb-4">
                                            <div className="row">
                                                <label className="col">
                                                    <input type="radio" name="goldgrade" defaultChecked={true} />
                                                    <span>KSh 975.00</span>
                                                </label>
                                                <label className="col">
                                                    <input type="radio" name="goldgrade" />
                                                    <span>KSh 877.00</span>
                                                </label>
                                                <label className="col">
                                                    <input type="radio" name="goldgrade" />
                                                    <span>KSh 731.00</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-parent-row'>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 1 <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <ul className="check-ul mt-4">
                                            <li>Mathematical Activities</li>
                                            <li>English  Activities</li>
                                            <li>Kiswahili Activities</li>
                                            <li>CRE Activities</li>
                                            <li>Environmental Activities</li>
                                            <li>Hygiene & Nutrition Activities</li>
                                        </ul>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 2 <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <ul className="check-ul mt-4">
                                            <li>Mathematical Activities</li>
                                            <li>English  Activities</li>
                                            <li>Kiswahili Activities</li>
                                            <li>CRE Activities</li>
                                            <li>Environmental Activities</li>
                                            <li>Hygiene & Nutrition Activities</li>
                                        </ul>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 3 <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <ul className="check-ul mt-4">
                                            <li>Mathematical Activities</li>
                                            <li>English  Activities</li>
                                            <li>Kiswahili Activities</li>
                                            <li>CRE Activities</li>
                                            <li>Environmental Activities</li>
                                            <li>Hygiene & Nutrition Activities</li>
                                        </ul>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 4 <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <ul className="check-ul mt-4">
                                            <li>English</li>
                                            <li>Kiswahili</li>
                                            <li>Home Science</li>
                                            <li>Agriculture</li>
                                            <li>Science and Technology</li>
                                            <li>Mathematics</li>
                                            <li>Religious Education (CRE)</li>
                                            <li>Social Studies</li>
                                        </ul>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Grade 5 <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <ul className="check-ul mt-4">
                                            <li>English</li>
                                            <li>Kiswahili</li>
                                            <li>Home Science</li>
                                            <li>Agriculture</li>
                                            <li>Science and Technology</li>
                                            <li>Mathematics</li>
                                            <li>Religious Education (CRE)</li>
                                            <li>Creative Arts (Music)</li>
                                            <li>Physical and Health Education</li>
                                            <li>Social Studies</li>
                                        </ul>
                                    </div>

                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Class 6 <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <ul className="check-ul mt-4">
                                            <li>Mathematics</li>
                                            <li>English</li>
                                            <li>Kiswahili</li>
                                            <li>Science</li>
                                            <li>Social Studies</li>
                                            <li>CRE</li>
                                        </ul>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Class 7 <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <ul className="check-ul mt-4">
                                            <li>Mathematics</li>
                                            <li>English</li>
                                            <li>Kiswahili</li>
                                            <li>Science</li>
                                            <li>Social Studies</li>
                                            <li>CRE</li>
                                        </ul>
                                    </div>
                                    <div className="contentPlans-col">
                                        <h2 className="contentPlans-title">Class 8 <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <ul className="check-ul mt-4">
                                            <li>Mathematics</li>
                                            <li>English</li>
                                            <li>Kiswahili</li>
                                            <li>Science</li>
                                            <li>Social Studies</li>
                                            <li>CRE</li>
                                        </ul>
                                    </div>
                                    <div className="contentPlans-col mt-3">
                                        <h2 className="contentPlans-title">KCPE Revision <span className="subject-price">(Each subject Ksh.18.00)</span></h2>
                                        <ul className="check-ul mt-4">
                                            <li>Mathematics</li>
                                            <li>English</li>
                                            <li>Kiswahili</li>
                                            <li>Science</li>
                                            <li>Social Studies</li>
                                            <li>CRE</li>
                                        </ul>
                                    </div>
                                    <div className="subscription-total">
                                        <div className="num-of-user">
                                            <label>No. of users <small>(Please enter the number of users to be accessing the content)</small></label>
                                            <InputText FormGroupClass="mb-0" type="number"/>
                                        </div>
                                        <div className="grand-total-bx">
                                            <p><strong>Total:</strong> KSh 25.00</p>
                                            <CommonButton isLink="true" URL="/order-details" BtnColor="green" BtnText="Continue" hasIconImg="true" IconImgPath="right-arrow.svg"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </>
    );
}

export default ContentPlans;