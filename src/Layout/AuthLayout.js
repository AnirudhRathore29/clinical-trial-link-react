import Header from '../Components/Header/Header'

const AuthLayout = ({children}) =>{
    return (
        <>
            <Header colorHeader="colorHeader" />
            {children}
        </>
    )
}

export default AuthLayout;