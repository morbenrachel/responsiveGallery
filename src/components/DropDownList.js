import React from "react";
import PropTypes from "prop-types";
import "./DropDownList.css";
import _ from "lodash";
import { getPreviousSearchTerms } from "../utils/localStorageUtils";

export default class DropDownList extends React.Component {
  handleClick = value => {
    console.log(this.props.previousSearches[value]);
    if (value !== this.props.searchValue) {
      this.props.handleSearchTermClick(value);
    }
  };

  getSearchTerms = () => {
    return getPreviousSearchTerms(this.props.previousSearches);
  };

  handleFocus = e => {
    console.log(e.target);
    e.target.selectedIndex = -1;
  };

  handleBlur = e => {
    console.log(e.target);
    e.target.selectedIndex = -1;
  };

  render() {
    return (
      <div className="drop-down-list">
        Previous Searches:
        <select
          onChange={e => this.props.handleSearchTermClick(e.target.value)}
          // onClick={e => this.handleFocus(e)}
        >
          <option selected disabled hidden>
            Choose here
          </option>
          {_.map(this.getSearchTerms(), searchValue => {
            return (
              <option value={searchValue} key={searchValue}>
                {searchValue}
              </option>
            );
          })}
        </select>
        {/* <ul drop-down-list>
          Previous Searches
          {_.map(this.getSearchTerms(), searchValue => {
            return (
              <li
                value={searchValue}
                key={searchValue}
                onClick={e => this.handleClick(e.target.value)}
              >
                {searchValue}
              </li>
            );
          })}
        </ul> */}
      </div>
    );
  }
}

DropDownList.propTypes = {
  searchValue: PropTypes.string,
  previousSearches: PropTypes.array,
  handleSearchTermClick: PropTypes.func
};
