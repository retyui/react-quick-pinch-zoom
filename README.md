# react-quick-pinch-zoom

[![NPM](https://img.shields.io/npm/v/react-quick-pinch-zoom.svg)](https://www.npmjs.com/package/react-quick-pinch-zoom)

Based on this module [manuelstofer/pinchzoom](https://github.com/manuelstofer/pinchzoom)

### Component features:

- 🔮 Simple. Easy to use;
- 🍎 Works on both iOS and Android and with MouseEvents;
- ⚡ Fast, 60FPS on mobile devices

## Install

```bash
yarn add react-quick-pinch-zoom
```

## Usage

```jsx
import React, { Component, createRef } from "react";

import QuickPinchZoom from "react-quick-pinch-zoom";

class App extends Component {
  imgRef = createRef();

  onUpdate = ({ x, y, scale }) => {
    const { current: img } = this.imgRef;

    img.style.setProperty(
      "transform",
      `scale3d(${scale}, ${scale}, 1) translate3d(${x}px, ${y}px, 0)`
    );
  };

  render() {
    return (
      <QuickPinchZoom onUpdate={this.onUpdate}>
        <img
          ref={this.imgRef}
          src="https://user-images.githubusercontent.com/4661784/56037265-88219f00-5d37-11e9-95ef-9cb24be0190e.png"
        />
      </QuickPinchZoom>
    );
  }
}
```

## License

MIT © [retyui](https://github.com/retyui)
