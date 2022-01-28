import { Link } from "react-router-dom";
import Banner from "../../Components/Common/Banner/Banner";
import './ApiIntegrations.css';

const ApiIntegrations = () => {
    return (
        <>
            <Banner BannerHeading="Api Integrations" BannerSubHeading={<p>loream ipsum Getting your keys.</p>} />
            <section className="what-section pad-t-80 pad-b-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 side-bar-col">
                            <div className="side-bar-outer">
                                <ul className="side-bar">
                                    <li><Link to="/#" className="active">Introduction</Link></li>
                                    <li className="hasSubmenu">
                                        <Link to="/#">Getting Started</Link>
                                        <ul>
                                            <li><Link to="/#">Getting your keys</Link></li>
                                            <li><Link to="/#">Obtaining Token</Link></li>
                                            <li><Link to="/#">Making your First Request</Link></li>
                                            <li><Link to="/#">https Status Code</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="/#">Integrations</Link></li>
                                    <li><Link to="/#">Free Test Account</Link></li>
                                    <li><Link to="/#">FAQs</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="DocumentationContent">
                                <h2 className="br-none mt-0 pt-0">Introduction</h2>
                                <p>Entity Sports application programming interfaces (API) give you access to our sports data. You can use our Entity Sports API to build web and mobile sports application. Either it's fantasy sports or live score our data full fills
                                    requirements for all type of applications.
                                </p>
                                <p>Entity Sports API deliver season, competition, teams, matches, player, statistical data for Cricket and Soccer.Since the API is true to RESTful principles, it’s easy to interact with using any tool capable of performing https requests,
                                    such as Postman or cURL.
                                </p>
                                <p>To allow you to interact securely with our API from a client-side web application (though you should remember that you should never expose your API keys in any public website's client-side code). JSON will be returned in all responses
                                    from the API, including errors.
                                </p>
                                <h2>Getting Started</h2>
                                <h3>Getting your Keys</h3>
                                <p>You will need an active access key and secret key with a valid subsciption to start using our API. Please visit entitysport.com to request your keys and subscription.</p>
                                <div className="highlight-outer">
                                    <pre className="highlight prettyprint">{"    "}{"{"}{"\n"}{"        "}"status": "ok",{"\n"}{"        "}"response": {"{"}{"\n"}{"            "}"token": "1|X#aFhlzAsd",{"\n"}{"            "}"expires": "12312312312",{"\n"}{"        "}{"}"},{"\n"}{"        "}"api_version": "2.0"{"\n"}{"    "}{"}"}{"\n"}</pre>
                                    <button className="copy-code"><img src="/images/copy-two.svg" alt="icon" /></button>
                                </div>
                                <h3>Obtaining Token</h3>
                                <p>To access any API, you need a token. A token can be generated using your keys. Token is a piece of information that would allow you to access our API data for a short period of time (expire time). Auth API provides you the token,
                                    by validating your keys. Request to our Auth API whenever the access token is expired or unavailable.
                                </p>
                                <h4>Request</h4>
                                <ul>
                                    <li>Path: /v2/auth/</li>
                                    <li>Method: Post</li>
                                    <li>
                                        POST Parameters
                                        <ul>
                                            <li>access_key - Access Key of your Application.</li>
                                            <li>secret_key - Secret key of your Application.</li>
                                            <li>extend - Token will expiry on subscription end date.</li>
                                        </ul>
                                    </li>
                                </ul>
                                <blockquote>
                                    <h4 className="mt-0">Tip</h4>
                                    <p className="m-0">You can place a “container” <code className="gatsby-code-text">&lt;div&gt;</code> like this <strong>anywhere</strong> inside the <code className="gatsby-code-text">&lt;body&gt;</code> tag. You may have as many independent DOM containers
                                        on one page as you need. They are usually empty — React will replace any existing content inside DOM containers.
                                    </p>
                                </blockquote>
                                <h4>Response</h4>
                                <ul>
                                    <li><code style={{color: '#c7254e'}}>status:</code> Response status. if api request was sucessful, you will get a status ok, or error. If a error is returned, check the response</li>
                                    <li><code style={{color: '#c7254e'}}>response.token:</code> access token.</li>
                                    <li><code style={{color: '#c7254e'}}>response.expires:</code> access token expire timestamp.</li>
                                </ul>
                                <h2>Making your First Request</h2>
                                <p>It's very easy to start using the EntitySport Cricket API. By passing your <strong>token</strong> as <code>token</code> to our api server, you can get access to our API data instantly.</p>
                                <h3>https Request</h3>
                                <p><code>GET https://rest.entitysport.com/v2/?token=[ACCESS_TOKEN]</code></p>
                                <h2>https Status Code</h2>
                                <p>All API request will resolve with any of the following https header status.</p>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Response Code</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>200</td>
                                            <td>API request valid, informations ready to access</td>
                                        </tr>
                                        <tr>
                                            <td>304</td>
                                            <td>API request valid, but data was not modified since last accessed (compared using Etag)</td>
                                        </tr>
                                        <tr>
                                            <td>400</td>
                                            <td>Client side error. occurs for invalid request</td>
                                        </tr>
                                        <tr>
                                            <td>401</td>
                                            <td>occurs for unauthorized request</td>
                                        </tr>
                                        <tr>
                                            <td>501</td>
                                            <td>Server side error. Internal server error, unable to process your request</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="highlight-outer">
                                    <pre className="highlight prettyprint">{"    "}{"{"}{"\n"}{"        "}"status": "ok",{"\n"}{"        "}"response": {"{"}{"\n"}{"            "}"teams": [{"\n"}{"                "}{"{"}{"\n"}{"                    "}"tid": 9,{"\n"}{"                    "}"title": "Scotland",{"\n"}{"                    "}"abbr": "SCOT",{"\n"}{"                    "}"thumb_url": "../assets/uploads/2016/01/scotland-120x80.png",{"\n"}{"                    "}"logo_url": "../assets/uploads/2016/01/scotland-32x32.png",{"\n"}{"                    "}"type": "country",{"\n"}{"                    "}"country": "sct",{"\n"}{"                    "}"alt_name": "Scotland"{"\n"}{"                "}{"}"},{"\n"}{"                "}{"{"}{"\n"}{"                    "}"tid": 1544,{"\n"}{"                    "}"title": "Hong Kong",{"\n"}{"                    "}"abbr": "HKG",{"\n"}{"                    "}"thumb_url": "",{"\n"}{"                    "}"logo_url": "../assets/uploads/2016/02/hong-kong-32x32.png",{"\n"}{"                    "}"type": "country",{"\n"}{"                    "}"country": "hk",{"\n"}{"                    "}"alt_name": "Hong Kong"{"\n"}{"                "}{"}"}{"\n"}{"            "}],{"\n"}{"            "}"total_teams": 2{"\n"}{"        "}{"}"},{"\n"}{"        "}"etag": "6520d4b995db86e711a7d299cfaf94c4",{"\n"}{"        "}"modified": "2017-08-29 01:40:48",{"\n"}{"        "}"datetime": "2017-08-29 01:40:48",{"\n"}{"        "}"api_version": "2.0"{"\n"}{"    "}{"}"}{"\n"}</pre>
                                    <button className="copy-code"><img src="/images/copy-two.svg" alt="icon" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ApiIntegrations;