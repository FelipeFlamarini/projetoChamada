import { useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const FaceDetection = () => {
  const videoRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Carregar os modelos necessários
  const loadModels = async () => {
    const MODEL_URL = "/models"; // Certifique-se de que os modelos estão nesta pasta pública
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  };

  // Iniciar a detecção facial
  const handleVideoPlay = async () => {
    await loadModels();

    const video = videoRef.current?.video;
    const canvas = canvasRef.current;

    // console.log(video.videoWidth,video.videoHeight)

    if (!canvas || !video) return;

    // Configurar o canvas para sobrepor o vídeo

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    // const displaySize = {
    //   width: 400,
    //   height: 400,
    // };

    if (displaySize.width === 0 || displaySize.height === 0) {
      console.error("Invalid video dimensions:", displaySize);
      return;
    }

    faceapi.matchDimensions(canvas, displaySize, true);

    setInterval(async () => {
      // console.log("AAAAAA")
      // setSize({ width: video.videoWidth, height: video.videoHeight });
      const detections = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );
      // if (detections) {
      //   console.log("Detected face:", detections);
      // }
      if (detections) {
        // console.log("AAAA:", detections);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        console.log("Detected face:", resizedDetections);
        if (videoRef.current) {
          const imageSrc = videoRef.current.getScreenshot();
          if (imageSrc) {
            // fetch("http://localhost:5000/api/face", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     image: imageSrc,
            //   }),
            // })
          }
        }

        const context = canvas.getContext("2d");
        if (context && canvas.width != 0 && canvas.height != 0) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
        }
      }
    }, 650);
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-start">
        <Webcam
          ref={videoRef}
          // autoPlay
          muted
          className="border border-btnGo rounded-3xl"
          // style={{ transform: "scaleX(-1)" }} // Espelhar o vídeo
          screenshotFormat="image/jpeg"
          onUserMedia={handleVideoPlay}
          // height={400}
          // width={400}
        />
        <canvas
          ref={canvasRef}
          className="absolute"
          // style={{ transform: "scaleX(-1)" }} // Espelhar o canvas para corresponder ao vídeo
          // width={size.width}
          // height={size.height}
        />
        {/* <Button
      onClick={handleVideoPlay}
      >
        clic
      </Button> */}
      </div>
    </div>
  );
};

export default FaceDetection;
