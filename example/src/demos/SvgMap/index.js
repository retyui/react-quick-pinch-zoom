import React, { Component } from "react";

import Base from "../../components/Base";
import Map from "./Map";

const containerProps = {
  className: "border-container reset-line-height"
};

export default class SvgMap extends Component {
  renderChild = ({ innerRef, ...props }) => <Map ref={innerRef} {...props} />;

  render() {
    return <Base containerProps={containerProps} Child={this.renderChild} />;
  }
}
