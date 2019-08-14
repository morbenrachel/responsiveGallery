import React from "react";
import "./SearchBar.css";
import _ from "lodash";

//todo - not sure if necessary or just use input in app.js file instead of breaking this apart
//maybe make it a functional comp as we aren't using state or lifecycle
export default class SearchBar extends React.Component {
  handleChange = e => {
    this.props.onSearch(e.target.value);
  };

  render() {
    return (
      <input
        value={this.props.value}
        className="inputStyle"
        type="text"
        placeholder="Search for image"
        onChange={this.handleChange}
      />
    );
  }
}

// onChange={e => {
//   this.props.onSearch(e.target.value);
// }
