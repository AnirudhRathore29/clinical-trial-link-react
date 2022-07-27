const MapIframe = ({ latitude, longitude }) => {
    return (
        <iframe src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&q=${latitude},${longitude}`} title="myFrame" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
    );
};

export default MapIframe;