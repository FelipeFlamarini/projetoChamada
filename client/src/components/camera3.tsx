import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const FaceDetection = () => {
  const videoRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState<boolean>(false);


  // Carregar os modelos necessários
  const loadModels = async () => {
    const MODEL_URL = "/models"; // Certifique-se de que os modelos estão nesta pasta pública
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  };

  // Iniciar a detecção facial
  const handleVideoPlay = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current?.video;

    if (!canvas || !video) return;

    // Configurar o canvas para sobrepor o vídeo
    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());
      console.log("Detected face:", detections);
      if (detections) {
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        console.log("Detected face:", resizedDetections);
        if (videoRef.current) {
          const imageSrc = videoRef.current.getScreenshot();
          if (imageSrc) {
            setImageBase64(imageSrc);
          }
        }
        if (imageBase64 && !faceDetected) {
          // para ser a API
          console.log("Base64 image:", imageBase64);
        }

        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
        }
      }
    }, 100);
  };

  useEffect(() => {
    loadModels().then(() => {
      const video = videoRef.current?.video;
      if (video) {
        video.addEventListener("play", handleVideoPlay);
      }
    });

    const handleResize = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current?.video;

      if (canvas && video) {
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Ajustar o tamanho do canvas na montagem

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex justify-center relative">
      <Webcam
        ref={videoRef}
        autoPlay
        muted
        className="border border-btnGo rounded-3xl"
        style={{ transform: "scaleX(-1)" }} // Espelhar o vídeo
        screenshotFormat="image/jpeg"
      />
      {/* <canvas
        ref={canvasRef}
        className="absolute"
        style={{ transform: "scaleX(-1)" }} // Espelhar o canvas para corresponder ao vídeo
      /> */}
    </div>
  );
};

export default FaceDetection;