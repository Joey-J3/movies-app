import { useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => setValue((preState) => !preState);

  return { value, toggle, setValue };
};

export const useUrlParams = (
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, (name: string, value: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams(defaultInit);

  const setParams = (name: string, value: string) => {
    if (!value) {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }
    setSearchParams(searchParams);
  };

  return [searchParams, setParams];
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
