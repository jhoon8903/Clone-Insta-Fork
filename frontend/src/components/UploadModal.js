import React, { useState } from "react";
import Modal from "react-modal";
import Upload from "../pages/Upload";
import styled from "styled-components";
import { FiPlusSquare } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const UploadModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <FiPlusSquare onClick={() => setModalIsOpen(true)} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: "20%",
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "20px",
            right: "40px",
            bottom: "30px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <StCloseIcon>
          <AiOutlineCloseCircle onClick={() => setModalIsOpen(false)} />
        </StCloseIcon>

        <Upload />
      </Modal>
    </>
  );
};

const StCloseIcon = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: flex-end;
`;

export default UploadModal;
