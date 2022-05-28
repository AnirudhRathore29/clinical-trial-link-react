import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ accessRole, component: Component, auth, ...rest }) => {
	// && auth.user.role === accessRole 
	console.log("auth.user.role === accessRole ", auth.user.role , accessRole )
	return (
		<Route
			{...rest}
			render={(props) => (auth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	);
};

// export default PrivateRoute
// PrivateRoute.propTypes = {
// 	auth: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
