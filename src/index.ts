import PinchZoomComp from './PinchZoom/component';
import { DefaultProps, RequiredProps } from './PinchZoom/types';

export default PinchZoomComp;

export {
  hasTranslate3DSupport,
  make2dTransformValue,
  make3dTransformValue,
  isTouch,
} from './utils';

export type { UpdateAction, ScaleToOptions } from './PinchZoom/types';

export interface PinchZoomProps extends RequiredProps, Partial<DefaultProps> {
  //
}
