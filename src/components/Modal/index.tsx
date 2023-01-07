import Modal from "react-modal";
import "../Wheel/index.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    // height: "300px",
  },
};

const CustomModal = ({
  isOpen,
  closeModal,
  price,
}: {
  isOpen: boolean;
  closeModal: () => void;
  price: number;
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Congratulations 🎉🥳🎊!
      </h1>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        You have won ₹{price}
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={closeModal} className="button">
          OK
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
