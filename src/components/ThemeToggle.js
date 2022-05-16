import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

function ThemeToggle() {
  const [theme, setTheme] = useState(false);
  return <ToggleSwitch id="theme" name="theme" checked={theme} onChange={setTheme} />;
}

export default ThemeToggle;
