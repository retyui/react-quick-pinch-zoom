import React, { Component, Fragment } from "react";

import Header from "./components/Header";
import DemosBar from "./components/DemosBar";
import Spinner from "./components/Spinner";

import { getDemoComponentById, DEFAULT_ID } from "./data";

class App extends Component {
  state = {
    demoId: DEFAULT_ID,
    demoComponent: null
  };

  renderDemo() {
    const Comp = this.state.demoComponent;

    return Comp ? <Comp /> : <Spinner />;
  }

  onChange = demoId => {
    this.setState({ demoId, demoComponent: null }, async () => {
      const demoComponent = await getDemoComponentById(demoId);

      this.setState({ demoId, demoComponent });
    });
  };

  componentDidMount(): void {
    this.onChange(this.state.demoId);
  }

  render() {
    return (
      <Fragment>
        <div className="top-container">
          <Header />
          <DemosBar onChange={this.onChange} activeId={this.state.demoId} />
        </div>
        {this.renderDemo()}
      </Fragment>
    );
  }
}

export default App;
