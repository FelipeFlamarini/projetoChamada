// import { useRef, useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import * as faceDetection from '@tensorflow-models/face-detection';
// import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-webgpu';
// import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';

// // ver depois hook pronto npm
// // ver a melhor maneira para enviar as photos a cada frame/ a cada segundo

// tfjsWasm.setWasmPaths(
//     `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${
//         tfjsWasm.version_wasm}/dist/`);

// const WebcamCapture2 = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
//   const [detector, setDetector] = useState<faceDetection.FaceDetector | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);

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
//         runtime: 'mediapipe',
//         solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
//       };
//         const detector = await faceDetection.createDetector(model, detectorConfig);
//         setDetector(detector);
//     };

//     startWebcam();
//     loadModel();
//   }, []);

//   // useEffect(() => {
//   //   // console.log("dasad")
//   //   const interval = setInterval(async () => {
//   //     if (detector && videoRef.current) {
//   //       // console.log("dasad")
//   //         const faces = await detector.estimateFaces(videoRef.current);
//   //       console.log(faces)
//   //       if (faces.length > 0) {
//   //         captureAndSendPhoto();
//   //         capturePhoto();
//   //       }
//   //     }
//   //   }, 1000);

//   //   return () => clearInterval(interval);
//   // }, [detector]);

//   useEffect(() => {
//     console.log("dasad")
//     const detectFaces = async () => {
//       // if (detector && videoRef.current) {
//       //   const faces = await detector.estimateFaces(videoRef.current);
//       //   console.log(faces);
//       //   if (faces.length > 0) {
//       //     capturePhoto();
//       //   }
//       // }
//       if (detector && videoRef.current) {
//         try {
//           const faces = await detector.estimateFaces(videoRef.current);
//           console.log(faces);
//           if (faces.length > 0) {
//             console.log("Face detectada");
//             // sendPhoto();
//           }
//         } catch (error) {
//           detector?.dispose();
//           setDetector(null);
//           console.error("Error detectar face", error);
//         }
//       }
//       requestAnimationFrame(detectFaces);
//     };

//     detectFaces();

//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => {
//           track.stop();
//         });
//       }
//     };
//   }, [detector, mediaStream]);

//   const captureAndSendPhoto = () => {
//     console.log("AAAA")

//     if (videoRef.current) {
//       const canvas = document.createElement('canvas');
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const context = canvas.getContext('2d');
//       if (context) {
//         context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//         canvas.toBlob(async (blob) => {
//           if (blob) {
//             const formData = new FormData();
//             formData.append('file', blob, 'photo.jpg');
//             try {
//               await fetch('YOUR_BACKEND_URL', {
//                 method: 'POST',
//                 body: formData,
//               });
//             } catch (error) {
//               console.error('Error sending photo to backend', error);
//             }
//           }
//         }, 'image/jpeg');
//       }
//     }
//   };


  
//   const capturePhoto = () => {
//     console.log("IIIIIIIIII")
//     if (videoRef.current) {
//       const canvas = document.createElement("canvas");
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const context = canvas.getContext("2d");
//       if (context) {
//         context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//         const imageUrl = canvas.toDataURL("image/jpeg");
//         setCapturedImage(imageUrl);
//       }
//     }
//   };

//   const stopWebcam = () => {
//     if (mediaStream) {
//       mediaStream.getTracks().forEach((track) => {
//         track.stop();
//       });
//       setMediaStream(null);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full gap-14 items-center sm:gap-2">
//       <video ref={videoRef} autoPlay muted className="border-2 rounded-3xl" />
//       <div className="flex justify-center">
//         <Button onClick={stopWebcam} variant={"go"} className="rounded-full">Finalizar Chamada Inteligente</Button>
//       </div>
//       {capturedImage && (
//         <div className="mt-4">
//           <img src={capturedImage} alt="Captured" className="border-2 rounded-3xl" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebcamCapture2;