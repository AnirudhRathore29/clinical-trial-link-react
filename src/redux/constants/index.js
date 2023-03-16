export const server = {
	// baseUrl: 'http://192.168.2.80:8000/api',
	baseUrl: 'http://admin.clinicaltriallink.org/api',
	prod: 'http://admin.clinicaltriallink.org/api',
};

const getCurrentHost = () => {
	if (process.env.REACT_APP_URL === 'prod') {
		return server.prod;
	} else {
		return server.baseUrl;
	}
};

export default getCurrentHost;