import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom"

const ScrollToTop = () =>{
    const pathname = useLocation();

    console.log("pathname", pathname);

    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;