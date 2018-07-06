import React from "react";
import PropTypes from "prop-types";
import { close } from "../utils/svg";
import "./ToolTip.scss";

const ToolTip = props => {
  const { handleBlur, top, left, selectedState, closeToolTip } = props;
  const state = selectedState;
  const votesPerElectorate = Math.trunc(state.TOTAL_VOTES / state.Total_EV);
  const votePercentage = votes => {
    return ((votes / state.TOTAL_VOTES) * 100).toFixed(2) + "%";
  };
  return (
    <div
      className="tooltip"
      style={{ top: `${top}px`, left: `${left}px` }}
      onBlur={handleBlur}
    >
      <h1 className="heading">
        <span>{state.STATE}</span>
        <span>{close(closeToolTip)}</span>
      </h1>
      <div className="electorate">
        <span>Electoral Votes: {state.Total_EV}</span>
        <div className="standards">
          Votes per electorate:
          <span className="first">
            {votesPerElectorate.toLocaleString("en")}
          </span>
          <span className="percentage">
            {votePercentage(votesPerElectorate)}
          </span>
          <span className="ev_awarded">1</span>
        </div>
      </div>
      <div className="data_container">
        <div className="row" style={{ borderBottom: "solid 1px #b91f21" }}>
          <span>Trump</span>
          <div>
            <span className="popular_vote">
              {state.Trump_Votes.toLocaleString("en")}
            </span>
            <span className="percentage">
              {votePercentage(state.Trump_Votes)}
            </span>
            <span className="ev_awarded">{state.Trump_Hype}</span>
          </div>
        </div>
        <div className="row" style={{ borderBottom: "solid 1px #1b80d3" }}>
          <span>Hillary</span>
          <div>
            <span className="popular_vote">
              {state.Hillary_Votes.toLocaleString("en")}
            </span>
            <span className="percentage">
              {votePercentage(state.Hillary_Votes)}
            </span>
            <span className="ev_awarded">{state.Hillary_Hype}</span>
          </div>
        </div>
        <div className="row" style={{ borderBottom: "solid 1px #F9FF15" }}>
          <span>Johnson</span>
          <div>
            <span className="popular_vote">
              {state.Johnson_Votes.toLocaleString("en")}
            </span>
            <span className="percentage">
              {votePercentage(state.Johnson_Votes)}
            </span>
            <span className="ev_awarded">{state.Johnson_Hype}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ToolTip.defaultProps = {
  handleBlur: () => {}
};

ToolTip.propTypes = {
  handleBlur: PropTypes.function,
  left: PropTypes.number,
  top: PropTypes.number,
  selectedState: PropTypes.object,
  closeToolTip: PropTypes.function
};

export default ToolTip;
