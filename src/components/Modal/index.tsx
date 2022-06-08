import { SizeType } from "@/types";
import React, { MouseEventHandler } from "react";
import ReactPortal from "../ReactPortal";

import modalStyle from "./styles/modal.module.scss";

interface ModalProps {
  title: string;
  children: any;
  footer: JSX.Element;
  visible: boolean;
  closeCallback: MouseEventHandler;
  size: SizeType;
}

const sizeMap: Record<SizeType, string> = {
  small: "480px",
  middle: "720px",
  large: "976px",
};

function Modal({
  title,
  children,
  footer,
  visible = false,
  closeCallback,
  size = "large",
}: Partial<ModalProps>) {
  return (
    visible && (
      <ReactPortal>
        <div className={modalStyle.modal}>
          <div
            className={modalStyle["modal__wrapper"]}
            style={{ width: sizeMap[size] }}
          >
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
