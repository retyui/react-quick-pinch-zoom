import React, { Component, createRef } from "react";

import QuickPinchZoom from "react-quick-pinch-zoom";

class App extends Component {
  imgRef = createRef();

  onUpdate = ({ x, y, scale }) => {
    const { current: img } = this.imgRef;

    if (img) {
      img.style.setProperty(
        "transform",
        `scale3d(${scale}, ${scale}, 1) translate3d(${x}px, ${y}px, 0)`
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Demo react-quick-pinch-zoom</h1>
        <p>
          To change the zoom on the desktop, <b>Ctrl + scroll</b>
        </p>
        <QuickPinchZoom onUpdate={this.onUpdate}>
          <img
            ref={this.imgRef}
            src="https://user-images.githubusercontent.com/4661784/56037265-88219f00-5d37-11e9-95ef-9cb24be0190e.png"
          />
        </QuickPinchZoom>
      </div>
    );
  }
}

export default App;
