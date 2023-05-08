import "./Modal.css"


export type Props = {
  nameUserPrint: string;
  onHandleRefresh?: () => void;
};

const Modal = (props: Props) => {
    const {nameUserPrint, onHandleRefresh } = props;
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="txtCongratulations">Felicidades <span>{nameUserPrint}</span></div> 
        <div className="txtFinal">Tu memoría esta funcionando...</div> 
        <input type="submit" value="JUEGA OTRA VEZ" onClick={onHandleRefresh} className='btn btn-info btnCustom'></input>
      </div>
    </div>
  )
}

export default Modal
