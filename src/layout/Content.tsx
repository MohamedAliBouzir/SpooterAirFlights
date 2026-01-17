import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import contents from "../routes/contentRoutes";
import LoadingScreen from "./LoadingScreen";
import NotFound from "@/pages/NotFound";

const Content = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Routes>
                {contents.map((page) => (
                    <Route key={page.path} {...page} />
                ))}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default Content;
