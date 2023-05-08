import useAxios from "../../services/AnimalServices";
import { useEffect, useState } from "react";
import CardAnimal from "../cardAnimal/CardAnimal";
import "./Animals.css"

const QUANTITY_IMAGE = 12;

export type Props = {
  onHandleShowModal?: () => void;
};

const Animals  = (props: Props) => {
  const {
    onHandleShowModal
  } = props;

    const { response } = useAxios({
      method: "get",
      url: `/?per_page=${QUANTITY_IMAGE}`,
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
                console.log(success)
                  if ((success + 1) === QUANTITY_IMAGE) {
                    onHandleShowModal?.();
                  }
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
  
    return (
      <>
          <div className="container-fluid counter">
            <div className='container infoCounter'>
              <div className='container_success'>
                <div className='tit_success'>ACIERTOS:</div>
                <div className='value_success'>{success}</div>
              </div>
              <div className='container_fails'>
                <div className='tit_fails'>FALLOS:</div>
                <div className='value_fails'>{turns}</div>
              </div>                
            </div>  
          </div>
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
      </>
    )
  }
  
  export default Animals