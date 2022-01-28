import { Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home/Home';
import PageNotFound from '../Pages/PageNotFound/404';

import ThankYou from '../Pages/ThankYou/ThankYou';

// import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';

const RoutesJS = () => {
    

    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            {/* <Route path="/contact-us" exact element={<ContactUs />} /> */}
            <Route path="/thank-you" exact element={<ThankYou />} />
            <Route path="/:pathName" element={<PageNotFound />} />
            {/* <Route path="/sign-up" exact element={<SignUp />} />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
            <Route path="/login" exact element={<Login />} /> */}

            {/* <Route element={<PrivateRoute />}>
                <Route path="/my-subscription" exact element={<MySubscription />} />
                <Route path="/my-profile" exact element={<MyProfile />} />
            </Route> */}
        </Routes>
    );
}

export default RoutesJS;