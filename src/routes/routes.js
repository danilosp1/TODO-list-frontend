import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage"
import User from "../pages/UserPage"

const AppRoutes = () => {
    return (
        <>
            <Routes >
                <Route path="/" element={<User />} />
                <Route path="/todo" element={<Home />} />
            </Routes>
        </>
    );
};
export default AppRoutes;


