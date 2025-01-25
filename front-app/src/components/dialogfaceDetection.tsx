import { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import { ClipLoader } from "react-spinners";
import { Button } from "./ui/button";
import { Link } from "react-router";
import {
  useRecognizeApiFacialRecognitionRecognizePost,
  useCreateAttendanceApiAttendancesPost,
} from "@/chamada";
import { SendingDialog } from "@/components/dialogs/sending";
import { ConfirmationDialog } from "@/components/dialogs/confirmation";
import { ConfirmedDialog } from "@/components/dialogs/recognized";
import { NotRecognizedDialog } from "@/components/dialogs/notRecognized";

import { DeepFaceStudentReturn } from "@/model";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IFaceDetection {
  recognizeToken: string;
}

const FaceDetection = ({ recognizeToken }: IFaceDetection) => {
  const recognizeMutation = useRecognizeApiFacialRecognitionRecognizePost();
  const confirmationMutation = useCreateAttendanceApiAttendancesPost();

  const videoRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [render, setRender] = useState(false);

  const [childCallback, setChildCallback] = useState<(() => void) | null>(null);

  const [stage, setStage] = useState<
    "idle" | "sending" | "confirmation" | "confirmed" | "notRecognized"
  >("idle");
  const [dialogOpen, setDialogOpen] = useState(false);
  const fadeOut: boolean = false;
  const [dataStudent, setDataStudent] = useState<DeepFaceStudentReturn[]>([]);
  const handleAction = async () => {
    await new Promise((resolve) => {
      setChildCallback(() => resolve);
    });
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadModels = async () => {
    try {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    } catch (error) {
      console.error("Erro ao carregar os modelos:", error);
    }
  };

  const handleVideoPlay = useCallback(async () => {
    await loadModels();

    const video = videoRef.current?.video;
    if (!video) {
      console.error("Vídeo não está disponível.");
      return;
    }

    setRender(true);

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas não está disponível.");
      return;
    }

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };
    if (displaySize.width === 0 || displaySize.height === 0) {
      console.error("Invalid video dimensions:", displaySize);
      handleVideoPlay();
      return;
    }

    faceapi.matchDimensions(canvas, displaySize, true);

    while (true) {
      const context = canvas.getContext("2d");
      context?.clearRect(0, 0, canvas.width, canvas.height);

      const detections = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 224,
          scoreThreshold: 0.5,
        })
      );
      if (detections) {
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        if (videoRef.current) {
          const imageSrc = videoRef.current.getScreenshot();
          if (imageSrc) {
            try {
              setDialogOpen(true);
              setStage("sending");
              const data = await recognizeMutation.mutateAsync({
                data: {
                  image_base64: imageSrc,
                  recognize_token: recognizeToken,
                },
              });
              if (data.verified && data.students) {
                setDataStudent(data.students);
                setStage("confirmation");
                await handleAction();
                await sleep(3000);
                setDialogOpen(false);
                setStage("idle");
              } else {
                setStage("notRecognized");
                await sleep(3000);
                setDialogOpen(false);
                setStage("idle");
                if (childCallback) {
                  childCallback();
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
        if (canvas) {
          if (context && canvas.width != 0 && canvas.height != 0) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
          }
        }
      }

      await sleep(650);
    }
  }, [recognizeMutation, childCallback, recognizeToken]);

  const stopWebcam = () => {
    const stream = videoRef.current?.video?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setRender(false);
  };

  useEffect(() => {
    const video = videoRef.current?.video;

    if (video) {
      video.addEventListener("loadeddata", () => {
        handleVideoPlay();
      });
    }

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleVideoPlay);
      }
    };
  }, [handleVideoPlay]);

  return (
    <div
      className={`flex flex-col  items-center h-screen ${
        render ? "justify-center" : "justify-between"
      }`}
    >
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Chamada Inteligente</DialogTitle>
          </DialogHeader>

          {stage === "sending" && <SendingDialog fadeOut={fadeOut} />}
          {stage === "confirmation" && dataStudent && (
            <ConfirmationDialog
              fadeOut={fadeOut}
              students={dataStudent}
              handleConfirm={(student: DeepFaceStudentReturn) => {
                confirmationMutation.mutate({ data: { jwt: student.token } });
                setStage("confirmed");
                if (childCallback) {
                  childCallback();
                }
              }}
              handleExit={() => {
                setStage("idle");
                setDialogOpen(false);
                if (childCallback) {
                  childCallback();
                }
              }}
            />
          )}
          {stage === "confirmed" && (
            <ConfirmedDialog
              fadeOut={fadeOut}
              handleReset={() => {
                setStage("idle");
                setDialogOpen(false);
                if (childCallback) {
                  childCallback();
                }
              }}
            />
          )}
          {stage === "notRecognized" && (
            <NotRecognizedDialog
              fadeOut={fadeOut}
              handleReset={() => {
                setStage("idle");
                setDialogOpen(false);
                if (childCallback) {
                  childCallback();
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className={`flex items-start ${render ? "" : "hidden"}`}>
        <Webcam
          ref={videoRef}
          muted
          className={`rounded-3xl h-full w-full`}
          screenshotFormat="image/jpeg"
        />
        <canvas
          ref={canvasRef}
          className={`absolute w-80 h-[28rem] sm:w-auto sm:h-auto`}
        />
      </div>
      <ClipLoader color="#ff5833" loading={!render} size={50} />
      <Button variant={"go"} className="rounded-full mt-4 w-52 sm:w-64" asChild>
        <Link to="/" onClick={stopWebcam}>
          Sair
        </Link>
      </Button>
    </div>
  );
};

export default FaceDetection;
