import { useEffect, useState } from 'react';
import useRouter from '../../hook/useRouter';
import "./Form.css"


 const Form = () => {
    const [valueName, setValueName] = useState("");
    const { navigate } = useRouter();

    const handleName = () => {
        const nameUser = JSON.parse(localStorage.getItem("Nombre") || "") ;
        if (nameUser) {
            navigate.push('/game')
          } else navigate.push('/')
      }

      useEffect(() => {
        localStorage.setItem('Nombre', JSON.stringify(valueName));
      }, [valueName]);

    return (
        <form onSubmit = {(e) => e.preventDefault()}>
            <input
            type="text"
            value={valueName}
            onChange={(e) => setValueName(e.target.value as any)}
            placeholder="Ingresa tu nombre"
            className='inputCustom'
            />

            <input type="submit" value="A JUGAR !!" onClick={handleName} className='btn btn-info btnCustom'></input>
        </form>

    );
}

export default Form
