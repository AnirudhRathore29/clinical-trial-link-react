export const server = {
	// prod: 'http://192.168.2.80:8000/api',
	baseUrl: 'http://admin.clinicaltriallink.org/api',
	prod: 'http://admin.clinicaltriallink.org/api',
	imageUrl: "http://admin.clinicaltriallink.org",
	frontBaseUrl: "http://clinicaltriallink.org/"
};

const getCurrentHost = () => {
	if (process.env.REACT_APP_URL === 'prod') {
		return server.prod;
	} else {
		return server.baseUrl;
	}
};

export function getImageUrl(){
	return server.imageUrl;
}

export default getCurrentHost;
