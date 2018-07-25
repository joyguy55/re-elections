import React, { Component } from "react";
import { feature } from "topojson-client";
import "./Section.scss";
import { selectBar } from "../utils/bars";

import Bar from "../components/Bar";
import USMap from "../components/USMap";
import Switch from "../components/Switch";
// TODO add previous years
// import Select from "../components/Select";

class Section extends Component {
  constructor() {
    super();
    this.state = {
      usData: [],
      mapType: "createMapActualResult",
      actualOrHype: "actual",
      loading: true,
      switchLabel: "Winner take all"
    };
  }

  componentDidMount() {
    fetch("/us.json").then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then(usData => {
        this.setState({
          loading: false,
          usData: feature(usData, usData.objects.states).features
        });
      });
    });
  }

  electionResultSwitch = () => {
    const mapType =
      "createMapActualResult" === this.state.mapType
        ? "createMapHypetheticalResult"
        : "createMapActualResult";
    const actualOrHype =
      "actual" === this.state.actualOrHype ? "hype" : "actual";
    const switchLabel =
      "Winner take all" === this.state.switchLabel
        ? "Split Vote"
        : "Winner take all";
    this.setState({
      mapType,
      actualOrHype,
      switchLabel
    });
  };

  render() {
    const { electionData } = this.props;
    const { loading, mapType, actualOrHype, switchLabel } = this.state;
    const selectedElectoralBar = selectBar(electionData, actualOrHype)();

    return (
      <div className="inner_container">
        <div className="header">
          <h1>
            What would presidential elections look like if electoral votes were
            split by each states popular vote?
          </h1>
        </div>
        <hr />
        {loading ? (
          <span>Is loading...</span>
        ) : (
          <Bar
            electionData={electionData}
            orderedVotes={selectedElectoralBar}
            actualOrHype={actualOrHype}
          />
        )}
        <div className="options_container">
          {/* <Select options={["2016", "2012", "2008"]} /> */}
          <Switch
            side_label={switchLabel}
            handleSwitch={this.electionResultSwitch}
          />
        </div>
        <USMap
          electionData={electionData}
          mapType={mapType}
          usData={this.state.usData}
          actualOrHype={actualOrHype}
        />
      </div>
    );
  }
}

export default Section;
