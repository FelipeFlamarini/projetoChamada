import { LoginForm } from "./components/login-form";
import { LogoCI } from "./components/logo";


function Login() {
  return (
  <div className="flex flex-col justify-center items-center gap-2 h-dvh p-2 sm:p-0">
      <LogoCI />
      <LoginForm  />
    </div>
  );
}

export  {Login};
