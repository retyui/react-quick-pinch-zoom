import React from 'react';
import { render } from '@testing-library/react';

import QuickPinchZoom from '../index';

const defaultProps = {
  onUpdate: () => {},
  children: <div />,
};

const renderQuickPinchZoom = (props) =>
  render(<QuickPinchZoom {...defaultProps} {...props} />);

describe('QuickPinchZoom', () => {
  it('should render correctly', () => {
    const wrap = renderQuickPinchZoom({
      children: <div />,
    });
  });

  it('should raises an error when children is not single react element', () => {
    expect(() => {
      renderQuickPinchZoom({
        children: null,
      });
    }).toThrow();

    expect(() => {
      renderQuickPinchZoom({
        children: [<div />, <div />],
      });
    }).toThrow();
  });
});
