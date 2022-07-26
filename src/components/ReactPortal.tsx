import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalInterface {
  wrapperId?: string;
  children: React.ReactNode;
}

function ReactPortal({ wrapperId = "app", children }: PortalInterface) {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  return mount
    ? createPortal(
        children,
        document.getElementById(wrapperId) ||
          document.getElementsByTagName("body")[0]
      )
    : null;
}

export default ReactPortal;
