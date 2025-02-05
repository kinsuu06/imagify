import React, { useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'
const Navbar = () => {

    // const[user,setUser] = useState(true);// to keep the track of user either user logged in or logged out // now this in appContext.jsx file
    const {user} = useContext(AppContext)
    const navigate = useNavigate();
  return (
    <div className='flex items-center justify-between py-4'>
        <Link to='/'>
        <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40'/>
        </Link>
        


        <div>
            {
                user
                ?// user logged in
                <div className='flex items-center gap-2 sm:gap-3'>
                    <button onClick={()=> navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700 '>
                        <img className='w-5'src={assets.credit_star} alt="" />
                        <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit left: 50</p>
                    </button> 
                    <p className='text-gray-600 max-sm:hidden pl-4'>Hi ,Krati Agrawal</p>
                    <div className='relative group'>
                        
                        <img src={assets.profile_icon}className='w-10 dropshadow' alt="" />
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                            <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                <li className='px-2 py-1 pr-10 cursor-pointer '>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
                ://user logged out
                <div className='flex items-center gap-2 sm:gap-5'>
                    <p onClick={()=>navigate('/buy')}  className='cursor-pointer'>Pricing</p>
                    <button className='bg-zinc-800 text-white px-7  py-2 sm:px-10 text-sm rounded-full'>login</button>
                </div>
            }
            
            
        </div>
    </div>
  )
}

export default Navbar