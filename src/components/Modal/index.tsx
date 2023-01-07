import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
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
      <h1 style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        Congratulations 🎉🥳🎊!
      </h1>
      <h2 style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        You have won ₹{price}
      </h2>
    </Modal>
  );
};

export default CustomModal;
