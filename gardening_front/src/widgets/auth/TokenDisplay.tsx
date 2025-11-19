
interface Props {
  accessToken?: string | null;
  refreshToken?: string | null;
}

export default function TokenDisplay({ accessToken, refreshToken }: Props) {
  return (
    <div className=" p-4 rounded-lg border overflow-hidden">
      <p className="font-semibold ">Access Token</p>
      <p className="text-sm break-all text-gray-600">{accessToken ? `${accessToken.substring(0, 40)}...` : '없음'}</p>

      <p className="font-semibold  mt-2">Refresh Token</p>
      <p className="text-sm break-all text-gray-600">{refreshToken ? `${refreshToken.substring(0, 40)}...` : '없음'}</p>
    </div>
  );
}
