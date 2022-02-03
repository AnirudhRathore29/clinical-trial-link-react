import React from 'react';
import { TheHeader, TheContent, TheFooter } from './index';

export default function TheLayout () {
	console.log('the layout')
	return (
		<>
			<TheHeader />
			<TheContent />
			<TheFooter />
		</>
	);
};

