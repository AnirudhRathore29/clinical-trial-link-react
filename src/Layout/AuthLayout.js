import Header from '../Components/Header/Header'

const AuthLayout = (props) =>{
    return (
        <>
            <Header />
            {props.children}
        </>
    )
}

export default AuthLayout;