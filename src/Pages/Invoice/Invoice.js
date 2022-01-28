import React from 'react';
import { Link } from 'react-router-dom';
import Banner from "../../Components/Common/Banner/Banner";

const Invoice = () => {

    return (
        <>
            <Banner BannerHeading="E-INVOICE" BannerSubHeading={<p>Praesent sapien massa, convallis a pellentesque nec</p>} />
            <section className="what-section pad-t-80 pad-b-80">
                <center style={{ width: '800px', margin: 'auto' }}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/content-plans">Content Plans</Link></li>
                        <li className="breadcrumb-item"><Link to="/order-details">Order Details</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Generate Invoice</li>
                    </ol>
                    <table width="100%" cellPadding={0} cellSpacing={0}>
                        <tbody><tr>
                            <td height={30} />
                        </tr>
                        </tbody>
                    </table>
                    <table cellPadding={0} cellSpacing={0} width="100%" bgcolor="#fce8d1" style={{ padding: '0 30px' }}>
                        <tbody>
                            <tr>
                                <td height={20} />
                            </tr>
                            <tr>
                                <td width="30"></td>
                                <td>
                                    <table width="100%" cellPadding="0" cellSpacing="0">
                                        <tr>
                                            <td align="left">
                                                <img src="../images/logo.svg" alt="Logo" width={180} height={120} style={{ display: 'block' }} />
                                            </td>
                                            <td align="center">
                                                <h2 style={{ fontSize: '28px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0, marginBottom: '10px' }}> e-Invoice</h2>
                                                <p style={{ fontSize: '15px', whiteSpace: 'nowrap' }}>  <strong style={{ minWidth: '70px', display: 'inline-block' }}>Invoice#</strong> &nbsp;&nbsp; 56789</p>
                                                <p style={{ fontSize: '15px', whiteSpace: 'nowrap' }}>  <strong style={{ minWidth: '70px', display: 'inline-block' }}>Date:</strong> &nbsp;&nbsp; 06/06/2021</p>
                                            </td>
                                            <td align="right">
                                                <img src="../images/virtual-logo.png" alt="Logo" width={180} style={{ display: 'block' }} />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td width="30"></td>
                            </tr>
                            <tr>
                                <td height={20} />
                            </tr>
                        </tbody>
                    </table>
                    <table cellPadding={0} cellSpacing={0} width="100%" bgcolor="#f9f9f9" style={{ padding: '0 30px', fontSize: '15px' }}>
                        <tr>
                            <td height={30} />
                        </tr>
                        <tr>
                            <td width="30"></td>
                            <td>
                                <table width="100%" cellPadding="0" cellSpacing="0">
                                    <tr>
                                        <td className="body-content">
                                            <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                                                <tbody><tr>
                                                    <td width="60%">
                                                        <p style={{ color: '#000', fontSize: '16px' }}> Bill To: </p>
                                                        <p style={{ color: '#000', fontSize: '20px', fontWeight: 'bold' }}> George Wilson </p>
                                                        <p style={{ color: '#000', lineHeight: '1.5' }}> 1001 Potrero Ave, San Francisco,  <br /> California, United States 94110</p>
                                                        <p style={{ color: '#000', }}><strong>Tel:</strong> +254 111 044600</p>
                                                        <p style={{ color: '#000', }}><strong>E-mail:</strong> finance@virtual-essence.co.ke</p>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <p style={{ color: '#000', fontSize: '16px' }}> Plan info: </p>
                                <p> <strong style={{ minWidth: '100px', display: 'inline-block' }}>Plan:</strong> Bronze </p>
                                <p> <strong style={{ minWidth: '100px', display: 'inline-block' }}>Time:</strong> Monthly </p>
                                <p> <strong style={{ minWidth: '100px', display: 'inline-block' }}>No. of users:</strong> 5 Users </p>
                            </td>
                            <td width="30"></td>
                        </tr>
                        <tr>
                            <td height={30} />
                        </tr>
                    </table>
                    <table width="100%" bgcolor="#f9f9f9" cellPadding={10} cellSpacing={0} style={{ padding: '0 30px', fontSize: '15px' }}>
                        <tr>
                            <td width="20"></td>
                            <td>
                                <table width="100%" cellPadding="10" cellSpacing="0">
                                    <thead>
                                        <tr style={{ fontSize: '15px', whiteSpace: 'nowrap' }}>
                                            <th colSpan={2} style={{ fontWeight: 700 }} align="left"> Particular </th>
                                            <th style={{ fontWeight: 700 }} align="center">Price </th>
                                            <th style={{ fontWeight: 700 }} align="center"> Sub. QTY </th>
                                            <th style={{ fontWeight: 700 }} align="center"> Total </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={2} style={{ borderTop: '1px dashed #afafaf', lineHeight: '1.5' }}> <strong>Grade 1</strong> <br /> <small> Mathematical Activities, English Activities, Kiswahili Activities </small></td>
                                            <td style={{ borderTop: '1px dashed #afafaf', whiteSpace: 'nowrap' }} align="center"> KSh 25.00 </td>
                                            <td style={{ borderTop: '1px dashed #afafaf' }} align="center"> 3 </td>
                                            <td style={{ borderTop: '1px dashed #afafaf', textAlign: 'center', fontWeight: 600, whiteSpace: 'nowrap' }}> KSh 75.00 </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} style={{ borderTop: '1px dashed #afafaf', lineHeight: '1.5' }}> <strong>Grade 2</strong> <br /> <small> Mathematical Activities, English Activities, Kiswahili Activities </small></td>
                                            <td style={{ borderTop: '1px dashed #afafaf', whiteSpace: 'nowrap' }} align="center"> KSh 25.00 </td>
                                            <td style={{ borderTop: '1px dashed #afafaf' }} align="center"> 3 </td>
                                            <td style={{ borderTop: '1px dashed #afafaf', textAlign: 'center', fontWeight: 600, whiteSpace: 'nowrap' }}> KSh 75.00 </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} style={{ borderTop: '1px dashed #afafaf', borderBottom: '1px dashed #afafaf', lineHeight: '1.5' }}> <strong>Grade 3</strong> <br /> <small> Mathematical Activities, English Activities, Kiswahili Activities </small></td>
                                            <td style={{ borderTop: '1px dashed #afafaf', borderBottom: '1px dashed #afafaf', whiteSpace: 'nowrap' }} align="center"> KSh 25.00 </td>
                                            <td style={{ borderTop: '1px dashed #afafaf', borderBottom: '1px dashed #afafaf', }} align="center"> 3 </td>
                                            <td style={{ borderTop: '1px dashed #afafaf', borderBottom: '1px dashed #afafaf', textAlign: 'center', fontWeight: 600, whiteSpace: 'nowrap' }}> KSh 75.00 </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5} height={20}></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={3} style={{ color: '#000', lineHeight: '1.5', verticalAlign: 'text-bottom' }} rowSpan={3}>
                                                <p> <strong>Bank:</strong> Equity Bank</p>
                                                <p><strong>A/c Name:</strong> Virtual Essence Limited</p>
                                                <p><strong>A/c No.</strong> 1080295836928</p>
                                                <p><strong>Branch:</strong> Westlands</p>
                                                <p><strong>Code:</strong> 055</p>
                                                <p>Lipa na MPESA accepted at till No. 549407</p>
                                            </td>
                                            <td colSpan={2} align='right'>
                                                <p><strong style={{ paddingRight: '20px', fontWeight: 'normal' }}>Sub Total</strong> KSh 85.00</p>
                                                <p><strong style={{ paddingRight: '20px', fontWeight: 'normal' }}>Tax vat 18%</strong> KSh 08.00</p>
                                                <p><strong style={{ paddingRight: '20px', fontWeight: 'normal' }}>Discount 10%</strong> - KSh 18.00</p>
                                                <p style={{ borderTop: '2px solid #000', paddingTop: '10px' }}><strong style={{ paddingRight: '20px' }}>Total Amount</strong> <strong>KSh 75.00</strong></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height={30} />
                                        </tr>
                                    </tfoot>
                                </table>
                            </td>
                            <td width="20"></td>
                        </tr>
                    </table>
                    <table cellPadding={0} cellSpacing={0} width="100%" className="mail-footer" align="center" bgcolor="#fce8d1" style={{ borderTop: '1px solid #ddd' }}>
                        <tbody>
                            <tr>
                                <td height={30} />
                            </tr>
                            <tr align="center">
                                <td style={{ color: '#000000', fontWeight: 'bold', fontSize: '12px', lineHeight: '1.8' }}>  AppleWood Adams, Suite 511, Ngong Road P.O box 2422-00200, Nairobi, Kenya. <br /> +254 111 044600 | finance@virtual-essence.co.ke</td>
                            </tr>
                            <tr>
                                <td height={10} />
                            </tr>
                            <tr align="center">
                                <td style={{ color: '#000000', fontWeight: 'normal', fontSize: '12px' }}> www.msingipack.com </td>
                            </tr>
                            <tr>
                                <td height={30} />
                            </tr>
                        </tbody>
                    </table>
                    <div className="step-navigation">
                        <Link to="/order-details" className='btn btn-text'><img src="/images/left-arrow.svg" width="23" className='me-2 v-sub' alt="icon" /> Preview Order</Link>
                        <Link to="/thank-you" className='btn btn-green'>Continue <img src="/images/right-arrow.svg" className="white-icon v-sub ms-2" width="23" alt="icon" /></Link>
                    </div>
                </center>

            </section>
        </>
    );
}

export default Invoice;