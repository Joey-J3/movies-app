import { useState } from "react";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => setValue((preState) => !preState);

  return { value, toggle };
};
