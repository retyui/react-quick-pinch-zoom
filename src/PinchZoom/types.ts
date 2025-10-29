import type { ReactElement, HTMLAttributes } from 'react';

export interface UpdateAction {
  x: number;
  y: number;
  scale: number;
}

export interface AnimateOptions {
  timeFn?: (x: number) => number;
  callback?: () => void;
  duration?: number;
}

export interface ScaleToOptions {
  x: number;
  y: number;
  scale: number;
  animated?: boolean;
  duration?: number;
}

export interface OffsetBoundsOptions {
  childDimension: number;
  containerDimension: number;
  padding: number;
  centerContained?: boolean;
}

export interface DefaultProps {
  shouldInterceptWheel: (e: WheelEvent) => boolean;
  shouldCancelHandledTouchEndEvents: boolean;
  containerProps: HTMLAttributes<HTMLDivElement>;
  animationDuration: number;
  wheelScaleFactor: number;
  draggableUnZoomed: boolean;
  enforceBoundsDuringZoom: boolean;
  centerContained: boolean;
  inertia: boolean;
  inertiaFriction: number;
  enabled: boolean;
  horizontalPadding: number;
  lockDragAxis: boolean;
  nonce?: string;

  maxZoom: number;
  minZoom: number;
  onDoubleTap: () => void;
  onDragEnd: () => void;
  onDragStart: () => void;
  onDragUpdate: () => void;
  onZoomEnd: () => void;
  onZoomStart: () => void;
  onZoomUpdate: () => void;
  setOffsetsOnce: boolean;
  tapZoomFactor: number;
  verticalPadding: number;
  zoomOutFactor: number;
  doubleTapZoomOutOnMaxScale: boolean;
  doubleTapToggleZoom: boolean;
  isTouch: () => boolean;

  _document: Document;
}

export interface RequiredProps {
  onUpdate: (updateAction: UpdateAction) => void;
  children: ReactElement;
}

export interface Props extends DefaultProps, RequiredProps {
  //
}
