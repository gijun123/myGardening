import {Route, Routes} from "react-router-dom";
import {lazy} from "react";
import {ProtectedRoute} from "@/app/router/ProtectedRoute.tsx";

const BoardPage = lazy(() => import("@/pages/board/BoardPage"));
const DetailBoard = lazy(() => import("@/pages/board/DetailBoard"));
const WriteBoard = lazy(() => import("@/pages/board/WriteBoard"));

export default function BoardRoutes(){
    return (
        <Routes>
            {/* 로그인 필요 없음 */}
            <Route path="/" element={<BoardPage/>}/>
            <Route path="/detail" element={<DetailBoard/>}/>

            {/* 로그인 필요 있음 */}
            <Route path="/write" element={<ProtectedRoute><WriteBoard/></ProtectedRoute>}/>
        </Routes>
    );
}