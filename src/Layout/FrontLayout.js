import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer';

const FrontLayout = (props) =>{
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    )
}

export default FrontLayout;