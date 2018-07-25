import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Select.scss";

const Switch = ({ options }) => {
  return (
    <div className="column col-3 col-xs-12">
      <div className="form-group">
        <select className="form-select override">
          {options && (
            <Fragment>
              {options.map((option, i) => {
                return <option key={i}>{option}</option>;
              })}
            </Fragment>
          )}
        </select>
      </div>
    </div>
  );
};

Switch.propTypes = {
  options: PropTypes.array
};

export default Switch;
