import { toast } from 'sonner';
// import { Button } from "@/components/button";
import { Button } from '@/components/ui/button';

import WebcamCapture from "@/components/camera"

export function Camera() {
  return (
    <div className="w-full h-dvh flex flex-col gap-12 px-2 pt-8 pb-2 sm:py-2 sm:gap-2">
      <div>
        <p className="text-text text-center">Passe pelo reconhecimento facial para registrar sua presença na aula.</p>
        <p className="text-subText text-center">O registro da presença será automático.</p>
      </div>
      <WebcamCapture />
      {/* <div className='flex gap-2'>
      <Button onClick={() => toast.success('Face Reconhecida',{
        closeButton: true,
        description: "João Silva Esta Presente"
      })}>success</Button>
      <Button onClick={() => toast.warning('Sua Aula ainda não terminou',{
        closeButton: true,
        description: "João Silva Se sair agora ficara com falta",
        action: {
          label: 'Sair Mesmo Assim',
          onClick: () => console.log('Action!'),
        },
        cancel: {
          label: 'Ficar Na Aula',
          onClick: () => console.log('Cancel'),
        }
      })}>warning</Button>
      <Button onClick={() => toast.error('Aluno não identificado',{
        closeButton: true,
        description: "A presença não foi registrada, tente Novamente"
      })}>error</Button>
      </div> */}
    </div>
  )
}