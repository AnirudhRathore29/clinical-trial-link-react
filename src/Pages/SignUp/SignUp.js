import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import SectionTitle from "../../Components/Common/SectionTitle/SectionTitle";
import { signupApiData } from "../../Redux/Action/AuthAction";
import { InputText } from "../../Components/Common/Inputs/Inputs";
import CommonButton from "../../Components/Common/Buttons/Buttons";
import "../Login/Login.css";

const SignUp = () => {
  const dispatch = useDispatch();

  const [Formdata, setFormdata] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    website_url: "",
    mob_no: "",
    company_name: "",
    physical_address: "",
    postal_address: "",
    company_email_address: "",
    company_mob_no: "",
    t_c: "",
  });

  const SignUPSubmit = (e) => {
    e.preventDefault();
    dispatch(signupApiData({ Formdata }));
  };

  /* Password show hide */
  const [Password, SetPassword] = useState(false);
  const [confirmPassword, SetConfirmPassword] = useState(false);

  const ShowPassword = () => {
    SetPassword(!Password);
  };
  const ShowConfirmPassword = () => {
    SetConfirmPassword(!confirmPassword);
  };
  /* Password show hide */
  return (
    <>
      <section className="hero-section authentication-banner">
        <div className="banner-bg">
          <img src="/images/banner-top-vector.svg" alt="banner-vectors" />
        </div>
        <div className="banner-btm-bg">
          <img src="/images/banner-btm-vector.svg" alt="banner-vectors" />
        </div>

        <div className="container-fluid">
          <SectionTitle
            CustomClass="text-center pad-b-30"
            title="Sign Up"
            ShapeImage="heading-clip-1.svg"
            SubHeading={
              <p className="what-sec-text">Register for create an account</p>
            }
          />
          <div className="authentication-bx sign-up-authentication">
            <form onSubmit={SignUPSubmit}>
              <div className="row">
                <div className="form-group col-lg-12 mb-2">
                  <h2>Contact details</h2>
                </div>
                <div className="col-lg-6">
                  <InputText
                    type="text"
                    name="name"
                    value={Formdata.name}
                    placeholder="Full Name"
                    required="required"
                    onChange={(e) => {
                      setFormdata({ ...Formdata, name: e.target.value });
                    }}
                    FormGroupClass="required"
                  />
                </div>
                <div className="col-lg-6">
                  <InputText
                    type="email"
                    name="email"
                    value={Formdata.email}
                    placeholder="Email Address"
                    required="required"
                    onChange={(e) => {
                      setFormdata({ ...Formdata, email: e.target.value });
                    }}
                    FormGroupClass="required"
                  />
                </div>
                <div className="col-lg-6">
                  <InputText
                    type="number"
                    name="mob_no"
                    value={Formdata.mob_no}
                    placeholder="Mobile No."
                    required="required"
                    onChange={(e) => {
                      setFormdata({ ...Formdata, mob_no: e.target.value });
                    }}
                    FormGroupClass="required"
                  />
                </div>

                <div className="form-group col-lg-12 mb-2 mt-4">
                  <h2>Company Information</h2>
                </div>
                <div className="col-lg-6">
                  <InputText
                    type="text"
                    name="company_name"
                    value={Formdata.company_name}
                    placeholder="Registered Company name"
                    required="required"
                    onChange={(e) => {
                      setFormdata({ ...Formdata, company_name: e.target.value });
                    }}
                    FormGroupClass="required"
                  />
                </div>
                <div className="col-lg-6">
                  <InputText
                    type="text"
                    name="physical_address"
                    value={Formdata.physical_address}
                    placeholder="Physical Location"
                    required="required"
                    onChange={(e) => {
                      setFormdata({
                        ...Formdata,
                        physical_address: e.target.value,
                      });
                    }}
                    FormGroupClass="required"
                  />
                </div>
                <div className="col-lg-6">
                  <InputText
                    type="text"
                    name="postal_address"
                    value={Formdata.postal_address}
                    placeholder="Postal Address"
                    required="required"
                    onChange={(e) => {
                      setFormdata({
                        ...Formdata,
                        postal_address: e.target.value,
                      });
                    }}
                    FormGroupClass="required"
                  />
                </div>
                <div className="col-lg-6">
                  <InputText
                    type="text"
                    name="company_email_address"
                    value={Formdata.company_email_address}
                    placeholder="Company Email Address"
                    required="required"
                    onChange={(e) => {
                      setFormdata({
                        ...Formdata,
                        company_email_address: e.target.value,
                      });
                    }}
                    FormGroupClass="required"
                  />
                </div>
                <div className="col-lg-6">
                  <InputText
                    type="url"
                    name="website_url"
                    value={Formdata.website_url}
                    placeholder="Company Website"
                    onChange={(e) => {
                      setFormdata({ ...Formdata, website_url: e.target.value });
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <InputText
                    type="number"
                    name="company_mob_no"
                    value={Formdata.company_mob_no}
                    placeholder="Company Telephone Contacts"
                    required="required"
                    onChange={(e) => {
                      setFormdata({
                        ...Formdata,
                        company_mob_no: e.target.value,
                      });
                    }}
                    FormGroupClass="required"
                  />
                </div>
                <div className="form-group col-lg-6">
                  <InputText
                    type={Password ? "text" : "password"}
                    name="password"
                    value={Formdata.password}
                    placeholder="Password"
                    required="required"
                    onChange={(e) => {
                      setFormdata({ ...Formdata, password: e.target.value });
                    }}
                    FormGroupClass="required hasicon"
                    isPassword="true"
                    onClick={ShowPassword}
                    ChangeClass={Password ? "show-hide active" : "show-hide"}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <InputText
                    type={confirmPassword ? "text" : "password"}
                    name="confirm_password"
                    value={Formdata.confirm_password}
                    placeholder="Confirm Password"
                    required="required"
                    onChange={(e) => {
                      setFormdata({
                        ...Formdata,
                        confirm_password: e.target.value,
                      });
                    }}
                    FormGroupClass="required hasicon"
                    isPassword="true"
                    onClick={ShowConfirmPassword}
                    ChangeClass={
                      confirmPassword ? "show-hide active" : "show-hide"
                    }
                  />
                </div>
              </div>
              <div className="forgot-link">
                <div className="form-checkbox">
                  <div className="custom-check-block">
                    <input
                      type="checkbox"
                      name="t_c"
                      defaultChecked={""}
                      onChange={(e) => {
                        setFormdata({
                          ...Formdata,
                          t_c: e.target.value,
                        });
                      }}
                      className="d-none"
                      id="remember"
                      defaultValue="Remember me"
                      required
                    />
                    <label htmlFor="remember" className="custom-check-label">
                      <span className="text-danger">*</span> I agree to the{" "}
                      <Link to="/">Terms &amp; Conditions</Link> of MsingiPack
                      Cloud.{" "}
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group text-center">
                <CommonButton
                  isButton="true"
                  BtnType="submit"
                  BtnColor="green w-50"
                  BtnText="Sign Up"
                />
              </div>
              <p className="create-account">
                Already have any account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
