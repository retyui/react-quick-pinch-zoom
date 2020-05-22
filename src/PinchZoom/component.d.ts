import * as React from "react";
import { DefaultProps, RequiredProps, ScaleToOptions } from "./types";

declare class PinchZoom extends React.Component<
  RequiredProps & Partial<DefaultProps>
> {
  alignCenter(options: ScaleToOptions): void;
  scaleTo(options: ScaleToOptions): void;
}

export default PinchZoom;
