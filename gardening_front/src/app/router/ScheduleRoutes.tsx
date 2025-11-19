import {Route, Routes} from "react-router-dom";
import {lazy} from "react";

const SchedulePage = lazy(() => import("@/pages/schedule/SchedulePage"));

export default function ScheduleRoutes(){
    return (
        <Routes>
            <Route path="*" element={<SchedulePage/>}/>
        </Routes>
    );
}