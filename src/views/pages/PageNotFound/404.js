import { useParams } from 'react-router-dom';
import Button from '../../Components/Common/Buttons/Buttons';
import './404.css';

const PageNotFound = () => {
    const prams = useParams();
    return(
        <>
            <section className="PageNotFound pad-t-80 pad-b-80">
                <div className="container">
                    <img src="/images/404.svg" alt="page not found" />
                    <h1>"{prams.pathName}" Page Not Found</h1>
                    <Button isLink="true" URL="/" BtnColor="green" BtnText="Back to home"/>
                </div>
            </section>
        </>
    );
}

export default PageNotFound;