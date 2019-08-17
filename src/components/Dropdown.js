import React from "react";
import "./Dropdown.css";
import PropTypes from "prop-types";
import { getPreviousSearchTerms } from "../utils/localStorageUtils";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  container = React.createRef();

  getSearchTerms = () => {
    return getPreviousSearchTerms(this.props.list);
  };

  selectItem = item => {
    this.setState({
      open: false
    });
    if (item !== this.props.searchValue) {
      this.props.handleSearchTermClick(item);
    }
  };

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false
      });
    }
  };

  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open
      };
    });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <div className="dd-container" ref={this.container}>
        <button
          type="button"
          className="dd-title"
          onClick={this.handleButtonClick}
        >
          Previous Searches
          {this.props.headerTitle}
          <i className="arrow-down" />
        </button>
        {this.state.open && (
          <div>
            <ul>
              {this.getSearchTerms().map(item => {
                return (
                  <li
                    value={item}
                    className="dd-list-item"
                    key={item}
                    onClick={() => {
                      this.selectItem(item);
                    }}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;

Dropdown.propTypes = {
  searchValue: PropTypes.string,
  previousSearches: PropTypes.array,
  handleSearchTermClick: PropTypes.func
};
