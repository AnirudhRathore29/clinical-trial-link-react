import CommonButton from '../Common/Buttons/Buttons';
import './Plans.css';

const PlansMonthly = (props) => {
    return(
        <>
            <div className="row">
                <div className="col-lg-4">
                    <div className="plan-detail-bx main-plan-bx light-bg-orange">
                        <h2>Bronze</h2>
                        <h3><sub>Ksh</sub> <strong>{props.BronzePrice}</strong> <span>/ {props.PlanDuration}</span> </h3>
                        <h4>Per subject Per User</h4>
                        <ul>
                            <li>Unlimited Access</li>
                            <li>Dashboard Access</li>
                            <li>Manage Subscription</li>
                            <li>Support</li>
                            <li>Integration documentation</li>
                            <li>Multiple channel integration</li>
                            <li>24/7 High Availability</li>
                        </ul>
                        <div className="text-center">
                            <CommonButton isLink="true" URL="/content-plans/bronze-plans" BtnColor="white" BtnText="Subscribe"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="plan-detail-bx main-plan-bx light-bg-purple highlighted-plan">
                        <h2>Silver</h2>
                        <h3><sub>Ksh</sub> <strong>{props.SilverPrice}</strong> <span>/ {props.PlanDuration}</span></h3>
                        <h4>Per subject per Grade / Class Per User</h4>
                        <ul>
                            <li>Unlimited Access</li>
                            <li>Dashboard Access</li>
                            <li>Minimum 6 subjects</li>
                            <li>Manage Subscription</li>
                            <li>Integration documentation</li>
                            <li>Multiple channel integration</li>
                            <li>24/7 High Availability</li>
                        </ul>
                        <div className="text-center">
                            <CommonButton isLink="true" URL="/content-plans/silver-plans" BtnColor="white" BtnText="Subscribe"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="plan-detail-bx main-plan-bx light-bg-green">
                        <h2>Gold</h2>
                        <h3><sub>Ksh</sub> <strong>{props.GoldPrice}</strong> <span>/ {props.PlanDuration}</span></h3>
                        <h4>Per subject per Grade / Class Per User</h4>
                        <ul>
                            <li>Unlimited Access</li>
                            <li>Dashboard Access</li>
                            <li>Access to all subjects (Minimum 52 subjects)</li>
                            <li>Manage Subscription</li>
                            <li>Support</li>
                            <li>Integration documentation</li>
                            <li>Multiple channel integration</li>
                            <li>24/7 High Availability</li>
                        </ul>
                        <div className="text-center">
                            <CommonButton isLink="true" URL="/content-plans/gold-plans" BtnColor="white" BtnText="Subscribe"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlansMonthly;