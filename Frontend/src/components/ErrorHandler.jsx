import { TfiFaceSad } from "react-icons/tfi";

export default function ErrorHandler({code, msg}){

    return(
        <>
            <h2 className="error-message">Uh oh! <TfiFaceSad/></h2>
            {code && <h3>Error: {code}</h3>}
            <br/>
            <h3>{msg ? msg : "Cannot find the page you're looking for"}</h3>
        </>
    )
}