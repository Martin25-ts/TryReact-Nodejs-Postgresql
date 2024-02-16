import { Toolbar } from 'primereact/toolbar'
import { Avatar } from 'primereact/avatar'
import Income from './compponents/income'
import Outcome from './compponents/outcome'
import History from './compponents/history'

import UserLogo from './assets/dummy_img.jpg';

function Header(){
  // https://www.nicepng.com/png/full/222-2224927_primereact-logo-download-primefaces-logo-png.png
  const startContent = [
    <Avatar image="https://www.nicepng.com/png/full/222-2224927_primereact-logo-download-primefaces-logo-png.png" size="large" shape="circle" />
  ]

  const endContent = [
    <div className='flex align-items-center gap-3'>
      <Avatar image={UserLogo} size="large" shape="circle" />
      <span className='font-semibold text-blue-50'>Martin Timoteus Sigaian</span>
    </div>
  ]

  return ( <Toolbar className='mb-2 p-3 border-round-3xl bg-blue-900' start={startContent} end={endContent} />);
}


export default function App() {
  return (
    <>
      <Header />
      <div className='income-outcome'>
        <Income />
        <Outcome />
      </div>

      <div className='history flex justify-content-between w-full'>
        <History />
      </div>

    </>
  )
}

