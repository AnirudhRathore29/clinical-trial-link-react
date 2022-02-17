import React from 'react';
import TheContent from './TheContent';
import BackHeader from '../views/Components/BackHeader/BackHeader';
// import BackFooter from '../views/Components/backFooter/BackFooter';

export default function TheLayout ({ headerColor }) {
	console.log('the layout')
	return (
		<>
			<BackHeader headerColor={headerColor} />
			<TheContent />
			{/* <BackFooter /> */}
		</>
	);
};

