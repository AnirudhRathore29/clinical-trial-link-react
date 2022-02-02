import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer';

const FrontLayout = ({children}) =>{
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default FrontLayout;