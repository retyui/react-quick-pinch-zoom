import React, { Component } from "react";

import Base from "../../components/Base";

const containerProps = {
  className: "border-container display-inline-block reset-line-height"
};

export default class WithImage extends Component {
  renderChild = ({ innerRef, ...props }) => (
    <img
      ref={innerRef}
      alt="flow"
      // Photo by Pascal Habermann on Unsplash
      src="https://user-images.githubusercontent.com/4661784/56415187-a9354300-6295-11e9-8f94-486175b92046.jpg"
      {...props}
    />
  );

  render() {
    return <Base containerProps={containerProps} Child={this.renderChild} />;
  }
}
