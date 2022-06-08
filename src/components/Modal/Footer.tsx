import React, { MouseEventHandler } from "react";
import Button from "../Button";
import modalStyle from "./styles/modal.module.scss";

interface FooterProps {
  submitText: string;
  resetText: string;
  confirmCallback: MouseEventHandler;
  cancelCallback: MouseEventHandler;
}

function Footer({
  submitText = "submit",
  resetText = "reset",
  cancelCallback,
  confirmCallback,
}: Partial<FooterProps>): JSX.Element {
  const buttonStype = {
    padding: "16px 48px",
  };
  return (
    <div className={modalStyle["modal__footer"]}>
      <span className={modalStyle["modal__footer__button"]}>
        <Button type="reset" onClick={cancelCallback} styleObject={buttonStype}>
          <span className="text-uppercase">{resetText}</span>
        </Button>
      </span>
      <span className={modalStyle["modal__footer__button"]}>
        <Button
          type="submit"
          onClick={confirmCallback}
          styleObject={buttonStype}
        >
          <span className="text-uppercase">{submitText}</span>
        </Button>
      </span>
    </div>
  );
}

export default Footer;
