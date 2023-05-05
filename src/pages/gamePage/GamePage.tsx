import { useEffect } from 'react'
import Animals from '../../components/Animals'
import useRouter from '../../hook/useRouter';

const GamePage = () => {
    const { navigate } = useRouter();

    useEffect(() => {
      const nameUser = JSON.parse(localStorage.getItem("Nombre") as any) ;
      if (nameUser !== null) {
        navigate.push('/game')
      } else navigate.push('/')
    }, []);
    
    
  return (
    <Animals />
  )
}

export default GamePage
