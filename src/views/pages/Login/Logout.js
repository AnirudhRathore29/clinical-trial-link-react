import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LogoutAction } from  "./../../../redux/actions/authAction";

function Logout(props) {
	const { auth, history, LogoutAction } = props;
	useEffect(() => {
		if (auth.isAuthenticated) {
			LogoutAction();
		} else {
			history.push('/login');
		}
	}, [auth, history, LogoutAction]);

	return <></>;
}

Logout.propTypes = {
	LogoutAction: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { LogoutAction })(Logout);
