import './BackFooter.css';

const Footer = () => {
    const date = new Date()
    return (
        <>
            <footer className='clinicaltrial-dashboard-ftr'>
                <div className='container'>
                    <div className='copyright'><p>Copyright © {date?.getFullYear()} <strong>Clinical Trial Link</strong>. All rights reserved.</p></div>
                </div>
            </footer>
        </>
    );
}


export default Footer;