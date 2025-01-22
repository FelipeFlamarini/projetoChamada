// import FaceDetection from "@/components/faceDetection";
import FaceDetection from "@/components/dialogfaceDetection";

export function Camera() {
  return (
    <div className="w-full h-dvh flex flex-col gap-12 px-2 pt-8 pb-2 sm:py-2 sm:gap-2">
      <div>
        <p className="text-text text-center">
          Passe pelo reconhecimento facial para registrar sua presença na aula.
        </p>
        <p className="text-subText text-center">
          O registro da presença será automático.
        </p>
      </div>
      <FaceDetection />
    </div>
  );
}
