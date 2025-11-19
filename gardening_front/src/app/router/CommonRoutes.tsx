import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import LoginPage from "@/pages/auth/LoginPage.tsx";
import RegisterPage from "@/pages/auth/RegisterPage.tsx";
import OAuthRedirectHandler from "@/pages/auth/handler/OAuthRedirectHandler.tsx";
import DashboardPage from "@/pages/auth/DashboardPage.tsx";
import InitialCompleteProfilePage from "@/pages/auth/InitialCompleteProfilePage.tsx";
import EditCompleteProfilePage from "@/pages/auth/EditCompleteProfilePage.tsx";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ScheduleRoutes = lazy(() => import("./ScheduleRoutes"));
const BoardRoutes = lazy(() => import("./BoardRoutes"));

export function CommonRoutes() {
    return (
            <Routes>
                <Route path="/schedule" element={<ScheduleRoutes/>}/>
                <Route path="/board" element={<BoardRoutes/>}/>
                <Route path="*" element={<HomePage/>}/>
                <Route path="/auth/dashboard" element={<DashboardPage/>} />
                <Route path="/auth/login" element={<LoginPage/>}/>
                <Route path="/auth/register" element={<RegisterPage/>}/>
                <Route path="/oauth/redirect" element={<OAuthRedirectHandler />} />
                <Route path="/oauth/initial-complete-profile" element={<InitialCompleteProfilePage />} />
                <Route path="/oauth/edit-complete-profile" element={<EditCompleteProfilePage />} />
            </Routes>
    );
}