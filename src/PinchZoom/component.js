// @flow
import React, { Children, cloneElement, Component, createRef } from "react";
import cn from "classnames";

import {
  abs,
  calculateScale,
  cancelEvent,
  clamp,
  getPageCoordinatesByTouches,
  getVectorAvg,
  isCloseTo,
  isTouch,
  max,
  min,
  noup,
  shouldInterceptWheel,
  swing
} from "../utils";
import styles from "../styles.css";

import type { Interaction, Point } from "../types";
import type { Props } from "./types";

const zeroPoint = { x: 0, y: 0 };
const {
  ResizeObserver,
  document: { documentElement: _html, body: _body }
} = window;

class PinchZoom extends Component<Props> {
  static defaultProps = {
    animationDuration: 250,
    draggableUnZoomed: true,
    enabled: true,
    horizontalPadding: 0,
    isTouch,
    lockDragAxis: false,
    maxZoom: 5,
    minZoom: 0.5,
    onDoubleTap: noup,
    onDragEnd: noup,
    onDragStart: noup,
    onDragUpdate: noup,
    onZoomEnd: noup,
    onZoomStart: noup,
    onZoomUpdate: noup,
    setOffsetsOnce: false,
    shouldInterceptWheel,
    tapZoomFactor: 1,
    verticalPadding: 0,
    wheelScaleFactor: 1500,
    zoomOutFactor: 1.3,

    _html,
    _body
  };

  _containerObserver: ?ResizeObserver = null;
  _elRect: ClientRect;
  _fingers: number = 0;
  _firstMove: boolean = true;
  _hasInteraction: boolean;
  _inAnimation: boolean;
  _initialOffset: Point = { ...zeroPoint };
  _interaction: ?Interaction = null;
  _isDoubleTap: boolean = false;
  _isOffsetsSet: boolean = false;
  _lastDragPosition: ?Point = null;
  _lastScale: number = 1;
  _lastTouchStart: number = 0;
  _lastZoomCenter: ?Point = null;
  _listenMouseMove: boolean = false;
  _nthZoom: number = 0;
  _offset: Point = { ...zeroPoint };
  _rect: ClientRect;
  _startTouches = null;
  _updatePlaned: boolean = false;
  _wheelTimeOut: ?TimeoutID = null;
  _zoomFactor: number = 1;

  _containerRef = createRef<HTMLDivElement>();

  _handleDragStart(event: TouchEvent) {
    this.props.onDragStart();

    this._stopAnimation();
    this._lastDragPosition = null;
    this._hasInteraction = true;
    this._handleDrag(event);
  }

  _handleDrag(event: TouchEvent) {
    const touch: Point = this._getOffsetByFirstTouch(event);
    this._drag(touch, this._lastDragPosition);
    this._offset = this._sanitizeOffset(this._offset);
    this._lastDragPosition = touch;
  }

  _handleDragEnd(event: void) {
    this.props.onDragEnd();
    this._end();
  }

  _handleZoomStart(event: void) {
    this.props.onZoomStart();
    this._stopAnimation();
    this._lastScale = 1;
    this._nthZoom = 0;
    this._lastZoomCenter = null;
    this._hasInteraction = true;
  }

  _handleZoom(event: TouchEvent, newScale: number) {
    const touchCenter = getVectorAvg(this._getOffsetTouches(event));
    const scale = newScale / this._lastScale;

    this._lastScale = newScale;

    // The first touch events are thrown away since they are not precise
    this._nthZoom += 1;

    if (this._nthZoom > 3) {
      this._scale(scale, touchCenter);
      this._drag(touchCenter, this._lastZoomCenter);
    }

    this._lastZoomCenter = touchCenter;
  }

  _handleZoomEnd(event: void) {
    this.props.onZoomEnd();
    this._end();
  }

  _handleDoubleTap(event: TouchEvent) {
    if (this._hasInteraction) {
      return;
    }

    const zoomFactor = this._zoomFactor + this.props.tapZoomFactor;
    const startZoomFactor = this._zoomFactor;
    const updateProgress = progress => {
      this._scaleTo(
        startZoomFactor + progress * (zoomFactor - startZoomFactor),
        center
      );
    };
    let center = this._getOffsetByFirstTouch(event);

    this._isDoubleTap = true;

    if (startZoomFactor > zoomFactor) {
      center = this._getCurrentZoomCenter();
    }

    this._animate(updateProgress);
    this.props.onDoubleTap();
  }

  _computeInitialOffset() {
    const x =
      -abs(
        this._elRect.width * this._getInitialZoomFactor() - this._rect.width
      ) / 2;
    const y =
      -abs(
        this._elRect.height * this._getInitialZoomFactor() - this._rect.height
      ) / 2;

    this._initialOffset = {
      x,
      y
    };
  }

  _resetOffset() {
    this._offset = { ...this._initialOffset };
  }

  _setupOffsets() {
    if (this.props.setOffsetsOnce && this._isOffsetsSet) {
      return;
    }

    this._isOffsetsSet = true;

    this._computeInitialOffset();
    this._resetOffset();
  }

  _sanitizeOffset(offset: Point) {
    const elWidth =
      this._elRect.width * this._getInitialZoomFactor() * this._zoomFactor;
    const elHeight =
      this._elRect.height * this._getInitialZoomFactor() * this._zoomFactor;
    const maxX = elWidth - this._getContainerX() + this.props.horizontalPadding;
    const maxY = elHeight - this._getContainerY() + this.props.verticalPadding;
    const maxOffsetX = max(maxX, 0);
    const maxOffsetY = max(maxY, 0);
    const minOffsetX = min(maxX, 0) - this.props.horizontalPadding;
    const minOffsetY = min(maxY, 0) - this.props.verticalPadding;

    return {
      x: clamp(minOffsetX, maxOffsetX, offset.x),
      y: clamp(minOffsetY, maxOffsetY, offset.y)
    };
  }

  _scaleTo(zoomFactor: number, center: Point) {
    this._scale(zoomFactor / this._zoomFactor, center);
  }

  _scale(scale: number, center: Point) {
    scale = this._scaleZoomFactor(scale);
    this._addOffset({
      x: (scale - 1) * (center.x + this._offset.x),
      y: (scale - 1) * (center.y + this._offset.y)
    });

    this.props.onZoomUpdate();
  }

  _scaleZoomFactor(scale: number) {
    const originalZoomFactor = this._zoomFactor;
    this._zoomFactor *= scale;
    this._zoomFactor = clamp(
      this.props.minZoom,
      this.props.maxZoom,
      this._zoomFactor
    );
    return this._zoomFactor / originalZoomFactor;
  }

  _canDrag() {
    return this.props.draggableUnZoomed || !isCloseTo(this._zoomFactor, 1);
  }

  _drag(center: Point, lastCenter: ?Point) {
    if (lastCenter) {
      const y = -(center.y - lastCenter.y);
      const x = -(center.x - lastCenter.x);

      if (!this.props.lockDragAxis) {
        this._addOffset({
          x,
          y
        });
      } else {
        // lock scroll to position that was changed the most
        if (abs(x) > abs(y)) {
          this._addOffset({
            x,
            y: 0
          });
        } else {
          this._addOffset({
            y,
            x: 0
          });
        }
      }

      this.props.onDragUpdate();
    }
  }

  _addOffset(offset: Point) {
    const { x, y } = this._offset;

    this._offset = {
      x: x + offset.x,
      y: y + offset.y
    };
  }

  _sanitize() {
    if (this._zoomFactor < this.props.zoomOutFactor) {
      this._zoomOutAnimation();
    } else if (this._isInsaneOffset()) {
      this._sanitizeOffsetAnimation();
    }
  }

  _isInsaneOffset() {
    const offset = this._offset;
    const sanitizedOffset = this._sanitizeOffset(offset);

    return sanitizedOffset.x !== offset.x || sanitizedOffset.y !== offset.y;
  }

  _sanitizeOffsetAnimation() {
    const targetOffset = this._sanitizeOffset(this._offset);
    const startOffset: Point = { ...this._offset };
    const updateProgress = progress => {
      const x = startOffset.x + progress * (targetOffset.x - startOffset.x);
      const y = startOffset.y + progress * (targetOffset.y - startOffset.y);

      this._offset = { x, y };
      this._update();
    };

    this._animate(updateProgress);
  }

  _zoomOutAnimation() {
    if (this._zoomFactor === 1) {
      return;
    }

    const startZoomFactor = this._zoomFactor;
    const zoomFactor = 1;
    const center = this._getCurrentZoomCenter();
    const updateProgress = progress => {
      const scaleFactor =
        startZoomFactor + progress * (zoomFactor - startZoomFactor);

      this._scaleTo(scaleFactor, center);
    };

    this._animate(updateProgress);
  }

  _getInitialZoomFactor() {
    const xZoomFactor = this._rect.width / this._elRect.width;
    const yZoomFactor = this._rect.height / this._elRect.height;

    return min(xZoomFactor, yZoomFactor);
  }

  _getCurrentZoomCenter() {
    const { x, y } = this._offset;
    const offsetLeft = x - this._initialOffset.x;
    const offsetTop = y - this._initialOffset.y;

    return {
      x: -1 * x - offsetLeft / (1 / this._zoomFactor - 1),
      y: -1 * y - offsetTop / (1 / this._zoomFactor - 1)
    };
  }

  _getOffsetByFirstTouch(event: TouchEvent): Point {
    return this._getOffsetTouches(event)[0];
  }

  _getOffsetTouches(event: TouchEvent): Array<Point> {
    const { _html, _body } = this.props;
    const scrollTop = _html.scrollTop || _body.scrollTop;
    const scrollLeft = _html.scrollLeft || _body.scrollLeft;
    const posTop = this._rect.top + scrollTop;
    const posLeft = this._rect.left + scrollLeft;

    return getPageCoordinatesByTouches(event.touches).map(({ x, y }) => ({
      x: x - posLeft,
      y: y - posTop
    }));
  }

  _animate(
    frameFn: number => void,
    options?: $Shape<{|
      timeFn: number => number,
      callback: () => void,
      duration: number
    |}>
  ) {
    const startTime = new Date().getTime();
    const { timeFn, callback, duration } = {
      timeFn: swing,
      callback: () => {},
      duration: this.props.animationDuration,
      ...options
    };
    const renderFrame = () => {
      if (!this._inAnimation) {
        return;
      }

      const frameTime = new Date().getTime() - startTime;
      let progress = frameTime / duration;

      if (frameTime >= duration) {
        frameFn(1);
        callback();
        this._update();
        this._stopAnimation();
        this._update();
      } else {
        progress = timeFn(progress);
        frameFn(progress);
        this._update();

        requestAnimationFrame(renderFrame);
      }
    };
    this._inAnimation = true;

    requestAnimationFrame(renderFrame);
  }

  _stopAnimation() {
    this._inAnimation = false;
  }

  _getContainerX() {
    return this._rect.width;
  }

  _getContainerY() {
    return this._rect.height;
  }

  _end() {
    this._hasInteraction = false;
    this._sanitize();
    this._update();
  }

  _updateDimensions() {
    const { current: div } = this._containerRef;

    // $FlowFixMe
    this._rect = div.getBoundingClientRect();
    // $FlowFixMe
    this._elRect = div.firstElementChild.getBoundingClientRect();
  }

  _onResize = () => {
    this._update();
    this._updateDimensions();
  };

  _bindEvents() {
    const { current: div } = this._containerRef;

    if (ResizeObserver) {
      this._containerObserver = new ResizeObserver(this._onResize);
    } else {
      window.addEventListener("resize", this._onResize);
    }

    this._handlers.forEach(([eventName, fn]) => {
      // $FlowFixMe
      div.addEventListener(eventName, fn, true);
    });

    // $FlowFixMe
    [...div.querySelectorAll("img")].forEach(img =>
      img.addEventListener("load", this._onResize)
    );
  }

  _unSubscribe() {
    const { current: div } = this._containerRef;

    if (this._containerObserver) {
      this._containerObserver.disconnect();
      this._containerObserver = null;
    }

    window.removeEventListener("resize", this._onResize);

    this._handlers.forEach(([eventName, fn]) => {
      // $FlowFixMe
      div.removeEventListener(eventName, fn, true);
    });
  }

  _update(event?: { type: string }) {
    if (this._updatePlaned) {
      return;
    }

    this._updatePlaned = true;

    setTimeout(() => {
      this._updatePlaned = false;

      const type = event && event.type;

      if (type === "resize" || type === "load") {
        this._setupOffsets();
      }

      const scale = this._getInitialZoomFactor() * this._zoomFactor;
      const x = -this._offset.x / scale;
      const y = -this._offset.y / scale;

      this.props.onUpdate({ scale, x, y });
    }, 0);
  }

  _handlerIfEnable(fn: (...a: any) => void) {
    return (...args: Array<any>) => {
      if (this.props.enabled) {
        fn(...args);
      }
    };
  }

  _setInteraction(newInteraction: ?Interaction, event: TouchEvent) {
    const interaction = this._interaction;

    if (interaction !== newInteraction) {
      if (interaction && !newInteraction) {
        if (interaction === "zoom") {
          this._handleZoomEnd();
        } else if (interaction === "drag") {
          this._handleDragEnd();
        }
      }

      if (newInteraction === "zoom") {
        this._handleZoomStart();
      } else if (newInteraction === "drag") {
        this._handleDragStart(event);
      }
    }

    this._interaction = newInteraction;
  }

  _updateInteraction(event: TouchEvent) {
    const fingers = this._fingers;

    if (fingers === 2) {
      return this._setInteraction("zoom", event);
    }

    if (fingers === 1 && this._canDrag()) {
      return this._setInteraction("drag", event);
    }

    this._setInteraction(null, event);
  }

  _detectDoubleTap(event: TouchEvent) {
    const time = new Date().getTime();

    if (this._fingers > 1) {
      this._lastTouchStart = 0;
    }

    if (time - this._lastTouchStart < 300) {
      cancelEvent(event);

      this._handleDoubleTap(event);

      if (this._interaction === "zoom") {
        this._handleZoomEnd();
      } else if (this._interaction === "drag") {
        this._handleDragEnd();
      }
    } else {
      this._isDoubleTap = false;
    }

    if (this._fingers === 1) {
      this._lastTouchStart = time;
    }
  }

  _handlerOnTouchEnd = this._handlerIfEnable((touchEndEvent: TouchEvent) => {
    this._fingers = touchEndEvent.touches.length;
    this._updateInteraction(touchEndEvent);
  });

  _handlerOnTouchStart = this._handlerIfEnable(
    (touchStartEvent: TouchEvent) => {
      this._firstMove = true;
      this._fingers = touchStartEvent.touches.length;
      this._detectDoubleTap(touchStartEvent);
    }
  );

  _handlerOnTouchMove = this._handlerIfEnable((touchMoveEvent: TouchEvent) => {
    if (this._isDoubleTap) {
      return;
    }

    if (this._firstMove) {
      this._updateInteraction(touchMoveEvent);

      if (this._interaction) {
        cancelEvent(touchMoveEvent);
      }

      this._startTouches = getPageCoordinatesByTouches(touchMoveEvent.touches);
    } else {
      if (this._interaction === "zoom") {
        if (
          this._startTouches &&
          this._startTouches.length === 2 &&
          touchMoveEvent.touches.length === 2
        ) {
          this._handleZoom(
            touchMoveEvent,
            calculateScale(
              this._startTouches,
              getPageCoordinatesByTouches(touchMoveEvent.touches)
            )
          );
        }
      } else if (this._interaction === "drag") {
        this._handleDrag(touchMoveEvent);
      }
      if (this._interaction) {
        cancelEvent(touchMoveEvent);
        this._update();
      }
    }

    this._firstMove = false;
  });

  makeLikeTouchEvent(fn: (e: TouchEvent) => void): MouseEvent => void {
    return mouseEvent => {
      const { pageX, pageY, type } = mouseEvent;
      const isEnd = type === "mouseup" || type === "mouseleave";
      const isStart = type === "mousedown";
      if (isStart) {
        mouseEvent.preventDefault();

        this._listenMouseMove = true;
      }

      if (this._listenMouseMove) {
        // $FlowFixMe
        mouseEvent.touches = isEnd ? [] : [{ pageX, pageY }];

        // $FlowFixMe
        fn(mouseEvent);
      }

      if (isEnd) {
        this._listenMouseMove = false;
      }
    };
  }

  _handlerWheel = (wheelEvent: WheelEvent) => {
    if (this.props.shouldInterceptWheel(wheelEvent)) {
      return;
    }

    wheelEvent.preventDefault();

    const { pageX, pageY, deltaY } = wheelEvent;

    // $FlowFixMe
    const likeTouchEvent: TouchEvent = { touches: [{ pageX, pageY }] };
    const center = this._getOffsetByFirstTouch(likeTouchEvent);

    this._stopAnimation();
    this._scaleTo(
      this._zoomFactor - deltaY / this.props.wheelScaleFactor,
      center
    );
    this._update();

    clearTimeout(this._wheelTimeOut);
    this._wheelTimeOut = setTimeout(() => this._sanitize(), 100);
  };

  _handlers = this.props.isTouch()
    ? [
        ["touchstart", this._handlerOnTouchStart],
        ["touchend", this._handlerOnTouchEnd],
        ["touchmove", this._handlerOnTouchMove]
      ]
    : [
        ["mousemove", this.makeLikeTouchEvent(this._handlerOnTouchMove)],
        ["mousedown", this.makeLikeTouchEvent(this._handlerOnTouchStart)],
        ["mouseup", this.makeLikeTouchEvent(this._handlerOnTouchEnd)],
        ["mouseleave", this.makeLikeTouchEvent(this._handlerOnTouchEnd)],
        ["wheel", this._handlerWheel]
      ];

  componentDidMount() {
    this._updateDimensions();
    this._bindEvents();
    this._update();
  }

  componentWillUnmount() {
    this._unSubscribe();
  }

  render() {
    const { children, containerProps } = this.props;
    const child = Children.only(children);
    const props = containerProps || {};

    return (
      <div
        {...props}
        ref={this._containerRef}
        // $FlowFixMe
        className={cn(styles.pinchZoomContainer, props.className)}
      >
        {cloneElement(child, {
          className: cn(styles.pinchZoomElement, child.props.className)
        })}
      </div>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  const { element, object, number, any, func, bool } = require("prop-types");

  PinchZoom.propTypes = {
    children: element,
    containerProps: object,
    wheelScaleFactor: number,
    animationDuration: number,
    draggableUnZoomed: bool,
    enabled: bool,
    horizontalPadding: number,
    lockDragAxis: bool,
    onUpdate: func.isRequired,
    maxZoom: number,
    minZoom: number,
    onDoubleTap: func,
    onDragEnd: func,
    onDragStart: func,
    onDragUpdate: func,
    onZoomEnd: func,
    onZoomStart: func,
    onZoomUpdate: func,
    setOffsetsOnce: bool,
    tapZoomFactor: number,
    verticalPadding: number,
    zoomOutFactor: number,
    isTouch: func,
    _html: any,
    _body: any
  };
}

export default PinchZoom;
