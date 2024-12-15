// import { useRef, useState, useEffect } from "react";
// import { Button } from "./ui/button";
// import { Link } from "react-router";
// // import Webcam from "react-webcam";
// import "@tensorflow/tfjs-backend-webgl";
// import "@tensorflow/tfjs-backend-webgpu";
// import * as mpFaceDetection from "@mediapipe/face_detection";

// // talvez usar camera de mediapipe

// import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";

// tfjsWasm.setWasmPaths(
//   `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
// );

// import * as faceDetection from "@tensorflow-models/face-detection";

// const WebcamCapture4 = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const webcamRef = useRef(null);
//   const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
//   const [detector, setDetector] = useState<faceDetection.FaceDetector | null>(
//     null
//   );

//   useEffect(() => {
//     const startWebcam = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//         setMediaStream(stream);
//       } catch (error) {
//         console.error("Error accessing webcam", error);
//       }
//     };

//     const loadModel = async () => {
//       const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
//       const detectorConfig = {
//         runtime: "mediapipe",
//         solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@${mpFaceDetection.VERSION}`,
//       };

//       try {
//         const detector = await faceDetection.createDetector(
//           model,
//           detectorConfig
//         );
//         setDetector(detector);
//       } catch (error) {
//         // detector?.dispose();
//         setDetector(null);
//         console.error("Error criar detector", error);
//       }
//     };
//     startWebcam();
//     loadModel();
//   }, []);

//   // por no useEffect
//   useEffect(() => {
//     const detectFace = async () => {
//       if (detector && videoRef.current) {
//         try {
//           const faces = await detector.estimateFaces(videoRef.current);
//           console.log(faces);
//           if (faces.length > 0) {
//             sendPhoto();
//           }
//         } catch (error) {
//           detector?.dispose();
//           setDetector(null);
//           console.error("Error detectar face", error);
//         }
//       }
//     };

//     detectFace();
//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => {
//           track.stop();
//         });
//       }
//     };
//   }, [detector, mediaStream]);

//   const sendPhoto = () => {
//     console.log("enviando foto");
//   };

//   return (
//     <div className="flex flex-col h-full gap-14 items-center sm:gap-2">
//       {/* <video ref={videoRef} autoPlay muted  className="border-2 rounded-3xl"/> */}
//       <video
//         className="border-2 border-btnGo rounded-3xl"
//         ref={videoRef}
//         autoPlay
//         muted
//       />
//       <div className="flex justify-center ">
//         <Button variant={"go"} className="rounded-full">
//           <Link to="/">Finalizar Chamada Inteligente</Link>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default WebcamCapture4;
