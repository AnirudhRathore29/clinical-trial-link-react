const server = {
	baseUrl: 'http://clinicaltriallink.org/api',
	prod: ''
};

const getCurrentHost = () => {
	if (process.env.REACT_APP_URL === 'prod') {
		return server.prod;
	} else {
		return server.baseUrl;
	}
};

export default getCurrentHost;
