export const styleRoot = "kvfysmfp";
export const styleChild = "ufhsfnkm";

const styleElement = document.createElement("style");

styleElement.appendChild(
  document.createTextNode(
    `.${styleRoot}{overflow:hidden;touch-action:none}.${styleChild}{transform-origin: 0 0}`
  )
);

document.getElementsByTagName("head")[0].appendChild(styleElement);
