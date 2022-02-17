import type PinchZoomComp from './PinchZoom/component';

export { default } from './PinchZoom/component';
export {
  hasTranslate3DSupport,
  make2dTransformValue,
  make3dTransformValue,
  isTouch,
} from './utils';

export type { UpdateAction, ScaleToOptions } from './PinchZoom/types';

export type PinchZoomProps = JSX.LibraryManagedAttributes<
  typeof PinchZoomComp,
  React.ComponentProps<typeof PinchZoomComp>
>;
