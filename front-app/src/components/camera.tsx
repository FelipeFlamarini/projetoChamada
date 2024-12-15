import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";

const WebcamCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing webcam", error);
      }
    };
    startWebcam();
  }, []);

  // Function to stop the webcam
  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  return (
    <div className="flex flex-col h-full gap-14 items-center sm:gap-2">
      <video ref={videoRef} autoPlay muted  className="border-2 rounded-3xl"/>
      <div className="flex justify-center ">
        <Button onClick={stopWebcam} variant={"go"} className="rounded-full">Finalizar Chamada Inteligente</Button>
      </div>
    </div>
  );
};

export default WebcamCapture;
