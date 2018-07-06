import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { selectMap } from "../utils/maps";
import ToolTip from "./ToolTip";
import "./UsMap.scss";

class USMap extends Component {
  constructor() {
    super();
    this.state = {
      toolTipIsOpen: false,
      selectedState: {}
    };
  }

  componentDidMount() {
    const { map, usData, electionData } = this.props;
    const { node, handleToolTip } = this;
    const mapFunction = selectMap(map);
    mapFunction(usData, electionData, node, handleToolTip);
  }

  componentDidUpdate() {
    const { map, usData, electionData } = this.props;
    const { node, handleToolTip } = this;
    const mapFunction = selectMap(map);
    mapFunction(usData, electionData, node, handleToolTip);
  }

  handleBlur = () => {
    console.log("blurHandled");
    this.setState({ toolTipIsOpen: false });
  };

  handleToolTip = state => {
    const selectedState = this.props.electionData.find(data => {
      return data.State_GeoJson_ID === parseInt(state.id, 0);
    });
    this.setState({
      top: d3.event.pageY - 220,
      left: d3.event.pageX > 700 ? d3.event.pageX - 513 : d3.event.pageX + 25,
      toolTipIsOpen: true,
      stateId: state.id,
      selectedState
    });
  };

  closeToolTip = () => {
    this.setState({
      toolTipIsOpen: false
    });
  };

  render() {
    const { toolTipIsOpen, top, left, selectedState } = this.state;
    return (
      <Fragment>
        <svg
          id="map"
          ref={node => {
            this.node = node;
          }}
          width={625}
          height={450}
          viewBox="160 30 700 500"
        >
          <defs>
            <linearGradient
              id="svgGradient"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop
                class="start"
                offset="0%"
                stop-color="#d74c32"
                stop-opacity="1"
              />
              <stop
                class="end"
                offset="100%"
                stop-color="#3c459f"
                stop-opacity="1"
              />
            </linearGradient>
            <linearGradient
              id="svgGradientLight"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop
                class="start"
                offset="0%"
                stop-color="#F1664C"
                //stop-opacity="1"
              />
              <stop
                class="end"
                offset="100%"
                stop-color="#565FB9"
                //stop-opacity="1"
              />
            </linearGradient>
          </defs>
        </svg>
        {toolTipIsOpen ? (
          <ToolTip
            handleBlur={this.handleBlur}
            top={top}
            left={left}
            selectedState={selectedState}
            closeToolTip={this.closeToolTip}
          />
        ) : (
          <span />
        )}
      </Fragment>
    );
  }
}

USMap.propTypes = {
  electionData: PropTypes.array,
  usData: PropTypes.obj,
  map: PropTypes.string
};

export default USMap;
