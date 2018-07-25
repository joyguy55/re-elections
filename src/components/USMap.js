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
    const { mapType, usData, electionData } = this.props;
    const { node, handleToolTip, closeToolTip } = this;
    const mapFunction = selectMap(mapType);
    mapFunction(usData, electionData, node, handleToolTip, closeToolTip);
  }

  componentDidUpdate() {
    const { mapType, usData, electionData } = this.props;
    const { node, handleToolTip, closeToolTip } = this;
    const mapFunction = selectMap(mapType);
    mapFunction(usData, electionData, node, handleToolTip, closeToolTip);
  }

  handleBlur = () => {
    console.log("blurHandled");
    this.setState({ toolTipIsOpen: false });
  };

  closeToolTip = () => {
    this.setState({
      toolTipIsOpen: false
    });
  };

  handleToolTip = state => {
    const selectedState = this.props.electionData.find(data => {
      return data.state_geo_json_id === parseInt(state.id, 0);
    });
    this.setState({
      top: d3.event.pageY - 220,
      left: d3.event.pageX > 700 ? d3.event.pageX - 513 : d3.event.pageX + 25,
      toolTipIsOpen: true,
      stateId: state.id,
      selectedState
    });
  };

  render() {
    const { toolTipIsOpen, top, left, selectedState } = this.state;
    const { actualOrHype } = this.props;
    return (
      <Fragment>
        <svg
          id="map"
          ref={node => {
            this.node = node;
          }}
          width="100%"
          height="650px"
          viewBox="225 50 500 500"
        />
        {toolTipIsOpen ? (
          <ToolTip
            handleBlur={this.handleBlur}
            top={top}
            left={left}
            selectedState={selectedState}
            closeToolTip={this.closeToolTip}
            actualOrHype={actualOrHype}
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
  usData: PropTypes.array,
  mapType: PropTypes.string,
  actualOrHype: PropTypes.string
};

export default USMap;
