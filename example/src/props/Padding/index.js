import React, { Component, Fragment } from "react";

import Base from "../../components/Base";
import SvgGrid from "../../components/SvgGrid";

const min = Math.min(window.innerWidth, window.innerHeight);
const width = min;
const height = min;
const cellSize = 100;

const containerProps = {
  className: "border-container display-inline-block reset-line-height"
};

export default class Padding extends Component {
  renderChild = ({ innerRef, ...props }) => (
    <SvgGrid
      ref={innerRef}
      {...props}
      {...{
        width,
        height,
        cellSize
      }}
      cols={width / cellSize}
      rows={height / cellSize}
      viewBox={`0 0 ${width} ${height}`}
    />
  );

  render() {
    return (
      <Fragment>
        <p>Try drag to understand how it works:</p>
        <pre>
          {`<QuickPinchZoom
  verticalPadding={100}
  horizontalPadding={50}
/>`}
        </pre>
        <Base
          verticalPadding={100}
          horizontalPadding={50}
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />
      </Fragment>
    );
  }
}
