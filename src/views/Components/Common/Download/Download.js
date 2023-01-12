import { useEffect, useState } from "react";
import { authHeader } from "../../../../redux/actions/authHeader";
import getCurrentHost from "../../../../redux/constants";

export const Download = ({ apiParameters, apiUrl }) => {
    const [documentUrl, setDocumentUrl] = useState()

    console.log("documentUrl", documentUrl);
    console.log("apiParameters", apiParameters);

    useEffect(() => {
        const config = {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify(apiParameters)
        }
        setDocumentUrl()
        fetch(getCurrentHost() + apiUrl, config)
            .then((response) => response.json())
            .then((response) => {
                console.log("responseresponse", response);
                setDocumentUrl(response.data)
            })
    }, [apiUrl, apiParameters])

    return (
        <a href={documentUrl} className="btn btn-sm btn-green" download>Download</a>
    );
}