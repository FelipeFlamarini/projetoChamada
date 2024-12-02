
import './App.css'
import { Button } from './components/ui/button'
import { z } from "zod"
import { LoginForm } from './components/login-form'

const formSchema = z.object({
  username: z.string().min(2).max(50),
})


function App() {

  return (
    <div className='flex flex-col justify-center items-center gap-2 h-dvh'>
      <LoginForm />
        {/* <Button className='rounded-full' variant={"go"} size={'lg'}>Click me</Button>

        <Button className='rounded-full' variant={"goSecondary"} size={'lg'}>Click me</Button>

        <Button className='rounded-full' variant={"goOutline"} size={'lg'}>Click me</Button> */}
        
    </div>
  )
}

export default App
