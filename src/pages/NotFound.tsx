import { useLocation } from "react-router-dom";

function NotFound() {

    const location = useLocation();

    return (
        <div className="flex flex-col justify-center items-center gap-2 mt-4 mb-4">
            <h1 className="text-3xl text-blue">Oops...</h1>
            <h2 className="text-2xl">{location.pathname} Not Found</h2>
            <a className="rounded-lg p-2 bg-orange hover:bg-darkOrange text-white" href="/">Return Home</a>
        </div>
    )
}
export default NotFound;