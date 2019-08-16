import React from "react";
import PropTypes from "prop-types";
import "./SearchInput.css";

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

SearchInput.propTypes = {
  value: PropTypes.string,
  setSearchValue: PropTypes.func,
  onSearch: PropTypes.func
};
