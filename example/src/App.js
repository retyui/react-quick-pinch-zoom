import React, { Component, createRef } from "react";

import QuickPinchZoom, {
  make2dTransformValue,
  make3dTransformValue,
  hasTranslate3DSupport
} from "react-quick-pinch-zoom";

const isSafari = /^((?!chrome|android).)*safari/i.test(
  window.navigator.userAgent
);

const use3DTransform = hasTranslate3DSupport() && !isSafari;

const makeTransformValue = use3DTransform
  ? make3dTransformValue
  : make2dTransformValue;

class App extends Component {
  innnerRef = createRef();

  onUpdate = ({ x, y, scale }) => {
    const { current: div } = this.innnerRef;

    if (div) {
      div.style.setProperty(
        "transform",
        makeTransformValue({ x, y, scale }, use3DTransform)
      );
    }
  };

  toggleWillChange = () => {
    const { current: div } = this.innnerRef;

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
    return (
      <div>
        <h1>Demo react-quick-pinch-zoom</h1>
        <p>
          To change the zoom on the desktop, <b>Ctrl + scroll</b>
        </p>
        <QuickPinchZoom
          onZoomEnd={this.toggleWillChange}
          onDragEnd={this.toggleWillChange}
          onUpdate={this.onUpdate}
        >
          <div ref={this.innnerRef}>
            <h2>Text test</h2>
            <p>And image</p>
            <img src="https://user-images.githubusercontent.com/4661784/56037265-88219f00-5d37-11e9-95ef-9cb24be0190e.png" />
          </div>
        </QuickPinchZoom>
      </div>
    );
  }
}

export default App;
