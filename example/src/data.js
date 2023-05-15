const demos = [
  {
    id: "demo-Img",
    title: "Image",
    component: () => import("./demos/WithImage")
  },
  {
    id: "demo-Svg",
    title: "Svg map",
    component: () => import("./demos/SvgMap")
  },
  {
    id: "demo-Mixed",
    title: "Mixed content",
    component: () => import("./demos/WithMixedContent")
  },
  {
    id: "scaleTo-vs-alignCenter",
    title: "Different behavior scaleTo() and alignCenter()",
    component: () => import("./methods/DifferentScaleToAndAlignCenter")
  },
  {
    id: "prop-lockDragAxis",
    title: "lockDragAxis",
    component: () => import("./props/LockDragAxis")
  },
  {
    id: "prop-padding",
    title: "horizontal and vertical padding",
    component: () => import("./props/Padding")
  },
  {
    id: "prop-wheelScaleFactor",
    title: "wheelScaleFactor",
    component: () => import("./props/WheelScaleFactor")
  },
  {
    id: "prop-tapZoomFactor",
    title: "tapZoomFactor",
    component: () => import("./props/TapZoomFactor")
  },
  {
    id: "prop-doubleTapToggleZoom",
    title: "doubleTapToggleZoom",
    component: () => import("./props/DoubleTapToggleZoom")
  },
  {
    id: "prop-inertia",
    title: "inertia",
    component: () => import("./props/Inertia")
  }
];

export const DEFAULT_ID = demos[0].id;

export const getDemoComponentById = async demoId => {
  const module = await demos.find(({ id }) => id === demoId).component();

  return module.default;
};

export default demos;
