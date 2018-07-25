import React from "react";
import PropTypes from "prop-types";
import "./Switch.scss";

const Switch = ({ side_label, handleSwitch }) => {
  return (
    <div className="form-group switch_container">
      <label className="form-switch">
        <input
          type="checkbox"
          onClick={() => {
            handleSwitch();
          }}
        />
        <i className="form-icon" /> <span>{side_label}</span>
      </label>
    </div>
  );
};

Switch.propTypes = {
  handleSwitch: PropTypes.func,
  side_label: PropTypes.string
};

export default Switch;
