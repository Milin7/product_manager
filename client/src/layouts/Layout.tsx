import {Outlet} from 'react-router-dom'

export default function Layout(){
    return(<>
    <div className='bg-red-500'> Desde layout</div>
    <Outlet/>
    </>)
}