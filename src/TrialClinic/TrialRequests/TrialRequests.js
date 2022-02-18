import Button from '../../views/Components/Common/Buttons/Buttons';
import './TrialRequests.css'

const ClinicTrialRequests = () => {
    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>New Trial Request</h1>
                    </div>

                    <table className='patient-list-table'>
                        <thead>
                            <tr>
                                <th align='center'>#</th>
                                <th>Patient Details</th>
                                <th>Trial for</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/profile-img1.jpg" alt="patient" />
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
                                        <img src="/images/profile-img2.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Olivia Doe</h2>
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
                                        <img src="/images/profile-img3.jpg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>Mike Hoover</h2>
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
                                        <img src="/images/profile-img4.jpg" alt="patient" />
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
                                        <img src="/images/avatar2.svg" alt="patient" />
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
                                        <img src="/images/profile-img1.jpg" alt="patient" />
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
                                        <img src="/images/profile-img3.jpg" alt="patient" />
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
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ClinicTrialRequests;
