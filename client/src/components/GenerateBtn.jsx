import React,{useContext} from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const GenerateBtn = () => {
  const {user,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()

  const onclickHandler = () =>{
      if(user){
          navigate('/result')
      }else{
          setShowLogin(true)
      }
  }
  return (
    <motion.div className='pb-16 text-center'
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now</h1>

        <motion.button className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white -auto hover:scale-105 traansition-all duration-500'
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        initial={{opacity:0}} 
        animate={{opacity:1}}
        transition={{default:{duration:0.5},opacity:{delay:0.8},duration:1}} onClick={onclickHandler}>Generate Images 
            <img src={assets.star_group  } alt="" className='h-6'/>
        </motion.button>

    </motion.div>
  )
}

export default GenerateBtn