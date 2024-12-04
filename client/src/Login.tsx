import { LoginForm } from "./components/login-form";
import { LogoCI } from "./components/logo";


function Login() {
  return (
  <div className="flex flex-col  items-center gap-2 h-dvh p-2 sm:py-8">
      <LogoCI />
      <LoginForm  />
    </div>
  );
}

export  {Login};
