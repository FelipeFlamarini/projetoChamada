import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
// import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";
import { Button } from "./ui/button";
// import { useElementSize } from "../hooks/useElementSize";
// import { useElementSize } from "../../hooks/useElementSize";
import { useElementSize } from "../hooks/useElementSize";
import { verifyToast } from "./toasts/verifiesToast";
import { notVerifyToast } from "./toasts/notVerifiedToast";

const FaceDetection = () => {
  const videoRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [render, setRender] = useState(false);
  // const [boxRef, { width, height }] = useElementSize();
  const URL_BASE = "http://localhost:8000";
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // const videoWidth = videoRef.current?.video.videoWidth;
  // const videoHeight = videoRef.current?.video.videoHeight;

  // const videoDimensions = () =>{
  //   console.log("aaaaaaaaaaaa")
  //   console.log(videoRef.current?.video.videoWidth,videoRef.current?.video.videoHeight)
  //   // console.log(videoWidth,videoHeight)
  // }

  console.log(render);
  // Carregar os modelos necessários
  const loadModels = async () => {
    const MODEL_URL = "/models"; // Certifique-se de que os modelos estão nesta pasta pública
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  };

  // useEffect(()=>{
  //   console.log(width)
  // },[width])

  // Iniciar a detecção facial
  const handleVideoPlay = async () => {
    await loadModels();

    setRender(true);
    console.log("Video playing...");
    const video = videoRef.current?.video;
    const canvas = canvasRef.current;

    // console.log(video.videoWidth,video.videoHeight)

    if (!canvas || !video) return;

    // Configurar o canvas para sobrepor o vídeo
    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };
    if (displaySize.width === 0 || displaySize.height === 0) {
      console.error("Invalid video dimensions:", displaySize);
      return;
    }

    faceapi.matchDimensions(canvas, displaySize, true);

    while(true)  {
      console.log("Detecting face...");
      // setSize({ width: video.videoWidth, height: video.videoHeight });
      const detections = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 224,
          scoreThreshold: 0.6,
        })
      );
      console.log(detections);
      if (detections) {
        // console.log(detections);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        // console.log("Detected face:", resizedDetections);
        if (videoRef.current) {
          const imageSrc = videoRef.current.getScreenshot();
          if (imageSrc) {
            // console.log(imageSrc);
            try {
              const response = await fetch(
                `${URL_BASE}/api/facial_recognition/verify`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ img1_path: imageSrc }),
                }
              );

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              // if (response.ok) {
              //   await new Promise((resolve) => setTimeout(resolve, 1400));
              // }
              const data = await response.json();
              console.log(data);
              if (data.verified) {
                verifyToast({ nome: data.student.name });
                await sleep(2200);
              }
              console.log("esperei 3 segundos");
              if (!data.verified) {
                console.log(data.error);
                notVerifyToast();
                await sleep(500);
              }
              // console.log(data);
            } catch (e) {
              console.log(e);
            }
          }
        }

        const context = canvas.getContext("2d");
        if (context && canvas.width != 0 && canvas.height != 0) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
        }
      }

      await sleep(650);
    } ;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`flex items-start ${render ? "" : "hidden"}`}>
        {/* <div className="border-2 border-red-500" ref={boxRef}> */}
          <Webcam
            ref={videoRef}
            // autoPlay
            muted
            className={`rounded-3xl h-full w-full`}
            // style={{ transform: "scaleX(-1)" }} // Espelhar o vídeo
            screenshotFormat="image/jpeg"
            onUserMedia={handleVideoPlay}

          />
        {/* </div> */}
        <canvas
          ref={canvasRef}
          className={`absolute w-80 h-80 sm:w-auto sm:h-auto`}
          // style={{ transform: "scaleX(-1)" }} // Espelhar o canvas para corresponder ao vídeo
        />
      </div>
      <ClipLoader color="#ff5833" loading={!render} size={50} />
    </div>
  );
};

export default FaceDetection;
