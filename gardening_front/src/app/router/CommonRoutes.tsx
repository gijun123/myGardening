import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import WriteBoard from "@/pages/board/WriteBoard";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ScheduleRoutes = lazy(() => import("./ScheduleRoutes"));

export function CommonRoutes() {
    return (
        <main className="mx-auto h-full w-full max-w-3xl px-4 py-12">
            <Routes>
                <Route path="/schedule" element={<ScheduleRoutes/>}/>
                <Route path="/demo" element={<WriteBoard/>}/>
                <Route path="*" element={<HomePage/>}/>
            </Routes>
        </main>
    );
}