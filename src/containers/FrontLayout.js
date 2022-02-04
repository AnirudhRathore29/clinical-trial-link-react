import React from 'react';
import TheContent from './TheContent';
import FrontFooter from '../views/components/frontFooter/FrontFooter';
import FrontHeader from '../views/components/frontHeader/FrontHeader';

export default function TheLayout () {
	return (
		<>
			<FrontHeader />
			<TheContent />
			<FrontFooter />
		</>
	);
};

