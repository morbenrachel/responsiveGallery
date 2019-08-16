import React from "react";
import "./Dropdown.css";
import _ from "lodash";

class Dropdown extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  render() {
    return (
      <div className="dropdown">
        <div className="button" onClick={this.showDropdownMenu}>
          Previous Searches
        </div>
        {this.state.displayMenu ? (
          <ul>
            {_.map(this.props.previousSearches, searchTerm => {
              return (
                <li>
                  <a
                    className="active"
                    href="#Create Page"
                    key={searchTerm}
                    onClick={this.props.handleSearchTermClick}
                  >
                    {searchTerm}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
