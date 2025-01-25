import { LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

import { LogoCI } from "../../components/logo";
import { useOauthGoogleJwtAuthorizeApiAuthGoogleAuthorizeGet } from "@/chamada";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import undrawLogin from "/undrawLogin.svg";

function Login() {
  const navigate = useNavigate();
  const getCurrentUser = useGetCurrentUser();
  if (
    !getCurrentUser.error &&
    !getCurrentUser.isLoading &&
    getCurrentUser.data
  ) {
    navigate("/home");
  }

  const OauthGoogleAuthorize =
    useOauthGoogleJwtAuthorizeApiAuthGoogleAuthorizeGet();
  return (
    <div className="flex flex-col items-center gap-2 h-dvh p-2 sm:py-8">
      <LogoCI />
      <div className="flex flex-col items-center justify-center h-dvh space-y-2">
        <p className="text-text text-2xl pb-6">Seja bem-vindo!</p>
        <Link to={"/camera"} className="w-full">
          <Button className="w-full">Chamada</Button>
        </Link>
        {OauthGoogleAuthorize.isLoading ? (
          <svg
            className="mr-3 h-5 w-5 animate-spin text-[#FF6947]"
            viewBox="0 0 24 24"
          >
            <LoaderCircle />
          </svg>
        ) : OauthGoogleAuthorize.data ? (
          <>
            <Link
              to={OauthGoogleAuthorize.data.authorization_url}
              className="w-full"
            >
              <Button variant={"go"} className="w-full">
                Login com Google
              </Button>
            </Link>
          </>
        ) : (
          <>
            <p>Erro ao buscar endereço de login do Google</p>
          </>
        )}
      </div>
      <img src={undrawLogin} alt="" className="w-40 h-w-40" />
    </div>
  );
}

export { Login };
