import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NotificationRedirection } from "./NotificationRedirection";
import { configure } from "@testing-library/react";

var jwt = require('jsonwebtoken');
toast.configure();
const Header = (props, { colorHeader, headerColor }) => {
    const [sideMenu, setSideMenu] = useState(false);
    const [AllNotification, setAllNotification] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1)
    const [UnreadNotification, SetUnreadNotification] = useState()

    const dispatch = useDispatch();
    const history = useHistory()
    const dropdown = useRef(null)
    var profileDetails = jwt.verify(localStorage.getItem("auth_security"), process.env.REACT_APP_JWT_SECRET)

    console.log("notification", AllNotification);
    console.log("dropdown", dropdown);
    console.log("currentPage", currentPage);
    console.log("profileDetails", profileDetails);

    const ToggleSidemenu = () => {
        setSideMenu(!sideMenu);
    }

    const handlogout = () => {
        dispatch(LogoutAction())
    }

    const getNotifications = (page) => {
        const configure = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({
                page: page
            })
        }
        fetch(getCurrentHost() + "/get-user-notifications", configure)
            .then(response => response.json())
            .then(response => {
                console.log("response", response.data);
                setAllNotification(response.data)
            })
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <button
            ref={ref}
            className="notification-dropdown dropdown-toggle btn"
            onClick={(e) => { getNotifications(currentPage); onClick(e) }}
        >
            {children}
        </button>
    ));

    const onScroll = () => {
        if (dropdown.current) {
            const { scrollTop, scrollHeight, clientHeight } = dropdown.current;
            if ((scrollTop + clientHeight === scrollHeight) && (AllNotification !== undefined && AllNotification.total !== AllNotification.data.length)) {
                setCurrentPage(currentPage + 1)
                getNotifications(currentPage + 1)
            }
        }
    };

    useEffect(() => {
        const configure = {
            method: "GET",
            headers: authHeader()
        }
        fetch(getCurrentHost() + "/get-unread-notifications", configure)
            .then((response) => response.json())
            .then((response) => {
                console.log("response", response);
                SetUnreadNotification(response.data.unreadNotificationsCount)
            })
    }, [getCurrentHost])

    const HandleNotificationRedirection = (notificationType, extra_info) => {
        const extraData = extra_info && JSON.parse(extra_info)
        console.log("extra_info", extra_info);

        if (notificationType === "TRIAL_APPLICATION_UPDATE") {
            history.push('/patient/my-appointments')
        } else if (notificationType === "TRIAL_APPLICATION_APPROVED_BY_TRIAL_CLINIC" || notificationType === "TRIAL_APPLICATION_REJECTED_BY_TRIAL_CLINIC") {
            history.push({
                pathname: '/patient/my-appointments',
                state: extraData.tab_type
            })
        } else if (notificationType === "TRIAL_START_RECRUITING" || notificationType === "TRIAL_STOP_RECRUITING" || notificationType === "TRIAL_COMPLETED") {
            history.push(`/patient/trial-listing/${extraData.trialclinic_user_id}`) // this one i need to check
        } else if (notificationType === "PATIENT_TRIAL_APPLICATION") {
            history.push('/trial-clinic/trial-requests')
        } else if (notificationType === "APPOINTMENT_CANCELLATION_BY_PATIENT") {
            history.push('/trial-clinic/manage-patient')
        } else if (notificationType === "TRIAL_CREATION" || notificationType === "TRIAL_CANCELLATION" || notificationType === "TRIAL_RESTART") {
            history.push(`/trial-clinic/sponsors-trial-listing/${extraData.sponsor_user_id}`)
        } else if (notificationType === "TRIAL_APPLICATION_APPROVED_BY_SPONSOR" || notificationType === "TRIAL_APPLICATION_REJECTED_BY_SPONSOR") {
            history.push({
                pathname: '/trial-clinic/trial-applications',
                state: extraData.tab_type
            })
        } else if (notificationType === "TRIAL_APPROVAL_BY_ADMIN" || notificationType === "TRIAL_REJECTION_BY_ADMIN") {
            history.push('/trial-sponsors/trials')
        } else if (notificationType === "TRIAL_CLINIC_TRIAL_APPLICATION") {
            history.push('/trial-sponsors/trial-requests')
        }
    }

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
                                <Dropdown.Toggle className="notification-dropdown" as={CustomToggle} variant="" id="notification-dropdown">
                                    <span className={UnreadNotification > 0 && "unReadNotification"}>
                                        <box-icon type='solid' name='bell' color="#ffffff" size="30px"></box-icon>
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div ref={dropdown} onScroll={() => onScroll()}>
                                        {
                                            AllNotification !== undefined ?
                                                AllNotification.data.length > 0 ?
                                                    AllNotification.data.map((value, index) => {
                                                        return (
                                                            <button onClick={() => HandleNotificationRedirection(value.notification_type, value.extra_info)} className={value.is_read === 1 ? "dropdown-item" : "dropdown-item notRead"} key={index}>
                                                                <span><box-icon name='bell' type='solid' color='#333333' ></box-icon></span>
                                                                <div>
                                                                    <p>{value.description}</p>
                                                                    <small>{moment(value.updated_at).format("MMMM DD, YYYY")}</small>
                                                                </div>
                                                            </button>
                                                        )
                                                    })
                                                    :
                                                    <div className='no-notification-found'>
                                                        <img src="/images/no-data-found.svg" alt="no-data-found" />
                                                        <h2>No Notification Found!</h2>
                                                    </div>
                                                :
                                                [1, 2, 3, 4, 5].map((value, index) => {
                                                    return (
                                                        <div className="SkeletonDropdown" key={index}>
                                                            <Skeleton height={65} />
                                                        </div>
                                                    )
                                                })
                                        }
                                        {
                                            AllNotification !== undefined &&
                                                AllNotification.total !== AllNotification.data.length ?
                                                <div className="SkeletonDropdown">
                                                    <box-icon name='loader-alt' animation="spin" color="#4096ee"></box-icon>
                                                </div>
                                                :
                                                null
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
