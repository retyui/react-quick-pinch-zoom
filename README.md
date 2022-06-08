# react-quick-pinch-zoom

[![react-quick-pinch-zoom on npm](https://img.shields.io/npm/v/react-quick-pinch-zoom.svg)](https://www.npmjs.com/package/react-quick-pinch-zoom)
[![npm downloads](https://img.shields.io/npm/dm/react-quick-pinch-zoom.svg)](https://www.npmtrends.com/react-quick-pinch-zoom)
[![react-quick-pinch-zoom bundle size](https://badgen.net/bundlephobia/minzip/react-quick-pinch-zoom)](https://bundlephobia.com/result?p=react-quick-pinch-zoom)
[![Code quality](https://github.com/retyui/react-quick-pinch-zoom/actions/workflows/nodejs.yml/badge.svg)](https://github.com/retyui/react-quick-pinch-zoom/actions/workflows/nodejs.yml)

A react component that lets you zooming and dragging on any DOM element using multi-touch gestures on mobile devices
and mouse-events\wheel on desktop devices.
Based on this module [manuelstofer/pinchzoom](https://github.com/manuelstofer/pinchzoom)

### Component features:

- 🔮 Simple. Easy to use;
- 🍎 It works with mobile touch gestures and desktop mouse events;
- ⚡ Fast, 60 FPS on mobile devices.

## Links

- [API documentation](docs/api/README.md)
- [Web demos](https://react-quick-pinch-zoom.netlify.com/)

## Install

```bash
npm i --save react-quick-pinch-zoom
```
or 
```bash
yarn add react-quick-pinch-zoom
```

## Screenshots

[![](https://github.com/retyui/react-quick-pinch-zoom/blob/master/docs/img/demo.gif?raw=true)](https://media.giphy.com/media/ggJk8Rmysy6TcKJj5K/giphy.mp4)

[Video...](https://media.giphy.com/media/ggJk8Rmysy6TcKJj5K/giphy.mp4)

## Usage

```jsx harmony
import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

const IMG_URL =
  "https://user-images.githubusercontent.com/4661784/" +
  "56037265-88219f00-5d37-11e9-95ef-9cb24be0190e.png";

export const App = () => {
  const imgRef = useRef();
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty("transform", value);
    }
  }, []);

  return (
    <QuickPinchZoom onUpdate={onUpdate}>
      <img ref={imgRef} src={IMG_URL} />
    </QuickPinchZoom>
  );
};
```

## License

MIT © [retyui](https://github.com/retyui)
