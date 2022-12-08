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

export default class TapZoomFactor extends Component {
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
        <p>Double tap or click to elements</p>

        <pre>{`<QuickPinchZoom tapZoomFactor={0.5} />`}</pre>
        <Base
          tapZoomFactor={0.5}
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />

        <pre>{`<QuickPinchZoom tapZoomFactor={2} />`}</pre>
        <Base
          tapZoomFactor={2}
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />

        <pre>{`<QuickPinchZoom tapZoomFactor={2} maxZoom={2} doubleTapZoomOutOnMaxScale={true} />`}</pre>
        <Base
          tapZoomFactor={2}
          maxZoom={2}
          doubleTapZoomOutOnMaxScale={true}
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />
      </Fragment>
    );
  }
}
