import { OffsetBoundsOptions } from './types';

export function getOffsetBounds({
  containerDimension,
  childDimension,
  padding
}: OffsetBoundsOptions) {
  const max = childDimension - containerDimension + padding;

  const maxOffset = Math.max(max, 0);
  const minOffset = Math.min(max, 0) - padding;

  return [minOffset, maxOffset];
}
