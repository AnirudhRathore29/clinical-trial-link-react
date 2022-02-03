import { BrowserRouter as Router, Route } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Assets/css/responsive.css';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import SetNewPassword from './Pages/SetNewPassword/SetNewPassword';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';
import PatientCompleteProfile from './Patient/CompleteProfile/CompleteProfile';
// import PageNotFound from './Pages/PageNotFound/404';

// import ThankYou from './Pages/ThankYou/ThankYou';
// import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

// Layouts
import AuthLayout from './Layout/AuthLayout';
import FrontLayout from './Layout/FrontLayout'

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout><Component {...props}></Component></Layout>
    )}></Route>
)

function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <AppRoute path="/" exact layout={FrontLayout} component={Home} />
                <AppRoute path="/login" exact layout={AuthLayout} component={Login} />
                <AppRoute path="/sign-up" exact layout={AuthLayout} component={SignUp} />
                <AppRoute path="/forgot-password" exact layout={AuthLayout} component={ForgotPassword} />
                <AppRoute path="/new-password" exact layout={AuthLayout} component={SetNewPassword} />
                <AppRoute path="/verify-email" exact layout={AuthLayout} component={VerifyEmail} />

                {/* Patient panel routes */}
                <AppRoute path="/patient/complete-profile" exact layout={AuthLayout} component={PatientCompleteProfile} />
            </Router>
        </>
    );
}

export default App;