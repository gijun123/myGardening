import {Header} from "@/widgets/header/Header.tsx";
import {BrowserRouter} from "react-router-dom";
import {CommonRoutes} from '@/app/router/index.js';
import {useEffect} from "react";
import {getStoredTokens} from "@/entities/auth/api.ts";
import {type AuthState, useAuthStore} from "@/entities/auth/useAuthStore.tsx";

function App() {
    //기본 로그인
    const setTokens = useAuthStore((s:AuthState) => s.setTokens);

    useEffect(() => {
        const { access, refresh } = getStoredTokens();
        if (access && refresh) {
            setTokens(access, refresh);
        }
    }, [setTokens]);

    return (
        <BrowserRouter>
            <Header/>
            <CommonRoutes/>
        </BrowserRouter>
    )
}

export default App
