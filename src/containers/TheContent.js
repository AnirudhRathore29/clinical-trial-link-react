import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
// routes config
import routes from '../Routes/routes';
import { LogoLoader } from '../views/Components/Common/LogoLoader/LogoLoader';

const loading = (
	<div className='fullPageLoader OnRouteCallLoader'>
		<LogoLoader />
	</div>
);

function TheContent({ auth }) {
	// const appRoutes = useMemo(() => routes.filter(r => r.meta.role === auth.user.role));
	return (
		<main className="main-content">
			<Suspense fallback={loading}>
				<Switch>
					{routes.map((route, idx) => {
						return (
							route.component && (
								<Route
									key={idx}
									path={route.path}
									exact={route.exact}
									name={route.name}
									render={(props) => <route.component {...props} />}
								/>
							)
						);
					})}
				</Switch>
			</Suspense>
		</main>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(TheContent);
// export default React.memo(TheContent);
