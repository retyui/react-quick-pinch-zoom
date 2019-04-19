import React from "react";

import "./styles.css";
import demos from "../../data";

const DemosBar = ({ onChange, activeId }) => (
  <div className="select-demo">
    <div className="select-demo-list">
      {demos.map(({ id, title }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`select-demo-option ${
            activeId === id ? "select-demo-option-active" : ""
          }`}
        >
          {title}
        </button>
      ))}
    </div>
  </div>
);

export default DemosBar;
