import { useLocation } from "react-router-dom";

function NotFound() {

    const location = useLocation();

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl">Oops...</h1>
            <h2 className="text-2xl">{location.pathname} Not Found</h2>
            <a className="border" href="/">Return Home</a>
        </div>
    )
}
export default NotFound;