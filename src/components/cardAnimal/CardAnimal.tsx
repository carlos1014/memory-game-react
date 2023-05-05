import React from 'react'
import img_interrogation from "./../../assets/img_interrogation.jpg"
import "./CardAnimal.css"


export type Props = {
    card: string | any;
    handleSelect?: (card: string) => void;
    flipCard: string;
    disabled:boolean
  };


const CardAnimal = (props: Props) => {
    const {card, handleSelect, flipCard, disabled } = props;
  return (
    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-3 col-sm-3">
        <div className="cardContainer">
            <div className={flipCard ? "flipCard" : ""}>
                <img src={card.src} className="img_animal" alt="img_animal" />  
                <img src={img_interrogation} className="img_interrogation" onClick={!disabled ? () => handleSelect?.(card) : () => ('')} alt="img_interrogation" />
            </div>
            </div>
    </div> 
  )
}

export default CardAnimal
