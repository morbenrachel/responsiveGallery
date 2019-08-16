import React from "react";
import PropTypes from "prop-types";
import "./DropDownList.css";
import _ from "lodash";
import { getPreviousSearchTerms } from "../utils/localStorageUtils";

export default class DropDownList extends React.Component {
  handleClick = value => {
    if (value !== this.props.searchValue) {
      this.props.handleSearchTermClick(value);
    }
  };

  getSearchTerms = () => {
    return getPreviousSearchTerms(this.props.previousSearches);
  };

  render() {
    return (
      <div className="drop-down-list">
        Previous Searches:
        <select
          onChange={e => this.props.handleSearchTermClick(e.target.value)}
        >
          {_.map(this.getSearchTerms(), searchValue => {
            return (
              <option value={searchValue} key={searchValue}>
                {searchValue}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

DropDownList.propTypes = {
  searchValue: PropTypes.string,
  previousSearches: PropTypes.array,
  handleSearchTermClick: PropTypes.func
};
