import DashboardNavbar from '../../../Components/DashboardNavbar/DashboardNavbar';
import DashboardHeader from '../../../Components/DashboardHeader/DashboardHeader';
import { SelectBox } from '../../../Components/Common/Inputs/Inputs';
import '../../../Components/Common/ContactForm/ContactForm.css'
import '../Dashboard.css';
const MySubscription = () => {
    return (
        <>
            <DashboardHeader />
            <div className="mpc-dashboard">
                <DashboardNavbar />
                <div className="dashboard-right-content">
                    <h1 className="main-page-heading with-filter">
                        <span>My Subscriptions</span>
                        <div className="filter">
                            <SelectBox
                                name=""
                                className="form-control-sm"
                                optionData=
                                {
                                    <>
                                        <option value="">Status</option>
                                        <option value="">All</option>
                                        <option value="">Pending</option>
                                        <option value="">Active</option>
                                        <option value="">Completed</option>
                                        <option value="">Cencel</option>
                                        <option value="">Expired</option>
                                    </>
                                }
                            />

                            <SelectBox
                                name=""
                                className="form-control-sm"
                                optionData=
                                {
                                    <>
                                        <option value="">Page Size</option>
                                        <option value="">05</option>
                                        <option value="">10</option>
                                        <option value="">20</option>
                                        <option value="">50</option>
                                        <option value="">100</option>
                                    </>
                                }
                            />
                        </div>
                    </h1>
                    <div className="repeat-white-bx shadow-none">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Package/Period</th>
                                    <th scope="col">Created On</th>
                                    <th scope="col">Expiring</th>
                                    <th scope="col">Last Payment</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Subscription Type</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1256</th>
                                    <td><span className="badge rounded-pill bg-warning">Pending</span></td>
                                    <td>Monthly</td>
                                    <td>07/12/2021</td>
                                    <td>07/12/2022</td>
                                    <td>07/12/2021</td>
                                    <td>Null</td>
                                    <td>Silver</td>
                                    <td>
                                        <button className="btn-action btn-danger"><img src="/images/trash.svg" alt="trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1256</th>
                                    <td><span className="badge rounded-pill bg-success">Completed</span></td>
                                    <td>Monthly</td>
                                    <td>07/12/2021</td>
                                    <td>07/12/2022</td>
                                    <td>07/12/2021</td>
                                    <td>Null</td>
                                    <td>Silver</td>
                                    <td>
                                        <button className="btn-action btn-danger"><img src="/images/trash.svg" alt="trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1256</th>
                                    <td><span className="badge rounded-pill bg-primary">Active</span></td>
                                    <td>Monthly</td>
                                    <td>07/12/2021</td>
                                    <td>07/12/2022</td>
                                    <td>07/12/2021</td>
                                    <td>Null</td>
                                    <td>Silver</td>
                                    <td>
                                        <button className="btn-action btn-danger"><img src="/images/trash.svg" alt="trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1256</th>
                                    <td><span className="badge rounded-pill bg-danger">Cancel</span></td>
                                    <td>Monthly</td>
                                    <td>07/12/2021</td>
                                    <td>07/12/2022</td>
                                    <td>07/12/2021</td>
                                    <td>Null</td>
                                    <td>Silver</td>
                                    <td>
                                        <button className="btn-action btn-danger"><img src="/images/trash.svg" alt="trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1256</th>
                                    <td><span className="badge rounded-pill bg-warning">Pending</span></td>
                                    <td>Monthly</td>
                                    <td>07/12/2021</td>
                                    <td>07/12/2022</td>
                                    <td>07/12/2021</td>
                                    <td>Null</td>
                                    <td>Silver</td>
                                    <td>
                                        <button className="btn-action btn-danger"><img src="/images/trash.svg" alt="trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1256</th>
                                    <td><span className="badge rounded-pill bg-success">Completed</span></td>
                                    <td>Monthly</td>
                                    <td>07/12/2021</td>
                                    <td>07/12/2022</td>
                                    <td>07/12/2021</td>
                                    <td>Null</td>
                                    <td>Silver</td>
                                    <td>
                                        <button className="btn-action btn-danger"><img src="/images/trash.svg" alt="trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1256</th>
                                    <td><span className="badge rounded-pill bg-primary">Active</span></td>
                                    <td>Monthly</td>
                                    <td>07/12/2021</td>
                                    <td>07/12/2022</td>
                                    <td>07/12/2021</td>
                                    <td>Null</td>
                                    <td>Silver</td>
                                    <td>
                                        <button className="btn-action btn-danger"><img src="/images/trash.svg" alt="trash" /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">1256</th>
                                    <td><span className="badge rounded-pill bg-danger">Cancel</span></td>
                                    <td>Monthly</td>
                                    <td>07/12/2021</td>
                                    <td>07/12/2022</td>
                                    <td>07/12/2021</td>
                                    <td>Null</td>
                                    <td>Silver</td>
                                    <td>
                                        <button className="btn-action btn-danger"><img src="/images/trash.svg" alt="trash" /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MySubscription;