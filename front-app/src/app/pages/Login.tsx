import { Button } from "@/components/ui/button";
import { LoginForm } from "../../components/login-form";
import { LogoCI } from "../../components/logo";
import { useOauthGoogleJwtAuthorizeApiAuthGoogleAuthorizeGet } from "@/chamada";

function Login() {
  const a = useOauthGoogleJwtAuthorizeApiAuthGoogleAuthorizeGet();
  return (
    <div className="flex flex-col  items-center gap-2 h-dvh p-2 sm:py-8">
      <LogoCI />
      {!a.isLoading && (
        <a href={a.data?.authorization_url} target="_blank">
          <Button>google</Button>
        </a>
      )}
    </div>
  );
}

export { Login };
