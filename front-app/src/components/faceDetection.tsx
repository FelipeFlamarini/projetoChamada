import { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import { ClipLoader } from "react-spinners";
import { Button } from "./ui/button";
import { verifiedToast } from "./toasts/verifiedToast";
import { notVerifiedToast } from "./toasts/notVerifiedToast";
import { sendingToast } from "./toasts/sendingToast";
import { confirmationToast } from "./toasts/confirmationToast";
import { Link } from "react-router";
import {
  useRecognizeApiFacialRecognitionRecognizePost,
  useCreateAttendanceApiAttendancesPost,
} from "@/chamada";

const FaceDetection = () => {
  const recognizeMutation = useRecognizeApiFacialRecognitionRecognizePost();
  const confirmationMutation = useCreateAttendanceApiAttendancesPost();

  const videoRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [render, setRender] = useState(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadModels = async () => {
    try {
      const MODEL_URL = "/models"; // Verifique o caminho correto
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      console.log("Modelos carregados com sucesso.");
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

      console.log("Detecting face...");
      // console.log(video);
      const detections = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 224,
          scoreThreshold: 0.5,
        })
      );
      // console.log(detections);
      if (detections) {
        // console.log(detections);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        if (videoRef.current) {
          const imageSrc = videoRef.current.getScreenshot();
          if (imageSrc) {
            try {
              sendingToast();
              const data = await recognizeMutation.mutateAsync({
                data: {
                  image_base64: imageSrc,
                },
              });
              console.log(data);
              if (data.verified) {
                confirmationToast({
                  students: data.students,
                  confirmationMutation: (token) => {
                    confirmationMutation.mutate(
                      {
                        data: { jwt: token },
                      },
                      {
                        onSuccess: async (data) => {
                          verifiedToast(data.times.pop().split(".")[0]);
                        },
                      }
                    );
                  },
                });
                await sleep(5000);
              }
              if (!data.verified) {
                notVerifiedToast();
                await sleep(2200);
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
  }, [recognizeMutation, confirmationMutation]);

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
        console.log("Vídeo carregado com sucesso.");
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
      <div className={`flex items-start ${render ? "" : "hidden"}`}>
        <Webcam
          ref={videoRef}
          muted
          className={`rounded-3xl h-full w-full`}
          // style={{ transform: "scaleX(-1)" }} // Espelhar o vídeo
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
