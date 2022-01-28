import { Link } from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import './DashboardHeader.css';

const DashboardHeader = () => {
    return (
        <>
            <header className="mpc-header">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="navbar-brand dashboard-logo">
                            <Link to="/">
                                <img src="/images/logo.svg" alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="navbar-right">
                            <Link to="#" className="notification"><i className="fal fa-bell" /> <span className="dot" /></Link>
                            <Link to="#"><i className="fal fa-cog" /></Link>
                            <div className="navbar-user">
                                <button className="user-btn" type="button"></button>
                                <Dropdown>
                                    <Link to="/my-profile" className="user-btn">
                                        <img src="/images/avatar2.svg" className="img-fluid" alt="" /> <div><strong> Mike Hoover </strong> <span>Monthly Premium User</span></div>
                                    </Link>

                                    {/* <Dropdown.Menu>
                                        <NavLink className="dropdown-item" to="/my-profile">My Profile</NavLink>
                                        <NavLink className="dropdown-item" to="/change-password">Change Password</NavLink>
                                    </Dropdown.Menu> */}
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default DashboardHeader;