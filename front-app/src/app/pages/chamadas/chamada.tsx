import { LogoCI } from "@/components/logo";
import { CardChamada } from "@/components/cardChamada";
import { useGetCurrentUserApiUsersMeGet } from "@/chamada";
import { useNavigate } from "react-router";

function Chamada() {
  const navigate = useNavigate();
  const useGetCurrentUser = useGetCurrentUserApiUsersMeGet();
  if (!useGetCurrentUser.data) {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center gap-2 h-dvh p-2 sm:py-8">
      <LogoCI />
      <CardChamada />
    </div>
  );
}

export { Chamada };
