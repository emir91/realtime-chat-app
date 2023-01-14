import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.component";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
        </Routes>
    );
}
 
export default MainRouter;