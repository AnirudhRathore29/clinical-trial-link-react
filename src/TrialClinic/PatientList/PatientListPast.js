import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../views/Components/Common/Buttons/Buttons.css'
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css';
import '../../Patient/MyAppointments/MyAppointments.css';

const ClinicPatientListPast = () => {
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: null
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Patient',
            colorByPoint: true,
            data: [{
                name: 'No. of Patient Applied',
                y: 2000,
                color: "#CDEB8B"
            }, {
                name: 'No. of Patient Attended',
                y: 1000,
                color: "#4096EE"
            }]
        }]
    }

    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Past Patient List <span>Bipolar Depression Study with 6 Month Open Label Therapy</span></h1>
                    </div>

                    <div className='row'>
                        <div className='col-lg-3'>
                            <div className='patientChartInfo'>
                                <h2>Patient information</h2>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={options}
                                />
                                <div className='chart-legends'>
                                    <span>No. of Patient Applied</span>
                                    <span>No. of Patient Attended</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-9'>
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
                                                <img src="/images/profile-img1.jpg" alt="patient" />
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
                                                <img src="/images/profile-img2.jpg" alt="patient" />
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
                                                <img src="/images/profile-img3.jpg" alt="patient" />
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
                                                <img src="/images/profile-img4.jpg" alt="patient" />
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
                                                <img src="/images/profile-img3.jpg" alt="patient" />
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
                </div>
            </div>
        </>
    );
};

export default ClinicPatientListPast;
