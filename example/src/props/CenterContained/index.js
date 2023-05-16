import React, { Component, Fragment } from "react";

import Base from "../../components/Base";
import SvgGrid from "../../components/SvgGrid";

const min = Math.min(window.innerWidth, window.innerHeight);
const width = min;
const height = min;
const cellSize = 100;

const containerProps = {
  style: {height: '80vh'},
  className: "border-container display-inline-block reset-line-height"
};

export default class CenterContained extends Component {
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
        <p>Do not allow moving child out of center when it does not cover the container.</p>
        <pre>{`<QuickPinchZoom centerContained />`}</pre>
        <Base
          centerContained
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />

        <p>Works best in combination with enforceBoundsDuringZoom to make
          sure the child stays centered during zoom.</p>
        <pre>
          {`<QuickPinchZoom \n  centerContained enforceBoundsDuringZoom />`}
        </pre>
        <Base
          centerContained
          enforceBoundsDuringZoom
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />
      </Fragment>
    );
  }
}
