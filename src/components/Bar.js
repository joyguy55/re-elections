import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Bar.scss";

const Bar = props => {
  const orderedVotes = () => {
    const hypetheticalValuesHillary = props.electionData.reduce((acc, obj) => {
      return acc.concat([
        {
          state: obj.STATE,
          ev: obj.Hillary_Hype,
          candidate: "Hillary"
        }
      ]);
    }, []);
    let hypetheticalValuesTrump = props.electionData.reduce((acc, obj) => {
      return acc.concat([
        {
          state: obj.STATE,
          ev: obj.Trump_Hype,
          candidate: "Trump"
        }
      ]);
    }, []);
    let hypetheticalValuesJohnson = props.electionData.reduce((acc, obj) => {
      return acc.concat([
        {
          state: obj.STATE,
          ev: obj.Johnson_Hype,
          candidate: "Johnson"
        }
      ]);
    }, []);

    const filteredList = [
      ...hypetheticalValuesHillary,
      ...hypetheticalValuesTrump,
      ...hypetheticalValuesJohnson
    ].filter(obj => {
      if (obj.ev === 0) {
        return false;
      } else if (obj.state !== "Totals") {
        return true;
      }
      return false;
    });

    return filteredList;
  };

  const orderedVotesWithColors = () => {
    const orderVotesWithColor = orderedVotes().map(state => {
      let obj = null;
      switch (state.candidate) {
        case "Trump":
          obj = { ...state, color: "#d74c32" };
          break;
        case "Hillary":
          obj = { ...state, color: "#3c459f" };
          break;
        case "Johnson":
          obj = { ...state, color: "#d7c732" };
          break;
        default:
          console.log("undefined");
      }
      return obj;
    });
    return orderVotesWithColor;
  };
  return (
    <Fragment>
      <ol className="votes_bar">
        {orderedVotesWithColors().map((state, i) => {
          return (
            <li
              key={i}
              className="tick"
              style={{ flexGrow: `${state.ev}`, background: `${state.color}` }}
            />
          );
        })}
      </ol>
      <div className="results">
        <div className="box">
          <img src="/clinton.jpg" />
          <div className="stats">
            <span>Hillary Clinton </span>
            <span>{props.electionData[54].Hillary_Hype}</span>
          </div>
        </div>
        <div className="box">
          <div className="stats ">
            <span>Donald Trump </span>
            <span className="float_right">
              {props.electionData[54].Trump_Hype}
            </span>
          </div>
          <img src="/trump.jpg" />
        </div>
      </div>
    </Fragment>
  );
};

Bar.defaultProps = {
  electionData: []
};

Bar.propTypes = {
  electionData: PropTypes.array
};

export default Bar;
