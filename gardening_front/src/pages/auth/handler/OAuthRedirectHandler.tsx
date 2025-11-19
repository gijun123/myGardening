import { useEffect } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';

export default function OAuthRedirectHandler() {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const uid = params.get("uid");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    if (uid) {
      navigate(`/oauth/complete-profile?uid=${uid}`);
    } else {
      navigate("/auth/dashboard");
    }
  }, [location.search, navigate]); // location.search만 감지



  return <div>로그인 처리 중...</div>;
}
