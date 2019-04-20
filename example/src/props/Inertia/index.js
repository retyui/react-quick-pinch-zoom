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

export default class Inertia extends Component {
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
        <p>Zoom and then drag to see difference</p>

        <pre>{`<QuickPinchZoom inertia={false} />`}</pre>
        <Base
          inertia={false}
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />

        <pre>{`<QuickPinchZoom inertia={true} inertiaFriction={0.96} />`}</pre>
        <Base
          inertia
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />

        <pre>{`<QuickPinchZoom inertia={true} inertiaFriction={0.8} />`}</pre>
        <Base
          inertia
          inertiaFriction={0.8}
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />
      </Fragment>
    );
  }
}
