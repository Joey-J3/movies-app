import React from "react";
import { createPortal } from "react-dom";

function ModalContainer<P extends object>(
  WrappedComponent: React.FunctionComponent<P> | React.ClassicComponentClass<P>
) {
  return function modal(props: P) {
    return createPortal(
      <WrappedComponent {...(props as P)} />,
      document.getElementById("app")
    );
  };
}

export default ModalContainer;
