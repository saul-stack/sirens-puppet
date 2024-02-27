import { TfiFaceSad } from "react-icons/tfi";

export default function ErrorHandler({code, msg}){


    return(
        <>
            <h1>Uh oh! <TfiFaceSad/></h1>
            <h2>Error: {code}</h2>
            <br/>
            <h2>{msg ? msg : "Cannot find the page you're looking for"}</h2>
        </>
    )
}