import React from 'react';
import TheContent from './TheContent';
import FrontFooter from '../views/Components/FrontFooter/FrontFooter';
import FrontHeader from '../views/Components/FrontHeader/FrontHeader';

export default function TheLayout () {
	return (
		<>
			<FrontHeader />
			<TheContent />
			<FrontFooter />
		</>
	);
};

