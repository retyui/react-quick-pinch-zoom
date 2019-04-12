// @flow
import type { Point } from "./types";

export const cancelEvent = (event: any): void => {
  event.stopPropagation();
  event.preventDefault();
};

export const getDistance = (a: Point, b: Point): number => {
  const x = a.x - b.x;
  const y = a.y - b.y;

  return Math.sqrt(x * x + y * y);
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

export const sum = (a: number, b: number): number => a + b;

export const getVectorAvg = (vectors: Array<Point>): Point => ({
  x: vectors.map(({ x }) => x).reduce(sum, 0) / vectors.length,
  y: vectors.map(({ y }) => y).reduce(sum, 0) / vectors.length
});

export const clamp = (min: number, max: number, value: number): number =>
  value < min ? min : value > max ? max : value;

export const { abs, max, min } = Math;

export const noup = () => {};

export const isTouch = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

export const shouldInterceptWheel = (event: WheelEvent): boolean =>
  !(event.ctrlKey || event.metaKey);
