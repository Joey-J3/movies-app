import { SizeType } from "@/types";
import clsx from "clsx";
import React from "react";
import style from "./styles/success.module.scss";

const sizeMap = {
  small: "md-24",
  middle: "md-36",
  large: "md-48",
};

const SuccessIcon = ({ size = "large" }: { size?: SizeType }) => (
  <div className={clsx(style["icon"], style["success-icon"])}>
    <span className={clsx(["material-icons", sizeMap[size]])}>done</span>
  </div>
);

export default SuccessIcon;
