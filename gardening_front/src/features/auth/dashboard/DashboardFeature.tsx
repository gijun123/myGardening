
import useDashboardModel from './useDashboardModel';
import DashboardView from './DashboardView';

export default function DashboardFeature() {
  const { accessToken, refreshToken, handleLogout,userInfo } = useDashboardModel();

  return <DashboardView accessToken={accessToken} refreshToken={refreshToken} onLogout={handleLogout}  userInfo={userInfo}/>;
}
