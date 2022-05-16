import React from "react";
import toggleSwitchStyle from "./toggle-switch.module.scss";

class ToggleSwitch extends React.PureComponent {
  render() {
    const { id, name, checked, onChange, small, optionLabels, disabled } =
      this.props;
    return (
      <div
        className={`${toggleSwitchStyle['toggle-switch']} ${
          small && toggleSwitchStyle['small-switch']
        }`}
      >
        <input
          type="checkbox"
          className={toggleSwitchStyle['toggle-switch-checkbox']}
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        {id && (
          <label className={toggleSwitchStyle['toggle-switch-label']} htmlFor={id}>
            <span
              className={`${toggleSwitchStyle['toggle-switch-inner']} ${
                disabled && toggleSwitchStyle['toggle-switch-disabled']
              }`}
              data-yes={optionLabels[0]}
              data-no={optionLabels[1]}
            />
            <span
              className={`${toggleSwitchStyle['toggle-switch-switch']} ${
                disabled && toggleSwitchStyle['toggle-switch-disabled']
              }`}
            />
          </label>
        )}
      </div>
    );
  }
}

ToggleSwitch.defaultProps = {
  optionLabels: ["On", "Off"],
};

export default ToggleSwitch;
