import '../../views/Components/Common/Buttons/Buttons.css'
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';

const ClinicPatientListPast = () => {
    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Patients List Past <span>Bipolar Depression Study with 6 Month Open Label Therapy</span></h1>
                    </div>

                    <table className='patient-list-table'>
                        <thead>
                            <tr>
                                <th align='center'>#</th>
                                <th>Patient Name</th>
                                <th>Status</th>
                                <th>Visit Number</th>
                                <th>Location</th>
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/avatar2.svg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-primary d-inline-block mb-3'>Not Attended</span>
                                </td>
                                <td><strong>25632156</strong></td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/avatar2.svg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-success d-inline-block mb-3'>Completed</span>
                                </td>
                                <td><strong>25632156</strong></td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/avatar2.svg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-danger d-inline-block mb-3'>Cancel</span>
                                </td>
                                <td><strong>25632156</strong></td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/avatar2.svg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-success d-inline-block mb-3'>Completed</span>
                                </td>
                                <td><strong>25632156</strong></td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/avatar2.svg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-danger d-inline-block mb-3'>Cancel</span>
                                </td>
                                <td><strong>25632156</strong></td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='patient-img'>
                                        <img src="/images/avatar2.svg" alt="patient" />
                                    </div>
                                </td>
                                <td>
                                    <h2>David Smith</h2>
                                </td>
                                <td>
                                    <span className='badge badge-danger d-inline-block mb-3'>Cancel</span>
                                </td>
                                <td><strong>25632156</strong></td>
                                <td>Morrisville, NC, United States</td>
                                <td className='no-wrap'>Jan 25, 2022, <br /> (09:00 AM to 11:00 AM)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ClinicPatientListPast;
