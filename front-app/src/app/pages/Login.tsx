import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { LoginForm } from "../../components/login-form";
import { LogoCI } from "../../components/logo";
import { useOauthGoogleJwtAuthorizeApiAuthGoogleAuthorizeGet } from "@/chamada";

function Login() {
  const OauthGoogleAuthorize =
    useOauthGoogleJwtAuthorizeApiAuthGoogleAuthorizeGet();
  return (
    <div className="flex flex-col items-center gap-2 h-dvh p-2 sm:py-8">
      <LogoCI />
      <div className="flex flex-col items-center justify-center h-dvh">
        {OauthGoogleAuthorize.isLoading ? (
          <svg
            className="mr-3 h-5 w-5 animate-spin text-[#FF6947]"
            viewBox="0 0 24 24"
          >
            <LoaderCircle />
          </svg>
        ) : OauthGoogleAuthorize.data ? (
          <>
            <a href={OauthGoogleAuthorize.data.authorization_url}>
              <Button variant={"go"}>Login com Google</Button>
            </a>
          </>
        ) : (
          <>
            <p>Erro ao buscar endereço de login do Google</p>
          </>
        )}
      </div>
    </div>
  );
}

export { Login };
