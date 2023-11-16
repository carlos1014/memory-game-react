import { useEffect, useState } from "react";
import Animals from "../../components/animals/Animals";
import useRouter from "../../hook/useRouter";
import logo_mini from "./../../assets/logo_mini.png";
import "./GamePage.css";
import Modal from "../../components/modal";
import useAxios from "../../hook/useAxios";
import { ListPhoto } from "../../models/AnimalsType";
import { Oval } from "react-loader-spinner";

// Definitions
export type Props = {
  onHandleShowModal?: () => void;
  photos: ListPhoto[];
};

// Default values
const Defaults = {
  onHandleShowModal: undefined,
  photos: undefined,
};

const GamePage = (props: Props) => {
  const { response, loading, error } = useAxios({
    method: "get",
    url: `/character`,
    headers: {
      accept: "*/*",
    },
  });

  const photos = response?.data.results;
  console.log(photos);
  const { navigate } = useRouter();
  const [nameUserPrint, setNameUserPrint] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onHandleShowModal = () => {
    setShowModal(true);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const nameUser = JSON.parse(localStorage.getItem("Nombre") as any);
    if (nameUser !== null) {
      navigate.push("/game");
      setNameUserPrint(nameUser);
    } else navigate.push("/");
  }, [navigate]);

  return (
    <>
      {showModal && (
        <Modal nameUserPrint={nameUserPrint} onHandleRefresh={handleRefresh} />
      )}
      <div className="container-fluid top_name">
        <div className="container info_top">
          <img src={logo_mini} className="logo_mini" alt="logo_mini" />
          <div className="txt_hi">HOLA</div>
          <div className="txt_name">{nameUserPrint}</div>
        </div>
      </div>
      {loading ? (
        <Oval
        height={80}
        width={80}
        color="#fff"
        wrapperStyle={{}}
        wrapperClass="spinner"
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#008DA6"
        strokeWidth={2}
        strokeWidthSecondary={2}
      
      />
      ) : (
        <>
          <Animals onHandleShowModal={onHandleShowModal} photos={photos} />
          {error && (
            <div>
              <p className="msgError">{error.message}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

GamePage.defaultProps = Defaults;

export default GamePage;
