import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/entities/auth/useAuthStore";
import LoginForm from "@/features/auth/login/LoginForm.tsx";

export default function LoginPage() {
    const accessToken = useAuthStore((s) => s.accessToken);

    // 이미 로그인된 상태면 dashboard로 이동
    if (accessToken) {
        return <Navigate to="/auth/dashboard" replace />;
    }

    return <LoginForm />;
}
