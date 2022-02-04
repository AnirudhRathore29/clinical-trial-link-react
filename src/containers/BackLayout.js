import React from 'react';
import TheContent from './TheContent';
import BackHeader from '../views/components/backHeader/BackHeader';
// import BackFooter from '../views/components/backFooter/BackFooter';

export default function TheLayout () {
	console.log('the layout')
	return (
		<>
			<BackHeader />
			<TheContent />
			{/* <BackFooter /> */}
		</>
	);
};

