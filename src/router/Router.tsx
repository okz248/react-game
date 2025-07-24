import { Navigate, Route, Routes } from "react-router-dom";
import { Title } from "../components/pages/Title";
import { Game } from "../components/pages/Game";
import { Setting } from "../components/pages/Setting";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/title" />} />
            <Route path="/title" element={<Title />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/game" element={<Game />} />
        </Routes>
    );
};