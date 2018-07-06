import React, { Component } from "react";
import { chevronLeft, chevronRight } from "../utils/svg";
import { feature } from "topojson-client";
import "./Section.scss";

import content from "../utils/content.js";

import Bar from "../components/Bar";
import USMap from "../components/USMap";
import Content from "../components/Content";

class Section extends Component {
  constructor() {
    super();
    this.state = {
      usData: [],
      section: 0,
      loading: true
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

  setSection = next => {
    const { section } = this.state;
    if (next === "next" && section !== 4) {
      this.setState({
        section: section + 1
      });
    } else if (next === "back" && section !== 0) {
      this.setState({
        section: section - 1
      });
    }
  };

  render() {
    const { electionData } = this.props;
    const { section, loading } = this.state;
    return (
      <div className="inner_container">
        <div>
          {loading ? (
            <span>Is loading...</span>
          ) : (
            <Bar electionData={electionData} />
          )}
          <USMap
            electionData={electionData}
            map={content[section].map}
            usData={this.state.usData}
          />
        </div>
        <div>
          {chevronLeft(() => {
            this.setSection("back");
          })}
          {chevronRight(() => {
            this.setSection("next");
          })}
          <Content content={content[section]} />
        </div>
      </div>
    );
  }
}

export default Section;
