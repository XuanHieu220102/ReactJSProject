import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();
    console.error(error);
    return (
        <div id="error-page">
            <h1>Oop !</h1>
            <p>Sorry, an unexceoped error has occurred</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}