import { useEffect, useState } from "react";
import CardAnimal from "../cardAnimal/CardAnimal";
import "./Animals.css";
import { ListCards, ListPhoto } from "../../models/AnimalsType";

const QUANTITY_IMAGE = 9;

// Definitions
export type Props = {
  onHandleShowModal?: () => void;
  photos:ListPhoto[];
};

// Default values
const Defaults = {
  onHandleShowModal: undefined,
  photos: undefined,
};


const Animals = (props: Props) => {
  const { onHandleShowModal, photos } = props;
  const [listCards, setListCards] = useState<ListCards[]>();
  console.log("listCards", listCards);
  const [selectOne, setSelectOne] = useState<ListCards>();
  console.log("selectOne", selectOne);
  const [selectTwo, setSelectTwo] = useState<any>();
  console.log("selectTwo", selectTwo);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [success, setSuccess] = useState(0);

  const handleSelect = (card: any) => {
    selectOne ? setSelectTwo(card as ListCards) : setSelectOne(card as ListCards);
  };

  const resetTurn = () => {
    setSelectOne(undefined);
    setSelectTwo(undefined);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (photos) {
      const loadCard = [...photos.slice(0,QUANTITY_IMAGE), ...photos.slice(0,QUANTITY_IMAGE)]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({
          selection: false,
          src: card.image,
          id: Math.random(),
        }));
      setListCards(loadCard);
      setTurns(0);
      setSuccess(0);
    }
  }, [photos]);

  useEffect(() => {
    if (selectOne && selectTwo) {
      setDisabled(true);
      if (selectOne.src === selectTwo.src) {
        setListCards((prevListCards: any) => {
          return prevListCards.map((card: ListCards) => {
            if (card.src === selectOne.src) {
              setSuccess(success + 1);
              setTurns(turns);
              if (success + 1 === QUANTITY_IMAGE) {
                onHandleShowModal?.();
              }
              return { ...card, selection: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [onHandleShowModal, selectOne, selectTwo, success, turns]);

  return (
    <>
      <div className="container-fluid counter">
        <div className="container infoCounter">
          <div className="container_success">
            <div className="tit_success">ACIERTOS:</div>
            <div className="value_success">{success}</div>
          </div>
          <div className="container_fails">
            <div className="tit_fails">FALLOS:</div>
            <div className="value_fails">{turns}</div>
          </div>
        </div>
      </div>
        <div className="container">
          <div className="row">
            {listCards?.map((card: any) => (
              <CardAnimal
                key={card.id}
                card={card}
                handleSelect={handleSelect}
                flipCard={
                  selectOne === card || selectTwo === card || card.selection
                }
                disabled={disabled}
              />
            ))}
          </div>
        </div>
    </>
  );
};

Animals.defaultProps = Defaults;

export default Animals;
