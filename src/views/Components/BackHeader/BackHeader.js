import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown } from 'react-bootstrap';
import SearchBx from '../SearchBx/SearchBx'
import { connect, useDispatch } from "react-redux";
import 'boxicons';
import "./BackHeader.css";
import { LogoutAction } from "../../../redux/actions/authAction";
import getCurrentHost, { getImageUrl } from "../../../redux/constants";
import { authHeader } from "../../../redux/actions/authHeader";
import moment from "moment";

var jwt = require('jsonwebtoken');
toast.configure();
const Header = (props, { colorHeader, headerColor }) => {
    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)
    const dispatch = useDispatch();
    const [sideMenu, setSideMenu] = useState(false);
    const [AllNotification, setAllNotification] = useState([])

    const dropdown = useRef(null)

    console.log("notification", AllNotification);
    console.log("dropdown", dropdown);

    const ToggleSidemenu = () => {
        setSideMenu(!sideMenu);
    }

    const handlogout = () => {
        dispatch(LogoutAction())
    }

    useEffect(() => {
        const configure = {
            method: 'GET',
            headers: authHeader()
        }
        fetch(getCurrentHost() + "/get-user-notifications", configure)
            .then(response => response.json())
            .then(response => {
                setAllNotification(response.data)
                // const getDropdownHeight = dropdown.current.clientHeight
                // console.log("getDropdownHeight", dropdown.current.offsetHeight);
            })
    }, [])

    return (
        <>
            <header className={`dashboard-header ${colorHeader} ${headerColor}`}>
                <div className="hamburger" onClick={ToggleSidemenu}><img src={sideMenu ? "/images/close.svg" : "/images/hamburger.svg"} alt="icon" /></div>
                <div className="dashboard-logo">
                    <Link to="/" className="d-block">
                        <img src="/images/logo.svg" alt="Logo" />
                    </Link>
                </div>
                <nav className="dashboard-rightNav">
                    <ul>
                        <li>
                            <SearchBx
                                placeholder={
                                    props.auth.user.role === 2 ? "Search for Trial" : props.auth.user.role === 3 ? "Search for Sponsor" : props.auth.user.role === 4 ? "Search for Trial" : props.auth.user.role === 5 ? "Search for Clinics" : null
                                }
                            />
                        </li>
                        <li className="notification-li">
                            <Dropdown>
                                <Dropdown.Toggle className="notification-dropdown" variant="" id="notification-dropdown">
                                    <img src="/images/notification.svg" alt="notification" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div ref={dropdown}>
                                        {
                                            AllNotification.map((value, index) => {
                                                return (
                                                    <Link to="/" className="dropdown-item" key={index}>
                                                        <span><box-icon name='bell' type='solid' color='#333333' ></box-icon></span>
                                                        <div>
                                                            <p>{value.description}</p>
                                                            <small>{moment(value.updated_at).format("MMMM DD, YYYY")}</small>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="user-info-li">
                            <Dropdown>
                                <Dropdown.Toggle className="user-info" variant="" id="user-dropdown">
                                    <div className="user-image">
                                        <img
                                            src={profileDetails.profile_image ?
                                                profileDetails.profile_image
                                                : '/images/avatar2.svg'}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="user-id-info">
                                        <h2>Hi, <span><img src="/images/hand-up.svg" alt="hand-icon" /></span> {profileDetails.full_name} </h2>
                                        <p title={props.auth.user.email}><span>{props.auth.user !== undefined && props.auth.user.email?.split('.')[0]}</span><span>{props.auth.user !== undefined && props.auth.user.email?.split('.')[1]}</span></p>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Link to={`${props.auth.user.role === 2 ? "/patient" : props.auth.user.role === 3 ? "/trial-clinic" : props.auth.user.role === 4 ? "/physician" : props.auth.user.role === 5 ? "/trial-sponsors" : null}/edit-profile`} className="dropdown-item"><box-icon name='edit-alt'></box-icon> Edit Profile</Link>
                                    <Link to={`${props.auth.user.role === 2 ? "/patient" : props.auth.user.role === 3 ? "/trial-clinic" : props.auth.user.role === 4 ? "/physician" : props.auth.user.role === 5 ? "/trial-sponsors" : null}/my-chats`} className="dropdown-item"><box-icon name='message-rounded-dots' ></box-icon> My Chats</Link>
                                    {props.auth.user.role === 2 ?
                                        <Link to="/patient/my-favorites" className="dropdown-item"><box-icon name='happy-heart-eyes'></box-icon> My favorite Trials</Link>
                                        :
                                        null
                                    }
                                    <button type="button" className="dropdown-item" onClick={handlogout}><box-icon name='log-out-circle' ></box-icon> Logout</button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className={sideMenu ? "side-menu active" : "side-menu"}>
                <ul>
                    <li><Link to={`${props.auth.user.role === 2 ? "/patient" : props.auth.user.role === 3 ? "/trial-clinic" : props.auth.user.role === 4 ? "/physician" : props.auth.user.role === 5 ? "/trial-sponsors" : null}/dashboard`} className="active"><box-icon type='solid' name='dashboard' color='#ffffff'></box-icon> Dashboard</Link></li>
                    {props.auth.user.role === 2 ?
                        <>
                            <li><Link to="/patient/my-appointments"><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> My Appointments</Link></li>
                            <li><Link to="/patient/payment-history"><box-icon name='history' color='#ffffff'></box-icon> Payment History</Link></li>
                        </>
                        :
                        null
                    }

                    {props.auth.user.role === 3 &&
                        <>
                            <li><Link to="/trial-clinic/manage-patient"><box-icon name='user' color='#ffffff'></box-icon> Manage Patient</Link></li>
                            <li><Link to="/trial-clinic/trial-applications"><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> Trial Applications</Link></li>
                            <li><Link to="/trial-clinic/screen-trial-request"><box-icon type='solid' name='message-square-add' color='#ffffff'></box-icon> Screen Trial Request</Link></li>
                            <li><Link to="/trial-clinic/my-appointments"><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> My Appointments</Link></li>
                            <li><Link to="/trial-clinic/payment-history"><box-icon name='history' color='#ffffff'></box-icon> Payment History</Link></li>
                        </>
                    }

                    {props.auth.user.role === 4 &&
                        <li><Link to="/physician/manage-patient"><box-icon name='user' color='#ffffff'></box-icon> Manage Patient</Link></li>
                    }

                    {props.auth.user.role === 5 &&
                        <>
                            <li><Link to="/trial-sponsors/manage-patient"><box-icon name='user' color='#ffffff'></box-icon> Manage Patient</Link></li>
                            <li><Link to="/trial-sponsors/manage-clinics"><box-icon name='plus-medical' color='#ffffff'></box-icon> Manage Clinics</Link></li>
                            <li><Link to="/trial-sponsors/my-trials"><box-icon name='calendar' type='solid' color='#ffffff'></box-icon> My Trials</Link></li>
                            <li><Link to="/trial-sponsors/payment-history"><box-icon name='history' color='#ffffff'></box-icon> Payment History</Link></li>
                        </>
                    }
                </ul>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Header);
