import React, { useEffect } from 'react';
import TheContent from './TheContent';
import FrontFooter from '../views/Components/FrontFooter/FrontFooter';
import FrontHeader from '../views/Components/FrontHeader/FrontHeader';
import { useLocation } from 'react-router-dom';

export default function TheLayout (props) {
	const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
	return (
		<>
			<FrontHeader className={props.className} />
			<TheContent />
			<FrontFooter />
		</>
	);
};

