import { useState, useEffect } from "react";

import FaceDetection from "@/components/faceDetection";

import { Button } from "@/components/ui/button";

enum RollcallAction {
  reset_token = "reset_token",
  start = "start",
  stop = "stop",
}

interface IWaitingForRollcallStart {
  rollcallToken: string;
  isConnected: boolean;
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
}: IWaitingForRollcallStart) {
  return (
    <div className="mx-auto flex flex-col items-center">
      <p className="text-text text-center">
        {isConnected ? (
          <>
            Token da chamada: <span className="font-bold">{rollcallToken}</span>
          </>
        ) : (
          "Conectando"
        )}
      </p>
      <p className="text-subText text-center">
        Aguarde enquanto o professor inicia a chamada.
      </p>
      <Button variant="go">Gerar novo token</Button>
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

export function Camera() {
  const [chamada, setChamada] = useState<boolean>(false);
  const [rollcallToken, setRollcallToken] = useState<string>(
    generateRandomString(4)
  );
  const [recognizeToken, setRecognizeToken] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket(`ws://192.168.0.100:2010/api/rollcall/ws`);

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(rollcallToken);
    };

    ws.onmessage = (event) => {
      console.log(JSON.parse(event.data).action);
      switch (JSON.parse(event.data).action) {
        case RollcallAction.reset_token:
          setRollcallToken(generateRandomString(4));
          ws.send(rollcallToken);
          break;
        case RollcallAction.start:
          console.log(event.data);
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
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      setIsConnected(false);
      console.error("WebSocket error:", error);
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
  } else {
    return (
      <WaitingForRollcallStart
        rollcallToken={rollcallToken}
        isConnected={isConnected}
      />
    );
  }
}
