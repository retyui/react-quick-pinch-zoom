import React, { Component, createRef, forwardRef } from "react";

import QuickPinchZoom, {
  make2dTransformValue,
  make3dTransformValue,
  hasTranslate3DSupport
} from "react-quick-pinch-zoom";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const use3DTransform = hasTranslate3DSupport() && !isSafari;

const makeTransformValue = use3DTransform
  ? make3dTransformValue
  : make2dTransformValue;

class Base extends Component {
  innerRef = createRef();

  onUpdate = ({ x, y, scale }) => {
    const { current: div } = this.innerRef;

    if (div) {
      const value = makeTransformValue({ x, y, scale });

      div.style.setProperty("transform", value);
    }
  };

  toggleWillChange = () => {
    const { current: div } = this.innerRef;

    if (div) {
      requestAnimationFrame(() => {
        div.style.setProperty("will-change", "auto");

        requestAnimationFrame(() => {
          div.style.setProperty("will-change", "transform");
        });
      });
    }
  };

  render() {
    const { Child, quickPinchZoomRef, ...props } = this.props;

    return (
      <QuickPinchZoom
        {...props}
        ref={quickPinchZoomRef}
        onZoomEnd={this.toggleWillChange}
        onDragEnd={this.toggleWillChange}
        onUpdate={this.onUpdate}
      >
        <Child innerRef={this.innerRef} />
      </QuickPinchZoom>
    );
  }
}

export default forwardRef((props, ref) => (
  <Base {...props} quickPinchZoomRef={ref} />
));
