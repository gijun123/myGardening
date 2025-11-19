import { useEffect, useState } from 'react';

interface Props {
  accessToken?: string | null;
}

function decodeJwt(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (e) {
   console.log(e);
  }
}

function getRemainingTime(exp: number) {
  const now = Math.floor(Date.now() / 1000);
  return Math.max(exp - now, 0);
}

export default function TokenTimer({ accessToken }: Props) {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (!accessToken) return;

    const payload = decodeJwt(accessToken);
    const exp = payload?.exp;
    if (!exp) return;

    setRemainingTime(getRemainingTime(exp));

    const timer = setInterval(() => {
      setRemainingTime(getRemainingTime(exp));
    }, 1000);

    return () => clearInterval(timer);
  }, [accessToken]);

  return (
    <div className=" p-4 rounded-lg border ">
      <p className="font-semibold ">Access Token 남은 시간</p>

      <p className="text-sm text-gray-600">
        {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초
      </p>
    </div>
  );
}
