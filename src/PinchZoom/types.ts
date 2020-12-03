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

export type ScaleToOptions = {
  x: number;
  y: number;
  scale: number;
  animated?: boolean;
  duration?: number;
};

export type DefaultProps = {
  shouldInterceptWheel: (e: WheelEvent) => boolean;
  containerProps: React.HTMLAttributes<HTMLDivElement>;
  animationDuration: number;
  wheelScaleFactor: number;
  draggableUnZoomed: boolean;
  inertia: boolean;
  inertiaFriction: number;
  enabled: boolean;
  horizontalPadding: number;
  lockDragAxis: boolean;

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
  isTouch: () => boolean;

  _document: Document;
};

export type RequiredProps = {
  onUpdate: (updateAction: UpdateAction) => void;
  children: JSX.Element;
};
