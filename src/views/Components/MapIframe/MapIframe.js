const MapIframe = ({ latitude, longitude }) => {
    return (
        <iframe src={`https://maps.google.com/maps?q=${Number(latitude)},${Number(longitude)}&hl=es&z=14&amp;output=embed`} title="myFrame" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
    );
};

export default MapIframe;