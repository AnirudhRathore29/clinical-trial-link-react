import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Assets/css/responsive.css';
// import Header from './Components/Header/Header';
// import Footer from './Components/Footer/Footer';
// import RoutesJS from './Config/RoutesJS';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import { Outlet } from "react-router-dom";

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login'
import PageNotFound from './Pages/PageNotFound/404';

import ThankYou from './Pages/ThankYou/ThankYou';

// Layouts
import AuthLayout from './Layout/AuthLayout';
import FrontLayout from './Layout/FrontLayout'
import { Component } from 'react';

const AppRoute = ({ element: Element, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout><Component {...props}></Component></Layout>
  )}></Route>
)

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <AppRoute path="/" layout={FrontLayout} element={Home} />
        </Routes>
        {/* <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/thank-you" exact element={<ThankYou />} />
            <Route path="/:pathName" element={<PageNotFound />} />
            <Route path="/login" exact element={<Login />} />

            <Route element={<PrivateRoute />}>
                <Route path="/my-subscription" exact element={<MySubscription />} />
                <Route path="/my-profile" exact element={<MyProfile />} />
            </Route>
          </Routes> */}
      </Router>
    </>
  );
}

export default App;