import Button from '../../views/Components/Common/Buttons/Buttons';
import { InputText, SelectBox } from '../../views/Components/Common/Inputs/Inputs';
import RadioBtn from '../../views/Components/Common/RadioBtn/RadioBtn';
import PatientListBx from '../../views/Components/PatientListBx/PatientListBx';
import '../../Patient/Dashboard/Dashboard.css';
import '../TrialRequests/TrialRequests.css'
import '../../Patient/ClinicListing/ClinicListing.css';

const ClinicManagePatient = () => {
    return (
        <>
            <div className="clinical-dashboard">
                <div className="container">
                    <div className="heading-bx">
                        <h1>Manage Patient</h1>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className="filter-sidebar">
                                <h2>Filter</h2>
                                <div className='form-group'>
                                    <label>Age Range</label>
                                    <div className='age-range'>
                                        <div className='age-range-bix'>
                                            <span>Min</span>
                                            <InputText type="number" placeholder="Min Age" min="18" />
                                        </div>
                                        <div className='p-3'>-</div>
                                        <div className='age-range-bix'>
                                            <span>Max</span>
                                            <InputText type="number" placeholder="Max Age" max="60" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Gender</label>
                                    <div className="gender-row mt-4">
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Male" defaultChecked="true" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Female" />
                                        <RadioBtn className="radio-btn" type="radio" name="gender" labelText="Nonbinary" />
                                    </div>
                                </div>
                                <SelectBox
                                    name="trial_name"
                                    labelText="Trial Name"
                                    optionData={
                                        <>
                                            <option>Select Trial Name</option>
                                            <option>Trial Name 1</option>
                                            <option>Trial Name 2</option>
                                        </>
                                    }
                                />
                                <SelectBox
                                    name="trial_name"
                                    labelText="Trial Status"
                                    optionData={
                                        <>
                                            <option>Select Trial Name</option>
                                            <option>Trial Name 1</option>
                                            <option>Trial Name 2</option>
                                        </>
                                    }
                                />
                                <Button
                                    isButton="true"
                                    BtnType="submit"
                                    BtnColor="green w-100"
                                    BtnText="Apply"
                                />
                            </div>
                        </div>
                        <div className='col-lg-8'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <PatientListBx 
                                        imgUrl="profile-img1.jpg"
                                        patientName="David Smith"
                                        statusClass="primary"
                                        status="Approved"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx 
                                        imgUrl="profile-img2.jpg"
                                        patientName="David Smith"
                                        statusClass="success"
                                        status="Completed"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <PatientListBx 
                                        imgUrl="profile-img3.jpg"
                                        patientName="David Smith"
                                        statusClass="danger"
                                        status="Cancelled"
                                        description="Adolescents with ADHD and a Parent with Bipolar Disorder"
                                    />
                                </div>
                            </div>

                            <div className='mt-5 text-center'>
                                <Button
                                    isButton="true"
                                    BtnColor="primary"
                                    BtnText="Load More"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClinicManagePatient;
