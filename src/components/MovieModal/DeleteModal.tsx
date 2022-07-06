import React from "react";
import Modal from "../Modal";
import Footer from "../Modal/Footer";

interface IDeleteModal {
  visible: boolean;
  confirmCallback: () => any;
  close: () => any;
}

function DeleteModal({ visible, confirmCallback, close }: IDeleteModal) {
  return (
    <Modal
      title={"DELETE MOVIE"}
      visible={visible}
      size={"small"}
      closeCallback={close}
      footer={
        <Footer
          submitText="CONFIRM"
          resetText="CANCEL"
          cancelCallback={close}
          confirmCallback={confirmCallback}
        />
      }
    >
      <p>Are you sure you want to delete this movie?</p>
    </Modal>
  );
}

export default DeleteModal;
