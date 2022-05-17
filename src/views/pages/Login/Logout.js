import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { LogoutAction } from  "./../../../redux/actions/authAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function Logout(props) {
	const { auth, history } = props;
	const dispatch = useDispatch()
	useEffect(() => {
		if (auth.isAuthenticated) {
			dispatch(LogoutAction())
			// toast.error(error.message, { theme: "colored" })
		} else {
			history.push('/login');
		}
	}, [auth, history]);

	return <></>;
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Logout);
