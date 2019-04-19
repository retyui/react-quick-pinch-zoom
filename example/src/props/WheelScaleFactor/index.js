import React, { Component, Fragment } from "react";

import Base from "../../components/Base";
import SvgGrid from "../../components/SvgGrid";

const min = Math.min(window.innerWidth, window.innerHeight);
const width = Math.min(min, 500);
const height = Math.min(min, 500);
const cellSize = 100;

const containerProps = {
  className: "border-container display-inline-block reset-line-height"
};

export default class WheelScaleFactor extends Component {
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
        <p>
          In desktop browser press <code>Ctrl\Cmd</code> and scroll:
        </p>

        <pre>{`// Scale change faster
<QuickPinchZoom wheelScaleFactor={500} />`}</pre>
        <Base
          wheelScaleFactor={500}
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />

        <pre>{`// Scale change slower
<QuickPinchZoom wheelScaleFactor={3000} />`}</pre>
        <Base
          wheelScaleFactor={3000}
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />
      </Fragment>
    );
  }
}
