import Form from "../../components/form/Form";

import logo_game from "./../../assets/logo_game.png";
import "./FormPage.css";

export const FormPage = () => {
  return (
    <div className="container">
      <img src={logo_game} className="logo_game" alt="logo_game" />
      <h2 className="txtName--begin">
        Ingresa tu nombre para iniciar el juego{" "}
      </h2>
      <Form />
    </div>
  );
};

export default FormPage;
