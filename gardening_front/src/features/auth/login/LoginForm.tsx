
import useLoginModel from './useLoginModel';
import LoginFormView from './LoginFormView';

export default function LoginForm() {
  const { id, setId, password, setPassword, loading, error, handleLogin, handleSocialLogin } = useLoginModel();

  return (
    <LoginFormView
      id={id}
      setId={setId}
      password={password}
      setPassword={setPassword}
      loading={loading}
      error={error}
      handleLogin={handleLogin}
      handleSocialLogin={handleSocialLogin}
    />
  );
}
