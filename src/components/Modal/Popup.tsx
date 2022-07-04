import React from "react";
import Modal from ".";
import SuccessIcon from "../Icons/SuccessIcon";
import style from "./styles/popup.module.scss";

// export enum PopupType {
//   SUCCESS = "success",
// }

interface PopupProps {
  visible: boolean;
  close: React.MouseEventHandler;
  showIcon?: boolean;
  type?: "success";
  title?: string;
  subTitle?: string;
  footer?: React.ReactNode;
}

const IconMap = {
  success: SuccessIcon,
};

function Popup({
  visible = false,
  close,
  showIcon = false,
  type = "success",
  title = "SUCCESS",
  subTitle,
  footer,
}: PopupProps) {
  const Icon = IconMap[type];
  return (
    <Modal visible={visible} closeCallback={close} size="small">
      <div className={style["popup"]}>
        {/* <div className={style["popup__icon"]}> */}
        {showIcon && <Icon />}
        {/* </div> */}
        <div className={style["popup__content"]}>
          {title && <div className={style["popup__title"]}>{title}</div>}
          {subTitle && (
            <div className={style["popup__sub-title"]}>{subTitle}</div>
          )}
        </div>
        {footer && <div className={style["popup__footer"]}>{footer}</div>}
      </div>
    </Modal>
  );
}

export default Popup;
