import { getOffsetBounds } from '../getOffsetBounds';

describe('getOffsetBounds', () => {
  it('allows no movement when container and child have same dimension', () => {
    const [min, max] = getOffsetBounds({
      containerDimension: 100,
      childDimension: 100,
      padding: 0
    });

    expect(min).toEqual(0);
    expect(max).toEqual(0);
  });

  it('ensures child that is larger than container always covers container', () => {
    const [min, max] = getOffsetBounds({
      containerDimension: 100,
      childDimension: 150,
      padding: 0
    });

    expect(min).toEqual(0);
    expect(max).toEqual(50);
  });

  it('allows moving child that is smaller than contain inside container', () => {
    const [min, max] = getOffsetBounds({
      containerDimension: 200,
      childDimension: 100,
      padding: 0
    });

    expect(min).toEqual(-100);
    expect(max).toEqual(0);
  });

  it('allows moving far enough to reveal padding', () => {
    const [min, max] = getOffsetBounds({
      containerDimension: 100,
      childDimension: 150,
      padding: 10
    });

    expect(min).toEqual(-10);
    expect(max).toEqual(60);
  });

  it('allows revealing padding even if container and child have same dimension', () => {
    const [min, max] = getOffsetBounds({
      containerDimension: 100,
      childDimension: 100,
      padding: 10
    });

    expect(min).toEqual(-10);
    expect(max).toEqual(10);
  });

  it('ignores padding if child including padding is smaller than container', () => {
    const [min, max] = getOffsetBounds({
      containerDimension: 200,
      childDimension: 100,
      padding: 10
    });

    expect(min).toEqual(-100);
    expect(max).toEqual(0);
  });

  it('allows revealing padding even if child and one padding fits container', () => {
    const [min, max] = getOffsetBounds({
      containerDimension: 200,
      childDimension: 190,
      padding: 10
    });

    expect(min).toEqual(-10);
    expect(max).toEqual(0);
  });

  it('allows revealing padding even if child without padding is smaller than container', () => {
    const [min, max] = getOffsetBounds({
      containerDimension: 200,
      childDimension: 190,
      padding: 20
    });

    expect(min).toEqual(-20);
    expect(max).toEqual(10);
  });

  describe('with centerContained option', () => {
    it('allows no movement when container and child have same dimension', () => {
      const [min, max] = getOffsetBounds({
        containerDimension: 100,
        childDimension: 100,
        padding: 0,
        centerContained: true
      });

      expect(min).toEqual(0);
      expect(max).toEqual(0);
    });

    it('ensures child that is larger than container always covers container', () => {
      const [min, max] = getOffsetBounds({
        containerDimension: 100,
        childDimension: 150,
        padding: 0,
        centerContained: true
      });

      expect(min).toEqual(0);
      expect(max).toEqual(50);
    });

    it('does not allow moving child that is smaller than container out of center', () => {
      const [min, max] = getOffsetBounds({
        containerDimension: 200,
        childDimension: 100,
        padding: 0,
        centerContained: true
      });

      expect(min).toEqual(-50);
      expect(max).toEqual(-50);
    });

    it('allows moving far enough to reveal padding', () => {
      const [min, max] = getOffsetBounds({
        containerDimension: 100,
        childDimension: 150,
        padding: 10,
        centerContained: true
      });

      expect(min).toEqual(-10);
      expect(max).toEqual(60);
    });

    it('allows revealing padding even if container and child have same dimension', () => {
      const [min, max] = getOffsetBounds({
        containerDimension: 100,
        childDimension: 100,
        padding: 10,
        centerContained: true
      });

      expect(min).toEqual(-10);
      expect(max).toEqual(10);
    });

    it('ignores padding if child including padding is smaller than container', () => {
      const [min, max] = getOffsetBounds({
        containerDimension: 200,
        childDimension: 100,
        padding: 10,
        centerContained: true
      });

      expect(min).toEqual(-50);
      expect(max).toEqual(-50);
    });

    it('allows revealing padding even if child and one padding fits container', () => {
      const [min, max] = getOffsetBounds({
        containerDimension: 200,
        childDimension: 190,
        padding: 10,
        centerContained: true
      });

      expect(min).toEqual(-10);
      expect(max).toEqual(0);
    });

    it('allows revealing padding even if child without padding is smaller than container', () => {
      const [min, max] = getOffsetBounds({
        containerDimension: 200,
        childDimension: 190,
        padding: 20,
        centerContained: true
      });

      expect(min).toEqual(-20);
      expect(max).toEqual(10);
    });
  })
});
