import * as React from "react";
import { make2dTransformValue, make3dTransformValue } from "../index";

it("should return transform 2d value", () => {
  const [x, y, scale] = [100, 150, 2];

  expect(make2dTransformValue({ x, y, scale })).toBe(
    "scale(2) translate(100px, 150px)"
  );
});

it("should return transform 3d value", () => {
  const [x, y, scale] = [100, 150, 2];

  expect(make3dTransformValue({ x, y, scale })).toBe(
    "scale3d(2,2, 1) translate3d(100px, 150px, 0)"
  );
});
