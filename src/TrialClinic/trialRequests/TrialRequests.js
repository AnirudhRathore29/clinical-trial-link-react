import Button from '../../views/components/Common/Buttons/Buttons';
import '../../patient/dashboard/Dashboard.css';
import './TrialRequests.css'

const ClinicSponsorsListing = () => {
    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>New Trial Request</h1>
                    </div>

                    <table className='patient-list-table'>
                        <tr>
                            <th align='center'>#</th>
                            <th>Patient Details</th>
                            <th>Trial Name</th>
                            <th>Location</th>
                            <th>Date & Time</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>
                                <div className='patient-img'>
                                    <img src="/images/avatar2.svg" width={150} alt="patient" />
                                </div>
                            </td>
                            <td>
                                <h2>David Smith</h2>
                                <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                            </td>
                            <td>
                                Adolescents with ADHD and a Parent with
                                Bipolar Disorder
                            </td>
                            <td>Morrisville, NC, United States</td>
                            <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            <td>
                                <div className='btn-group-custom'>
                                    <Button
                                        isButton="true"
                                        BtnColor="green btn-sm"
                                        BtnText="Reject"
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary btn-sm"
                                        BtnText="Approve"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='patient-img'>
                                    <img src="/images/avatar2.svg" width={150} alt="patient" />
                                </div>
                            </td>
                            <td>
                                <h2>David Smith</h2>
                                <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                            </td>
                            <td>
                                Adolescents with ADHD and a Parent with
                                Bipolar Disorder
                            </td>
                            <td>Morrisville, NC, United States</td>
                            <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            <td>
                                <div className='btn-group-custom'>
                                    <Button
                                        isButton="true"
                                        BtnColor="green btn-sm"
                                        BtnText="Reject"
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary btn-sm"
                                        BtnText="Approve"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='patient-img'>
                                    <img src="/images/avatar2.svg" width={150} alt="patient" />
                                </div>
                            </td>
                            <td>
                                <h2>David Smith</h2>
                                <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                            </td>
                            <td>
                                Adolescents with ADHD and a Parent with
                                Bipolar Disorder
                            </td>
                            <td>Morrisville, NC, United States</td>
                            <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            <td>
                                <div className='btn-group-custom'>
                                    <Button
                                        isButton="true"
                                        BtnColor="green btn-sm"
                                        BtnText="Reject"
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary btn-sm"
                                        BtnText="Approve"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='patient-img'>
                                    <img src="/images/avatar2.svg" width={150} alt="patient" />
                                </div>
                            </td>
                            <td>
                                <h2>David Smith</h2>
                                <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                            </td>
                            <td>
                                Adolescents with ADHD and a Parent with
                                Bipolar Disorder
                            </td>
                            <td>Morrisville, NC, United States</td>
                            <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            <td>
                                <div className='btn-group-custom'>
                                    <Button
                                        isButton="true"
                                        BtnColor="green btn-sm"
                                        BtnText="Reject"
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary btn-sm"
                                        BtnText="Approve"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='patient-img'>
                                    <img src="/images/avatar2.svg" width={150} alt="patient" />
                                </div>
                            </td>
                            <td>
                                <h2>David Smith</h2>
                                <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                            </td>
                            <td>
                                Adolescents with ADHD and a Parent with
                                Bipolar Disorder
                            </td>
                            <td>Morrisville, NC, United States</td>
                            <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            <td>
                                <div className='btn-group-custom'>
                                    <Button
                                        isButton="true"
                                        BtnColor="green btn-sm"
                                        BtnText="Reject"
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary btn-sm"
                                        BtnText="Approve"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='patient-img'>
                                    <img src="/images/avatar2.svg" width={150} alt="patient" />
                                </div>
                            </td>
                            <td>
                                <h2>David Smith</h2>
                                <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                            </td>
                            <td>
                                Adolescents with ADHD and a Parent with
                                Bipolar Disorder
                            </td>
                            <td>Morrisville, NC, United States</td>
                            <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            <td>
                                <div className='btn-group-custom'>
                                    <Button
                                        isButton="true"
                                        BtnColor="green btn-sm"
                                        BtnText="Reject"
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary btn-sm"
                                        BtnText="Approve"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='patient-img'>
                                    <img src="/images/avatar2.svg" width={150} alt="patient" />
                                </div>
                            </td>
                            <td>
                                <h2>David Smith</h2>
                                <p className='no-wrap'><span><strong>Gender :</strong> Male</span> <span><strong>DOB :</strong> March 26, 1991</span></p>
                                <p className='no-wrap'><strong>Phone Number :</strong> +01 919 719 2505</p>
                            </td>
                            <td>
                                Adolescents with ADHD and a Parent with
                                Bipolar Disorder
                            </td>
                            <td>Morrisville, NC, United States</td>
                            <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            <td>
                                <div className='btn-group-custom'>
                                    <Button
                                        isButton="true"
                                        BtnColor="green btn-sm"
                                        BtnText="Reject"
                                    />
                                    <Button
                                        isButton="true"
                                        BtnColor="primary btn-sm"
                                        BtnText="Approve"
                                    />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ClinicSponsorsListing;
