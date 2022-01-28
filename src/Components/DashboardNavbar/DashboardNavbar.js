import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogoutApiData } from '../../Redux/Action/AuthAction';
import CommonButton from '../Common/Buttons/Buttons';
import { toast } from "react-toastify";
import './DashboardNavbar.css';

const DashboardNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    toast.configure();
    const logout = () =>{
        dispatch(LogoutApiData());
        localStorage.removeItem("user-token");
        toast.success("Logout Successfully");
        navigate("/login");
    }
    return (
        <>
            <div className="dashboard-side-bar">
                <ul>
                    <li><NavLink to="/my-subscription"><img src="/images/calender.svg" className="icon" alt="My Subscriptions"/> My Subscriptions</NavLink></li>
                    <li><button onClick={logout}><img src="/images/logout.svg" className="icon" alt="My Subscriptions"/> Logout</button></li>
                </ul>
            </div>
        </>
    );
}

export default DashboardNavbar;