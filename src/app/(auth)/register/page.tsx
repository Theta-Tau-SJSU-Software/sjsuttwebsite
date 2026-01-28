import RegisterForm from './register-form';
import { registerAction } from './actions';

export default function RegisterPage() {
  return <RegisterForm action={registerAction} />;
}