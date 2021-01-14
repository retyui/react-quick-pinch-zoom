import React, { createRef } from 'react';
import PinchZoom from '../PinchZoom/component';

export const test1 = (
  <PinchZoom
    onUpdate={(a) => {
      const s: number = a.scale;
      const x: number = a.x;
      const y: number = a.y;

      // @ts-expect-error: string is not a number
      const s2: string = a.scale;
      // @ts-expect-error: string is not a number
      const x2: string = a.x;
      // @ts-expect-error: string is not a number
      const y2: string = a.y;

      return { s, x, y, s2, x2, y2 };
    }}
  >
    <img />
  </PinchZoom>
);

const ref = createRef<PinchZoom>();

ref?.current?.alignCenter({
  scale: 1,
  x: 0,
  y: 0,
});

ref?.current?.alignCenter({
  // @ts-expect-error: string is not a number
  scale: '1',
  x: 0,
  y: 0,
});

ref?.current?.scaleTo({
  scale: 1,
  x: 0,
  y: 0,
});

ref?.current?.scaleTo({
  // @ts-expect-error: string is not a number
  scale: '1',
  x: 0,
  y: 0,
});
