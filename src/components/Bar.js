import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { $democratic_color, $republican_color } from "../styles/vars.js";
import ReactTooltip from "react-tooltip";
import "./Bar.scss";

class Bar extends Component {
  state = {
    province: "",
    hoverBar: ""
  };

  handleHoverBar = (province, candidate, hoverBar) => {
    this.setState({
      province,
      province_id: `${candidate}${province}`,
      hoverBar
    });
  };

  orderedVotesWithColors = () => {
    const { orderedVotes } = this.props;
    const orderVotesWithColor = orderedVotes.map(province => {
      let obj = null;
      switch (province.candidate) {
        case "trump":
          obj = { ...province, color: $republican_color };
          break;
        case "hillary":
          obj = { ...province, color: $democratic_color };
          break;
        case "johnson":
          obj = { ...province, color: "#d7c732" };
          break;
        default:
          console.log("undefined");
      }
      return obj;
    });
    return orderVotesWithColor;
  };

  electoralVotes = () => {
    const currentState = this.orderedVotesWithColors().find(obj => {
      return obj.province === this.state.province;
    });
    return currentState ? currentState.electoral_vote : 0;
  };

  render() {
    const { actualOrHype, electionData } = this.props;
    const total = electionData[54];
    return (
      <Fragment>
        <div className="results">
          <div className="box">
            <img src="/clinton.jpg" alt="" />
            <div className="stats">
              <span className="candidate">Hillary Clinton </span>
              <span>
                <span className="total">
                  {total[`hillary_${actualOrHype}`]}
                </span>
                <span className="vote_label">Electoral votes</span>
              </span>
            </div>
          </div>
          <div className="box">
            <div className="stats">
              <span className="candidate right_align">Donald Trump</span>
              <span>
                <span className="vote_label">Electoral votes</span>
                <span className="total">{total[`trump_${actualOrHype}`]}</span>
              </span>
            </div>
            <img src="/trump.jpg" alt="" />
          </div>
          <div className="box">
            <div className="stats">
              <span className="candidate right_align">Gary Johnson</span>
              <span>
                <span className="vote_label">Electoral votes</span>
                <span className="total">
                  {total[`johnson_${actualOrHype}`]}
                </span>
              </span>
            </div>
            <img src="/johnson.jpg" alt="" />
          </div>
        </div>
        <ReactTooltip place="top" type="dark" effect="solid" delayShow={10}>
          <div className="province_container">
            <span className="province">{this.state.province}</span>
            <span className="votes">
              {`Electoral votes ${this.electoralVotes()}`}
            </span>
          </div>
        </ReactTooltip>
        <ol className="votes_bar">
          {this.orderedVotesWithColors().map((obj, i) => {
            const { province, candidate, electoral_vote, color } = obj;
            return (
              <li
                key={i}
                data-tip
                className={`tick ${
                  `${candidate}${province}` === `${this.state.province_id}`
                    ? this.state.hoverBar
                    : ""
                }`}
                style={{
                  flexGrow: `${electoral_vote}`,
                  background: `${color}`
                }}
                onMouseEnter={() => {
                  this.handleHoverBar(province, candidate, "hovered");
                }}
                onMouseLeave={() => {
                  this.handleHoverBar("", "");
                }}
              />
            );
          })}
        </ol>
      </Fragment>
    );
  }
}

Bar.defaultProps = {
  electionData: []
};

Bar.propTypes = {
  electionData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  orderedVotes: PropTypes.array,
  actualOrHype: PropTypes.string
};

export default Bar;
