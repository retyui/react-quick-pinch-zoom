<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [All available props](#all-available-props)
- [Configure](#configure)
  - [`children: React$Element`](#children-reactelement)
  - [`enabled: boolean`](#enabled-boolean)
  - [`isTouch?: () => boolean`](#istouch---boolean)
  - [`shouldInterceptWheel?: (WheelEvent) => boolean`](#shouldinterceptwheel-wheelevent--boolean)
  - [`wheelScaleFactor: number`](#wheelscalefactor-number)
  - [`tapZoomFactor?: number`](#tapzoomfactor-number)
  - [`zoomOutFactor?: number`](#zoomoutfactor-number)
  - [`animationDuration`](#animationduration)
  - [`maxZoom?: number`](#maxzoom-number)
  - [`minZoom?: number`](#minzoom-number)
  - [`draggableUnzoomed?: boolean`](#draggableunzoomed-boolean)
  - [`lockDragAxis?: boolean`](#lockdragaxis-boolean)
  - [`setOffsetsOnce?: boolean`](#setoffsetsonce-boolean)
  - [`verticalPadding?: number`](#verticalpadding-number)
  - [`horizontalPadding?: number`](#horizontalpadding-number)
- [Event](#event)
  - [`onUpdate({scale: number, x: number, y: number}): void`](#onupdatescale-number-x-number-y-number-void)
  - [`onZoomStart?: () => void`](#onzoomstart---void)
  - [`onZoomEnd?: () => void`](#onzoomend---void)
  - [`onZoomUpdate?: () => void`](#onzoomupdate---void)
  - [`onDragStart?: () => void`](#ondragstart---void)
  - [`onDragEnd?: () => void`](#ondragend---void)
  - [`onDragUpdate?: () => void`](#ondragupdate---void)
  - [`onDoubleTap?: () => void`](#ondoubletap---void)
- [Methods](#methods)
  - [`scaleTo(OptionsType)`](#scaletooptionstype)
  - [`alignCenter(OptionsType)`](#aligncenteroptionstype)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# All available props

Below are listed all available properties with their default values (\* except events of course)

```js
import QuickPinchZoom from "react-quick-pinch-zoom";

<QuickPinchZoom
  // `onUpdate` is one required prop
  onUpdate={({ scale, x, y }) => console.log(" --- onUpdate", { scale, x, y })}
  tapZoomFactor={1}
  zoomOutFactor={1.3}
  animationDuration={250}
  maxZoom={5}
  minZoom={0.5}
  draggableUnzoomed={true}
  lockDragAxis={false}
  setOffsetsOnce={false}
  verticalPadding={0}
  horizontalPadding={0}
  onZoomStart={() => console.log(" --- onZoomStart")}
  onZoomEnd={() => console.log(" --- onZoomEnd")}
  onZoomUpdate={() => console.log(" --- onZoomUpdate")}
  onDragStart={() => console.log(" --- onDragStart")}
  onDragEnd={() => console.log(" --- onDragEnd")}
  onDragUpdate={() => console.log(" --- onDragUpdate")}
  onDoubleTap={() => console.log(" --- onDoubleTap")}
/>;
```

# Configure

## `children: React$Element`

Children must has only one child (a React element)!

## `enabled: boolean`

Flag that let listen touch\mouse events. (default `true`)

## `isTouch?: () => boolean`

Function helper that detect support touch events.
When function return `true` component start listen touch events
otherwise mouse events and wheel.

```js
// default
const isTouch = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;
```

## `shouldInterceptWheel?: (WheelEvent) => boolean`

This function will called when `isTouch()` return `false` and user the user will scroll over the element.

By default component Intercept wheel event with holding `Crtl` or `Cmd`

```js
// default

const shouldInterceptWheel = event => !(event.ctrlKey || event.metaKey);
```

## `wheelScaleFactor: number`

This ratio indicate how fast the zoom will change when scrolling over the element.

(default `1500`)

## `tapZoomFactor?: number`

Zoom factor that will be added for current zoom Factor when a double tap zooms to.

(default `1`)

## `zoomOutFactor?: number`

Resize to original size when the zoom factor is below this value.

(default `1.3`)

## `animationDuration`

Animation duration in milliseconds. (default `250`)

## `maxZoom?: number`

Maximum zoom factor. (default `5`)

## `minZoom?: number`

Minimum zoom factor. (default `0.5`)

## `draggableUnzoomed?: boolean`

Capture drag events even when the image isn't zoomed.

(default `true`)

Using `false` allows other libs to pick up drag events

## `lockDragAxis?: boolean`

Lock panning of the element to a single axis.

(default `false`)

## `setOffsetsOnce?: boolean`

Compute offsets (image position inside container) only once.

(default `true`)

Using `true` maintains the offset on consecutive `load` and `resize`

## `verticalPadding?: number`

Vertical padding to apply around the passed DOM element. (default `0`)

## `horizontalPadding?: number`

Horizontal padding to apply around the passed DOM element. (default `0`)

# Event

## `onUpdate({scale: number, x: number, y: number}): void`

Required property.

It will be called when change scale or translate coordinates.

Update will be called no more than one render frame.

## `onZoomStart?: () => void`

Callback for zoom start event

## `onZoomEnd?: () => void`

Callback for zoom end event

## `onZoomUpdate?: () => void`

Callback for zoom update event

## `onDragStart?: () => void`

Callback for drag start event

## `onDragEnd?: () => void`

Callback for drag end event

## `onDragUpdate?: () => void`

Callback for drag update event

## `onDoubleTap?: () => void`

Callback for `doubletap` event on touch devise or `doubleclick` event on desktop

# Methods

```js
type OptionsType = {
  x: number,
  y: number,
  scale: number,
  animated?: boolean, // not required, default: `true`
  duration?: number // not required, default: `250`
};
```

`x`, `y` is the relative coordinates by a container

## `scaleTo(OptionsType)`

With this method, we can increase relative to any point

## `alignCenter(OptionsType)`

With this method we can align any point in the middle of the screen
