import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/entities/auth/useAuthStore";
import type {JSX} from "react";


interface ProtectedRouteProps {
    children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const accessToken = useAuthStore(state => state.accessToken); // 예: Zustand로 토큰 관리

    if (!accessToken) {
        // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
        return <Navigate to="/auth/login" replace />;
    }

    return children; // 로그인 되어 있으면 자식 컴포넌트 렌더
}
