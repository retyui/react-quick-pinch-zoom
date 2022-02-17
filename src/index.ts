import { ComponentProps } from 'react';
import PinchZoomComp from './PinchZoom/component';

export default PinchZoomComp;

export {
  hasTranslate3DSupport,
  make2dTransformValue,
  make3dTransformValue,
  isTouch,
} from './utils';

export type { UpdateAction, ScaleToOptions } from './PinchZoom/types';

export type PinchZoomProps = JSX.LibraryManagedAttributes<
  typeof PinchZoomComp,
  ComponentProps<typeof PinchZoomComp>
>;
