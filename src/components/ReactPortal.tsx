import React from "react";
import { createPortal } from "react-dom";

interface PortalInterface {
  wrapperId?: string;
  children: React.ReactNode;
}

function ReactPortal({ wrapperId = "app", children }: PortalInterface) {
  return createPortal(children, document.getElementById(wrapperId));
}

export default ReactPortal;
