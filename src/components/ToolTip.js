import React from "react";
import PropTypes from "prop-types";
import { close } from "../utils/svg";
import "./ToolTip.scss";
import { $democratic_color, $republican_color } from "../styles/vars.js";

const ToolTip = props => {
  const {
    handleBlur,
    top,
    left,
    selectedState,
    closeToolTip,
    actualOrHype
  } = props;
  const state = selectedState;
  const votesPerElectorate = Math.trunc(state.total_votes / state.total_actual);
  const candidates = [
    { name: "Trump", candidate: "trump", color: $republican_color },
    { name: "Hillary", candidate: "hillary", color: $democratic_color },
    { name: "Johnson", candidate: "johnson", color: "#ffff00" }
  ];

  const votePercentage = votes => {
    return ((votes / state.total_votes) * 100).toFixed(2) + "%";
  };

  return (
    <div
      className="province_stats"
      style={{ top: `${top}px`, left: `${left}px` }}
      onBlur={handleBlur}
    >
      <h1 className="heading">
        <span>{state.province}</span>
        <span>{close(closeToolTip)}</span>
      </h1>
      <span className="total_electorates">
        Electoral Votes: {state.total_actual}
      </span>
      <div className="electorate">
        Votes per electorate:
        <span className="percentage">{votePercentage(votesPerElectorate)}</span>
        <span className="first">{votesPerElectorate.toLocaleString("en")}</span>
        <span className="ev_awarded">1</span>
      </div>
      <table className="results-table">
        <tbody>
          {candidates.map((obj, i) => {
            const { name, candidate, color } = obj;
            return (
              <tr className="type-republican" key={i}>
                <th scope="row" className="results_name">
                  <span className="name-combo">
                    <span className="token token-party">
                      <abbr title="Republican">R</abbr>
                    </span>{" "}
                    {name}
                  </span>
                </th>

                <td className="results_percentage">
                  <span className="percentage_combo">
                    <span className="number">
                      {votePercentage(state[`${candidate}_votes`])}
                    </span>
                    <span className="graph">
                      <span className="bar">
                        <span
                          className="index"
                          style={{
                            width: `${votePercentage(
                              state[`${candidate}_votes`]
                            )}`,
                            background: color
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </td>
                <td className="results_popular">
                  {state[`${candidate}_votes`].toLocaleString("en")}
                </td>
                <td className="delegates_cell">
                  {state[`${candidate}_${actualOrHype}`]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ToolTip.defaultProps = {
  handleBlur: () => {}
};

ToolTip.propTypes = {
  handleBlur: PropTypes.func,
  left: PropTypes.number,
  top: PropTypes.number,
  selectedState: PropTypes.object,
  closeToolTip: PropTypes.func
};

export default ToolTip;
