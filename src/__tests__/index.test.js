import React from "react";
import { mount } from "enzyme/build";

import QuickPinchZoom from "../index";

const defaultProps = {
  onUpdate: () => {},
  children: <div />
};

const render = props => mount(<QuickPinchZoom {...defaultProps} {...props} />);

describe("QuickPinchZoom", () => {
  it("should render correctly", () => {
    const wrap = render({
      children: <div />
    });
  });

  it("should raises an error when children is not single react element", () => {
    expect(() => {
      render({
        children: null
      });
    }).toThrow();

    expect(() => {
      render({
        children: [<div />, <div />]
      });
    }).toThrow();
  });
});
