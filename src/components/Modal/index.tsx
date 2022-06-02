import React, { MouseEventHandler } from "react";
import ReactPortal from "../ReactPortal";

import modalStyle from "./modal.module.scss";

interface ModalProps {
  title: string;
  children: any;
  footer: JSX.Element;
  visible: boolean;
  closeCallback: MouseEventHandler;
}

function Modal({
  title,
  children,
  footer,
  visible = false,
  closeCallback,
}: Partial<ModalProps>) {
  return (
    visible && (
      <ReactPortal>
        <div className={modalStyle.modal}>
          <div className={modalStyle["modal__wrapper"]}>
            <div
              className={modalStyle["modal-close-button"]}
              onClick={closeCallback}
            />
            {title && (
              <div className={`${modalStyle["modal__header"]} text-uppercase`}>
                {title}
              </div>
            )}
            {children}
            {footer}
          </div>
        </div>
      </ReactPortal>
    )
  );
}

export default Modal;
