import useAxios from "../services/AnimalServices";
import { useEffect, useState } from "react";
import CardAnimal from "./cardAnimal/CardAnimal";

const Animals  = () => {
    const { response } = useAxios({
      method: "get",
      url: `/?per_page=8`,
      headers: {
        accept: '*/*'
      }
    });

    const [listPhoto, setListPhoto] = useState<any>();
    const [listCards, setListCards] = useState([]);
    const [selectOne, setSelectOne] = useState<any>();
    const [selectTwo, setSelectTwo] = useState<any>();
    const [disabled, setDisabled] = useState(false);
    const [turns, setTurns] = useState(0);
    const [success, setSuccess] = useState(0);

    const handleSelect = (card: any) => {
      selectOne ? setSelectTwo(card as any) : setSelectOne(card as any)
    }

    const resetTurn = () => {
      setSelectOne(false)
      setSelectTwo(false)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    }

    useEffect(()=>{
      setListPhoto(response?.data.entries);
      if (listPhoto) {
        const loadCard = [...listPhoto, ...listPhoto]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ selection:false, src:card.fields.image.url, id: Math.random()}))
        setListCards(loadCard as [])
        setTurns(0)
        setSuccess(0)
      }
 
    }, [response])


    useEffect(()=>{
      if (selectOne && selectTwo) {
        setDisabled(true)
        if (selectOne.src === selectTwo.src) {
          setListCards((prevListCards:any) => {
            return prevListCards.map((card:any) => {
              if (card.src === selectOne.src) {
                setSuccess(success + 1)
                setTurns(turns)
                return {...card, selection: true}
              } else {
                return card
              }
            })
          })
          resetTurn()
        } else {
          setTimeout(() => resetTurn(), 1000);
          
        }
      }
    }, [selectOne, selectTwo])
  
    console.log('new listCards', listCards)
    return (
      <>
      <div>IMAGENES</div>
          <div className="container">
            <div className="row">
              {
                listCards?.map((card:any) => (
                  <CardAnimal 
                    key={card.id}
                    card={card}
                    handleSelect={handleSelect} 
                    flipCard={selectOne === card || selectTwo === card || card.selection} 
                    disabled={disabled}
                    />
                ))
                }
            </div> 
          </div> 
          <div>ERRORES:{turns}</div>
          <div>ACIERTOS:{success}</div>
      </>
    )
  }
  
  export default Animals