# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 5.0.0

- Fix: inconsistent zooms in different screen-sizes. [#75](https://github.com/retyui/react-quick-pinch-zoom/pull/82) (thanks [Blindman139](https://github.com/Blindman139))


## 4.9.0

- Declare `tslib` as `dependencies` instead of `peerDependencies`. [#75](https://github.com/retyui/react-quick-pinch-zoom/pull/75) (thanks [Tim Fischbach](https://github.com/tf))

## 4.8.0

- Added [`centerContained: boolean`](https://github.com/retyui/react-quick-pinch-zoom/blob/master/docs/api/README.md#enforceboundsduringzoom-boolean) to allow ensuring that images remain centered as long as they still fit into the container. [#73](https://github.com/retyui/react-quick-pinch-zoom/pull/73) (thanks [Tim Fischbach](https://github.com/tf))

## 4.7.0

- Added [`enforceBoundsDuringZoom: boolean`](https://github.com/retyui/react-quick-pinch-zoom/blob/master/docs/api/README.md#enforceboundsduringzoom-boolean) prop to ensures that it's also not possible to move the image out of bounds with a pinch gesture. [#72](https://github.com/retyui/react-quick-pinch-zoom/pull/72) (thanks [Tim Fischbach](https://github.com/tf))
- Added [`doubleTapZoomOutOnMaxScale: boolean`](https://github.com/retyui/react-quick-pinch-zoom/blob/master/docs/api/README.md#doubletapzoomoutonmaxscale-boolean) & [`doubleTapToggleZoom?: boolean`](https://github.com/retyui/react-quick-pinch-zoom/blob/master/docs/api/README.md#doubletaptogglezoom-boolean) props to let the second of two consecutive double taps zoom out again. [#70](https://github.com/retyui/react-quick-pinch-zoom/pull/70) (thanks [Tim Fischbach](https://github.com/tf))

## 4.6.0

- Added zoom out on double tap `doubleTapZoomOutOnMaxScale: boolean` [#64](https://github.com/retyui/react-quick-pinch-zoom/pull/64) (thanks [Maximuson](https://github.com/Maximuson))

## 4.5.0

- Added a 5-pixel tolerance to the drag event in order to allow clicking [#57](https://github.com/retyui/react-quick-pinch-zoom/pull/57) (thanks [bradcerasani](https://github.com/bradcerasani))

## 4.4.0

- Added possibility to use this module inside an image slider with own touch support   [#51](https://github.com/retyui/react-quick-pinch-zoom/issues/51) (thanks [martinkutter](https://github.com/martinkutter))

  To enabled it, just add `shouldCancelHandledTouchEndEvents={true}`

## 4.3.0

- Fix SSR issue [#49](https://github.com/retyui/react-quick-pinch-zoom/pull/49) (thanks [bradcerasani](https://github.com/bradcerasani))

## 4.2.0

- Mark all `peerDependencies` as optional

## 4.1.0

- Allow disabling double tap [#46](https://github.com/retyui/react-quick-pinch-zoom/pull/46) (thanks [matt-tingen](https://github.com/matt-tingen))
- Export public API types [#45](https://github.com/retyui/react-quick-pinch-zoom/pull/45) (thanks [matt-tingen](https://github.com/matt-tingen))

## 4.0.2

- Fixed typescript types [#36](https://github.com/retyui/react-quick-pinch-zoom/issues/36)

## 4.0.0

- Added support SSR [#30](https://github.com/retyui/react-quick-pinch-zoom/pull/30) (thanks [nicolas-cusan](https://github.com/nicolas-cusan))

## 3.0.0

- Add typescript definitions
- Reduce package size
- Remove `classnames`
- Remove css loader

## 2.0.11

Add support inertia [#1](https://github.com/retyui/react-quick-pinch-zoom/pull/1)

## 2.0.0

Initial version
