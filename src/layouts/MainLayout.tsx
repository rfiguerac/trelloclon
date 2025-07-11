
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const MainLayout = () => {
  return (
    <div className="container mx-auto p-10 place-items-center">
        <Navbar />

        <div className='container'>
            <Outlet />
        </div>
    </div>
  )
}
