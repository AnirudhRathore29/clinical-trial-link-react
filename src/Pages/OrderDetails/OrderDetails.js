import React from 'react';
import Banner from "../../Components/Common/Banner/Banner";
import { Link } from "react-router-dom";
import CommonButton from '../../Components/Common/Buttons/Buttons';
import './OrderDetails.css';

const OrderDetails = () => {

    return (
        <>
            <Banner BannerHeading="Order Details" BannerSubHeading={<p>Vivamus suscipit tortor eget felis porttitor volutpat.</p>} />
            <section className='order-details pad-t-80 pad-b-80'>
                <div className='container'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-5">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/content-plans">Content Plans</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Order Details</li>
                        </ol>
                    </nav>

                    <table className="table center-align-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" align='left'>Bronze Plan</th>
                                <th scope="col">Monthly Price</th>
                                <th scope="col">Sub. QTY</th>
                                <th scope="col">No. of users</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td align='left'>
                                    <strong className='d-block'>Grade 1</strong>
                                    Mathematical Activities, English Activities, Kiswahili Activities	
                                </td>
                                <td>KSh 25.00</td>
                                <td>3</td>
                                <td><input type="number" className='form-control qty-input' placeholder='Qty' defaultValue={1} /></td>
                                <td><strong>KSh 75.00</strong></td>
                                <td>
                                    <button className='btn-action btn-danger'><img src="/images/trash.svg" width={22} alt="icon" /></button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td align='left'>
                                    <strong className='d-block'>Grade 1</strong>
                                    Mathematical Activities, English Activities, Kiswahili Activities	
                                </td>
                                <td>KSh 25.00</td>
                                <td>3</td>
                                <td><input type="number" className='form-control qty-input' placeholder='Qty' defaultValue={1} /></td>
                                <td><strong>KSh 75.00</strong></td>
                                <td>
                                    <button className='btn-action btn-danger'><img src="/images/trash.svg" width={22} alt="icon" /></button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td align='left'>
                                    <strong className='d-block'>Grade 1</strong>
                                    Mathematical Activities, English Activities, Kiswahili Activities	
                                </td>
                                <td>KSh 25.00</td>
                                <td>3</td>
                                <td><input type="number" className='form-control qty-input' placeholder='Qty' defaultValue={1} /></td>
                                <td><strong>KSh 75.00</strong></td>
                                <td>
                                    <button className='btn-action btn-danger'><img src="/images/trash.svg" width={22} alt="icon" /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='order-total'>
                        <h2>Cart Total</h2>
                        <p>Sub Total: <span>KSh 75.00</span></p>
                        <p>Tax vat 18%: <span>KSh 08.00</span></p>
                        <p>Discount 10%: <span className='green-value'>- KSh 18.00</span></p>
                        <p><strong>Total:</strong> <strong>KSh 225.00</strong></p>
                    </div>

                    <div className="step-navigation">
                        <Link to="/content-plans" className='btn btn-text'><img src="/images/left-arrow.svg" width="23" className='me-2 v-sub' alt="icon" /> Preview Order</Link>
                        <CommonButton isLink="true" URL="/invoice" BtnColor="green" BtnText="Continue" hasIconImg="true" IconImgPath="right-arrow.svg"/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default OrderDetails;