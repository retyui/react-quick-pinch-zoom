// @flow
import type { UpdateAction } from "./PinchZoom/types.js";
import type { Point, Interaction } from "./types";

export const { abs, max, min, sqrt } = Math;

const isMac = /(Mac)/i.test(navigator.platform);

export const isDragInteraction = (i: ?Interaction): boolean => i === "drag";

export const isZoomInteraction = (i: ?Interaction): boolean => i === "zoom";

export const isZoomGesture = (wheelEvent: WheelEvent) =>
  isMac && wheelEvent.ctrlKey;

export const cancelEvent = (event: any): void => {
  event.stopPropagation();
  event.preventDefault();
};

const getDistance = (a: Point, b: Point): number => {
  const x = a.x - b.x;
  const y = a.y - b.y;

  return sqrt(x * x + y * y);
};

export const calculateScale = (
  startTouches: Array<Point>,
  endTouches: Array<Point>
): number => {
  const startDistance = getDistance(startTouches[0], startTouches[1]);
  const endDistance = getDistance(endTouches[0], endTouches[1]);

  return endDistance / startDistance;
};

export const isCloseTo = (value: number, expected: number) =>
  value > expected - 0.01 && value < expected + 0.01;

export const swing = (p: number): number => -Math.cos(p * Math.PI) / 2 + 0.5;

export const getPointByPageCoordinates = (touch: Touch): Point => ({
  x: touch.pageX,
  y: touch.pageY
});

export const getPageCoordinatesByTouches = (touches: TouchList): Array<Point> =>
  [...touches].map(getPointByPageCoordinates);

const sum = (a: number, b: number): number => a + b;

export const getVectorAvg = (vectors: Array<Point>): Point => ({
  x: vectors.map(({ x }) => x).reduce(sum, 0) / vectors.length,
  y: vectors.map(({ y }) => y).reduce(sum, 0) / vectors.length
});

export const clamp = (min: number, max: number, value: number): number =>
  value < min ? min : value > max ? max : value;

export const isTouch = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

export const shouldInterceptWheel = (event: WheelEvent): boolean =>
  !(event.ctrlKey || event.metaKey);

export const hasTranslate3DSupport = () => {
  const css = window.CSS;

  return css && css.supports && css.supports("transform", "translate3d(0,0,0)");
};

export const getElementSize = (
  element: any
): {| width: number, height: number |} => {
  if (element) {
    const { offsetWidth, offsetHeight } = element;

    // Any DOMElement
    if (offsetWidth && offsetHeight) {
      return { width: offsetWidth, height: offsetHeight };
    }

    // Svg support
    const style = getComputedStyle(element);
    const width = parseFloat(style.width);
    const height = parseFloat(style.height);

    if (height && width) {
      return { width, height };
    }
  }

  return { width: 0, height: 0 };
};

export const make2dTransformValue = ({ x, y, scale }: UpdateAction) =>
  `scale(${scale}) translate(${x}px, ${y}px)`;

export const make3dTransformValue = ({ x, y, scale }: UpdateAction) =>
  `scale3d(${scale},${scale}, 1) translate3d(${x}px, ${y}px, 0)`;
