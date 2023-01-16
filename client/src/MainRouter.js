import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.component";
import Chat from "./pages/chat/chat.component";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/chat" element={<Chat />}/>
        </Routes>
    );
}
 
export default MainRouter;