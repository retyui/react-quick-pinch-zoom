// @flow

import type { Element } from "react";

export type UpdateAction = { x: number, y: number, scale: number };

export type Props = $ReadOnly<{|
  shouldInterceptWheel: (e: WheelEvent) => boolean,
  children: Element<any>,
  containerProps: {},
  animationDuration: number,
  wheelScaleFactor: number,
  draggableUnZoomed: boolean,
  enabled: boolean,
  horizontalPadding: number,
  lockDragAxis: boolean,
  onUpdate: UpdateAction => void,
  maxZoom: number,
  minZoom: number,
  onDoubleTap: () => void,
  onDragEnd: () => void,
  onDragStart: () => void,
  onDragUpdate: () => void,
  onZoomEnd: () => void,
  onZoomStart: () => void,
  onZoomUpdate: () => void,
  setOffsetsOnce: boolean,
  tapZoomFactor: number,
  verticalPadding: number,
  zoomOutFactor: number,
  isTouch: () => boolean,
  _html: any,
  _body: any
|}>;
