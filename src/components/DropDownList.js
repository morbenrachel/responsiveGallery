import React from "react";
import "./DropDownList.css";
import _ from "lodash";

export default class DropDownList extends React.Component {
  handleClick = value => {
    if (value !== this.props.searchValue) {
      this.props.handleSearchTermClick(value);
    }
  };

  render() {
    return (
      <div className="drop-down-list">
        Previous Searches:
        <select
          onChange={e => this.props.handleSearchTermClick(e.target.value)}
        >
          {_.map(this.props.previousSearches, searchTerm => {
            return (
              <option value={searchTerm} key={searchTerm}>
                {searchTerm}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
