import React, { Component } from "react";

import Base from "../../components/Base";

const containerProps = {
  className: "border-container"
};

export default class WithMixedContent extends Component {
  renderChild = ({ innerRef, ...props }) => (
    <div ref={innerRef} {...props}>
      <h3>Food & Drink</h3>
      <p>
        🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🍍 🍅 🍆 🌶 🌽 🍠 🍯 🍞 🧀 🍗 🍖 🍤
        🍳 🍔 🍟 🌭 🍕 🍝 🌮 🌯 🍜 🍲 🍥 🍣 🍱 🍛 🍙 🍚 🍘 🍢 🍡 🍧 🍨 🍦 🍰 🎂
        🍮 🍬 🍭 🍫 🍿 🍩 🍪 🍺 🍻 🍷 🍸 🍹 🍾 🍶 🍵 ☕️ 🍼 🍴 🍽
      </p>

      <p>
        <a href="https://eosrei.github.io/emojione-color-font/full-demo.html">
          Other unicode emoji..
        </a>
      </p>

      <table>
        <tbody>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </tbody>
      </table>

      <video
        autoPlay
        muted
        crossOrigin="true"
        playsInline
        poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      >
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          type="video/mp4"
          size="576"
        />
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
          type="video/mp4"
          size="720"
        />
        <source
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
          type="video/mp4"
          size="1080"
        />

        <a
          href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          download
        >
          Download video
        </a>
      </video>
    </div>
  );

  render() {
    return <Base containerProps={containerProps} Child={this.renderChild} />;
  }
}
