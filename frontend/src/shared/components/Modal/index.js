import React, { useEffect } from "react";
import { Modal as ModalStyled, ModalBody, ModalTitle, ModalContent, ModalFooter, ModalButton } from "./styled";


const Modal = ({
    onClose, 
    onSubmit, 
    children, 
    title,
    submitText='Submit',
    cancelText='Cancel'
  }) => {
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);



  return (
      <ModalStyled onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <ModalTitle>{title}</ModalTitle>
          </div>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <ModalButton onClick={onClose} >
              {cancelText}
            </ModalButton>
            <ModalButton onClick={onSubmit} >
              {submitText}
            </ModalButton>
          </ModalFooter>
        </ModalContent>
      </ModalStyled>
  );
};

export default Modal;
