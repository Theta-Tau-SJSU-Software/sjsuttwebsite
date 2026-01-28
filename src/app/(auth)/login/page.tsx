import LoginForm from './login-form';
import { loginAction } from './actions';

export default function LoginPage() {
  return <LoginForm action={loginAction} />;
}