import { useEffect } from 'react';
import Form from '../../components/form/Form'
import useRouter from '../../hook/useRouter';
import logo_game from "./../../assets/logo_game.png"
import "./FormPage.css"

export const FormPage = () => {
  const { navigate } = useRouter();


  return (
    <div className='container'>
      <img src={logo_game} className="logo_game" alt="logo_game" /> 
      <h2>Ingresa tu nombre para iniciar el juego </h2> 
      <Form />
    </div>
  )
}

export default FormPage
