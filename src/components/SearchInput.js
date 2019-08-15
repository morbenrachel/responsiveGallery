import React from "react";
import "./SearchInput.css";
import _ from "lodash";

export default class SearchInput extends React.Component {
  render() {
    return (
      <input
        value={this.props.value}
        className="inputStyle"
        type="text"
        placeholder="Search for image"
        onChange={e => {
          this.props.setSearchValue(e.target.value);
          this.props.onSearch(e.target.value);
        }}
      />
    );
  }
}
