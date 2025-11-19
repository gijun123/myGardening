

const NAVER_LOGIN_BUTTON_IMAGE = '/public/assets/btnG_아이콘사각.png';

export default function NaverLogo() {
  return (
    <img
      src={NAVER_LOGIN_BUTTON_IMAGE}
      alt="네이버 로고"
      className="mr-3 h-5 w-5"
    />
  );
}
