import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/shared/shadcn/components/ui/card';
import { Label } from '@/shared/shadcn/components/ui/label';
import { Input } from '@/shared/shadcn/components/ui/input';
import { Button } from '@/shared/shadcn/components/ui/button';
import {Eye, EyeOff, Loader2} from 'lucide-react';
import SocialLoginButtons from './SocialLoginButtons';

import {
    registerLink
} from "@/entities/header/index.js";

interface Props {
  id: string;
  setId: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  loading: boolean;
  error: string;
  handleLogin: (e?: React.FormEvent) => Promise<void> | void;
  handleSocialLogin: (platform: 'kakao' | 'google' | 'naver') => void;
}

export default function LoginFormView({ id, setId, password, setPassword, loading, error, handleLogin, handleSocialLogin }: Props) {
    const [showPw, setShowPw] = React.useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-sm shadow-xl rounded-lg border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">로그인</CardTitle>
          <CardDescription>🌼 마이가드닝에 오신 여러분을 진심으로 환영합니다!🌼</CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="id">아이디</Label>
              <Input id="id" type="text" placeholder="아이디 입력" value={id} onChange={(e) => setId(e.target.value)} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
              <Input id="password"
                     type={showPw ? 'text' : 'password'}
                     placeholder="비밀번호 입력"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required />
                <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 border border-red-200 rounded-md">{error}</p>
            )}
          </CardContent>

          <CardFooter className="pt-4 flex flex-col space-y-3">
            <Button type="submit" disabled={loading} className="w-full ">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </Button>

            <Link to={ registerLink} className="w-full">
              <Button type="button" className="w-full ">
                회원가입
              </Button>
            </Link>

            <SocialLoginButtons onSocialLogin={handleSocialLogin} loading={loading} />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
