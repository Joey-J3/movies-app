import React from "react";
import Button from "../Button";

function AddButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <Button
      type="reset"
      styleObject={{
        backgroundColor: "rgba(96, 96, 96, 0.68)",
        border: 0,
      }}
      onClick={onClick}
    >
      <span className="text-uppercase">+ add movie</span>
    </Button>
  );
}

export default AddButton;
