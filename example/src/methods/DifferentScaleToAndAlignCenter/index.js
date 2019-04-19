import React, { Component, Fragment, createRef } from "react";

import Base from "../../components/Base";
import SvgGrid from "../../components/SvgGrid";

const min = Math.min(window.innerWidth, window.innerHeight);

const width = min;
const height = min;
const cellSize = 100;

const containerProps = {
  className: "border-container display-inline-block reset-line-height"
};

export default class Methods extends Component {
  state = {
    scaleFlag: true,
    alignFlag: true
  };

  quickPinchZoomRef = createRef();

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

  reset = () => {
    this.quickPinchZoomRef.current.scaleTo({ x: 0, y: 0, scale: 1 });
  };

  scaleTo = () => {
    this.setState(
      ({ scaleFlag }) => ({ scaleFlag: !scaleFlag }),
      () => {
        this.quickPinchZoomRef.current.scaleTo({
          x: 200,
          y: 100,
          scale: this.state.scaleFlag ? 1 : 3
        });
      }
    );
  };

  alignCenter = () => {
    this.setState(
      ({ alignFlag }) => ({ alignFlag: !alignFlag }),
      () => {
        this.quickPinchZoomRef.current.alignCenter({
          x: 200,
          y: 100,
          scale: this.state.alignFlag ? 1 : 3
        });
      }
    );
  };

  renderControls() {
    return (
      <div>
        <button onClick={this.reset}>{`Reset`}</button>
        <button onClick={this.scaleTo}>{`scaleTo({x: 200,y: 100, scale: ${
          this.state.scaleFlag ? 3 : 1
        })`}</button>
        <button
          onClick={this.alignCenter}
        >{`alignCenter({x: 200,y: 100, scale: ${
          this.state.alignFlag ? 3 : 1
        })`}</button>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderControls()}
        <Base
          containerProps={containerProps}
          ref={this.quickPinchZoomRef}
          Child={this.renderChild}
        />
      </Fragment>
    );
  }
}
