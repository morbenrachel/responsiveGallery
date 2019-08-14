import React from "react";
import SearchBar from "./components/SearchBar";
import SearchTerms from "./components/SearchTerms";
import GridGallery from "./components/GridGallery";
import DropDownList from "./components/DropDownList";
import "./App.css";
import { checkHttpStatus, parseJSON } from "./flickrUtils";
import _ from "lodash";
import { Dropdown, DropdownButton } from "react-bootstrap";
import constants from "./constants";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    localStorage.removeItem(constants.LOCAL_STORAGE_KEY);
    this.onSearch = _.debounce(this.onSearch, constants.DEBOUNCE_VALUE); //perhaps debounce onSearch instead of fetchImages
    const savedSearches = JSON.parse(
      localStorage.getItem(constants.LOCAL_STORAGE_KEY)
    );
    this.state = {
      searchValue: "",
      selectedSearchTerm: null,
      images: [],
      previousSearches: savedSearches ? savedSearches : []
    };
  }

  //we want to save searches that were actually performed - after debounce timeout passed
  //verify correct way of settings state of an array (pure - don't mutate)
  //todo add logic for THRESHOLD of prev searches to display
  updateLocalStorage(searchValue, cachedImages) {
    let searchTerms = this.state.previousSearches;
    if (!searchTerms.includes(searchValue)) {
      console.log("search term len" + searchTerms.length);
      if (searchTerms.length === constants.SEARCHES_STORAGE_THRESHOLD) {
        searchTerms = _.drop(searchTerms);
        console.log("after drop: " + searchTerms);
      }

      this.setState({
        previousSearches: [...searchTerms, searchValue]
      });
      localStorage.setItem(
        constants.LOCAL_STORAGE_KEY,
        JSON.stringify(this.state.previousSearches)
      );
    }
  }

  fetchImages(searchValue) {
    const url =
      constants.FLICKR_BASE_URL +
      "&text=" +
      searchValue +
      "&per_page=" +
      constants.IMAGES_PER_PAGE;
    fetch(url)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        console.log(response);
        console.log(response.photos.total);
        if (response.photos.total > 0) {
          this.updateLocalStorage(searchValue);
          this.setState({ images: response.photos.photo });
        } else {
          this.setState({ images: [] });
        }

        //maybe this is the best place to update storage
      })
      .catch(err => {
        console.log(err);
      });
  }

  isEmptySearchTerm = searchValue => {
    return searchValue.trim().length === 0;
  };

  handleInputChange = () => {};

  onSearch = searchValue => {
    console.log("search field entered: " + searchValue);
    if (!this.isEmptySearchTerm(searchValue)) {
      // this.setState({ searchValue }); //todo verify if this is needed
      this.fetchImages(searchValue); //based on results - if empty show user a text that says no results for search term, only if there are results it's worth saving
    }
  };

  componentWillUnmount() {
    this.onSearch.cancel();
  }

  handleSearchTermClick = searchTerm => {
    //todo set text in input field to searchTerm
    console.log("search term: " + searchTerm);
    if (this.state.searchValue !== searchTerm) {
      this.setState({ searchValue: searchTerm });
      this.fetchImages(searchTerm);
    }
  };

  render() {
    return (
      <div>
        <div className="top-container">
          <h2>Image Gallery</h2>
          {/* <SearchBar
            onSearch={this.onSearch}
            reset={this.state.resetInputField}
            value={this.state.searchValue}
          /> */}
          <input
            value={this.state.searchValue}
            className="inputStyle"
            type="text"
            placeholder="Search for image"
            onChange={e => {
              this.setState({ searchValue: e.target.value });
              this.onSearch(e.target.value);
            }}
          />
          {this.state.previousSearches.length > 0 ? (
            <div>
              Previous Searches:
              <select
                onChange={e => this.handleSearchTermClick(e.target.value)}
              >
                {_.map(this.state.previousSearches, searchTerm => {
                  return (
                    <option value={searchTerm} key={searchTerm}>
                      {searchTerm}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            ""
          )}
          {/* {this.state.previousSearches.length > 0 ? (
            <DropdownButton
              id="dropdown-basic-button"
              title="Previous Searches"
            >
              {_.map(this.state.previousSearches, searchTerm => {
                return (
                  <Dropdown.Item
                    href="#/action-1"
                    key={searchTerm}
                    onClick={() => this.handleSearchTermClick(searchTerm)}
                  >
                    {searchTerm}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          ) : (
            ""
          )} */}
          {/* {this.state.previousSearches.length > 0 ? (
            <SearchTerms previousSearches={this.state.previousSearches} />
          ) : (
            ""
          )} */}
        </div>
        {this.state.images.length > 0 ? (
          <GridGallery images={this.state.images} />
        ) : (
          <div>No results for {this.state.searchValue} </div>
        )}
      </div>
    );
  }
}
