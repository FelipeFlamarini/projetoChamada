import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";

import FaceDetection from "@/components/dialogfaceDetection";

import { Button } from "@/components/ui/button";
import { HeaderBack2 } from "@/components/headerBack2";
import undrawWaiting from "/undrawWaiting.svg";
import { FETCH_URL_WS } from "@/settings";

enum RollcallAction {
  reset_token = "reset_token",
  start = "start",
  stop = "stop",
}

interface IWaitingForRollcallStart {
  rollcallToken: string;
  isConnected: boolean;
  handleResetToken: () => void;
}

interface IStartingRollcall {
  rollcallToken: string;
  recognizeToken: string;
  isConnected: boolean;
}

function generateRandomString(length: number = 4): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function WaitingForRollcallStart({
  rollcallToken,
  isConnected,
  handleResetToken,
}: IWaitingForRollcallStart) {
  return (
    <div className="pt-2 px-4 flex flex-col justify-between h-dvh">
      <HeaderBack2 link="/" />
      <div className="flex flex-col items-center gap-2 p-2 sm:py-8 justify-center">
        <p className="text-text text-center mt-10">
          {isConnected ? (
            <span className="text-2xl">
              Token da chamada:{" "}
              <span className="font-bold">{rollcallToken}</span>
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg
                className="mr-3 h-5 w-5 animate-spin text-[#FF6947]"
                viewBox="0 0 24 24"
              >
                <LoaderCircle />
              </svg>
              Conectando...
            </span>
          )}
        </p>
        <p className="text-subText text-center">
          Aguarde enquanto o professor inicia a chamada.
        </p>
        <Button variant="go" onClick={handleResetToken}>
          Gerar novo token
        </Button>
      </div>
      <img src={undrawWaiting} alt="" className="w-40 h-w-40 mx-auto pb-4" />
    </div>
  );
}

function StartingRollcall(props: IStartingRollcall) {
  return (
    <div className="w-full h-dvh flex flex-col gap-12 px-2 pt-8 pb-2 sm:py-2 sm:gap-2">
      <div>
        <p className="text-text text-center">
          Token da chamada:{" "}
          <span className="font-bold">{props.rollcallToken}</span>
        </p>
        <p className="text-text text-center">
          Passe pelo reconhecimento facial para registrar sua presença na aula.
        </p>
        <p className="text-subText text-center">
          O registro da presença será automático.
        </p>
      </div>
      <FaceDetection recognizeToken={props.recognizeToken} />
    </div>
  );
}

function Disconnected() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-12 px-2 pt-8 pb-2 sm:py-2 sm:gap-2">
      <p className="text-text text-center mt-10">
        <span className="flex items-center justify-center">
          Conexão perdida
        </span>
      </p>
      <p className="text-subText text-center">
        Verifique sua conexão com a internet e tente novamente.
      </p>
      <Button
        variant="go"
        onClick={() => {
          window.location.reload();
        }}
      >
        Tentar novamente
      </Button>
    </div>
  );
}

export function Camera() {
  const [chamada, setChamada] = useState<boolean>(false);
  const [rollcallToken, setRollcallToken] = useState<string>(
    generateRandomString(4)
  );
  const [recognizeToken, setRecognizeToken] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isDisconnected, setIsDisconnected] = useState<boolean>(false);

  const navigate = useNavigate();

  function handleResetToken() {
    navigate(0);
  }

  useEffect(() => {
    // TODO: fix ip
    const ws = new WebSocket(`${FETCH_URL_WS}/api/rollcall/ws`);

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(rollcallToken);
    };

    ws.onmessage = (event) => {
      switch (JSON.parse(event.data).action) {
        case RollcallAction.reset_token:
          setRollcallToken(generateRandomString(4));
          ws.send(rollcallToken);
          break;
        case RollcallAction.start:
          setRecognizeToken(JSON.parse(event.data).recognize_token);
          setChamada(true);
          break;
        case RollcallAction.stop:
          setChamada(false);
          break;
        default:
          console.log("Invalid action");
          break;
      }
    };

    ws.onclose = () => {
      setIsDisconnected(true);
      setIsConnected(false);
    };

    ws.onerror = () => {
      setIsDisconnected(true);
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [rollcallToken]);

  if (chamada && recognizeToken) {
    return (
      <StartingRollcall
        recognizeToken={recognizeToken}
        rollcallToken={rollcallToken}
        isConnected={isConnected}
      />
    );
  } else if (isConnected && !chamada) {
    return (
      <WaitingForRollcallStart
        rollcallToken={rollcallToken}
        isConnected={isConnected}
        handleResetToken={handleResetToken}
      />
    );
  } else if (isDisconnected) {
    return <Disconnected />;
  }
}
