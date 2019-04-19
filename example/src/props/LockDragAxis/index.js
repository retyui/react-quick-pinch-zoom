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

export default class LockDragAxis extends Component {
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
        <p>Try change zoom and then drag to understand how it works:</p>
        <pre>{`<QuickPinchZoom lockDragAxis />`}</pre>
        <Base
          lockDragAxis
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />
      </Fragment>
    );
  }
}
