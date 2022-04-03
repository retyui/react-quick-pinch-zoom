import { UpdateAction } from './PinchZoom/types';

const isSsr = typeof window === 'undefined';

export const isTouch = () =>
  !isSsr && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const make2dTransformValue = ({ x, y, scale }: UpdateAction) =>
  `scale(${scale}) translate(${x}px, ${y}px)`;

export const make3dTransformValue = ({ x, y, scale }: UpdateAction) =>
  `scale3d(${scale},${scale}, 1) translate3d(${x}px, ${y}px, 0)`;

export const hasTranslate3DSupport = () => {
  const css = !isSsr && window.CSS;

  return css && css.supports && css.supports('transform', 'translate3d(0,0,0)');
};
