import { useEffect, useState } from 'react'
import Animals from '../../components/animals/Animals'
import useRouter from '../../hook/useRouter';
import logo_mini from "./../../assets/logo_mini.png"
import "./GamePage.css"

const GamePage = () => {
    const { navigate } = useRouter();
    const [nameUserPrint, setNameUserPrint] = useState('');
    
    useEffect(() => {
      const nameUser = JSON.parse(localStorage.getItem("Nombre") as any) ;
      if (nameUser !== null) {
        navigate.push('/game')
        setNameUserPrint(nameUser)
      } else navigate.push('/')
    }, []);
    
    
  return (
    <>
    <div className='container-fluid top_name'>
      <div className='container info_top'>
        <img src={logo_mini} className="logo_mini" alt="logo_mini" /> 
        <div className='txt_hi'>HOLA</div>
        <div className='txt_name'>{nameUserPrint}</div> 
      </div>
    </div>
    <Animals />
    </>
  )
}

export default GamePage
