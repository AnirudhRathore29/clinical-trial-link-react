import { Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home/Home';
import Pricing from '../Pages/Pricing/Pricing';
import ContentPlans from '../Pages/ContentPlans/ContentPlans';
import ContactUs from '../Pages/ContactUs/ContactUs';
import GettingStarted from '../Pages/GettingStarted/GettingStarted';
import ApiDocumentation from '../Pages/ApiDocumentation/ApiDocumentation';
import ApiIntegrations from '../Pages/ApiIntegrations/ApiIntegrations';
import OrderDetails from '../Pages/OrderDetails/OrderDetails';
import PageNotFound from '../Pages/PageNotFound/404';

import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import Invoice from '../Pages/Invoice/Invoice';
import ThankYou from '../Pages/ThankYou/ThankYou';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import MySubscription from '../Pages/Dashboard/MySubscription/MySubscription';
import MyProfile from '../Pages/Dashboard/MyProfile/MyProfile';

import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';

const RoutesJS = () => {
    

    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/pricing" exact element={<Pricing />} />
            <Route path="/content-plans" exact element={<ContentPlans />} />
            <Route path="/content-plans/:id" exact element={<ContentPlans />} />
            <Route path="/contact-us" exact element={<ContactUs />} />
            <Route path="/getting-started" exact element={<GettingStarted />} />
            <Route path="/api-documentation" exact element={<ApiDocumentation />} />
            <Route path="/integrations" exact element={<ApiIntegrations />} />
            <Route path="/order-details" exact element={<OrderDetails />} />
            <Route path="/thank-you" exact element={<ThankYou />} />
            <Route path="/:pathName" element={<PageNotFound />} />
            <Route path="/sign-up" exact element={<SignUp />} />
            <Route path="/invoice" exact element={<Invoice />} />
            <Route path="/forgot-password" exact element={<ForgotPassword />} />
            <Route path="/login" exact element={<Login />} />

            <Route element={<PrivateRoute />}>
                <Route path="/my-subscription" exact element={<MySubscription />} />
                <Route path="/my-profile" exact element={<MyProfile />} />
            </Route>
        </Routes>
    );
}

export default RoutesJS;