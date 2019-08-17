import React from "react";
import SearchInput from "./components/SearchInput";
import GridGallery from "./components/GridGallery";
import Dropdown from "./components/Dropdown";
import { fetchImagesAsync } from "./utils/flickrUtils";
import {
  getCachedImageList,
  getPreviousSearchTerms
} from "./utils/localStorageUtils";
import constants from "./constants";
import "./App.css";
import _ from "lodash";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    localStorage.removeItem(constants.LOCAL_STORAGE_KEY); //********** */
    this.onSearch = _.debounce(this.onSearch, constants.DEBOUNCE_VALUE);
    const savedSearches = JSON.parse(
      localStorage.getItem(constants.LOCAL_STORAGE_KEY)
    );
    this.state = {
      noResult: false,
      searchValue: "",
      images: [],
      previousSearches: savedSearches ? savedSearches : []
    };
  }

  onSearch = async searchValue => {
    if (!this.isEmptySearchTerm(searchValue)) {
      const imagesArray = await fetchImagesAsync(searchValue);
      this.setState({
        noResult: imagesArray.length === 0,
        images: imagesArray
      });
      this.updateLocalStorage(searchValue, imagesArray);
    } else {
      this.setState({ searchValue: "", images: [] });
    }
  };

  updateLocalStorage = (searchValue, cachedImagesList) => {
    let searchPairs = this.state.previousSearches;
    const prevSearchTerms = getPreviousSearchTerms(searchPairs);
    if (!prevSearchTerms.includes(searchValue)) {
      if (prevSearchTerms.length === constants.SEARCHES_STORAGE_THRESHOLD) {
        searchPairs = _.drop(searchPairs);
      }
      this.setState({
        previousSearches: [...searchPairs, { searchValue, cachedImagesList }]
      });
      localStorage.setItem(
        constants.LOCAL_STORAGE_KEY,
        JSON.stringify(this.state.previousSearches)
      );
    }
  };

  handleSearchTermClick = searchTerm => {
    if (this.state.searchValue !== searchTerm) {
      const cachedImagesList = getCachedImageList(
        this.state.previousSearches,
        searchTerm
      );
      this.setState({
        noResult: cachedImagesList.length === 0,
        images: cachedImagesList,
        searchValue: searchTerm
      });
    }
  };

  isEmptySearchTerm = searchValue => {
    return searchValue.trim().length === 0;
  };

  setSearchValue = valueFromInput => {
    this.setState({ searchValue: valueFromInput });
  };

  componentWillUnmount() {
    this.onSearch.cancel(); //make sure to cancel due to debounce
  }

  render() {
    return (
      <div className="app">
        <div className="top-container">
          <div>
            <h2>Image Gallery</h2>
          </div>

          <SearchInput
            value={this.state.searchValue}
            setSearchValue={this.setSearchValue}
            onSearch={this.onSearch}
          />

          <div className="drop-down">
            {this.state.previousSearches.length > 0 ? (
              <Dropdown
                title="Previous Searches"
                handleSearchTermClick={this.handleSearchTermClick}
                list={this.state.previousSearches}
                searchValue={this.state.searchValue}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {this.state.images.length > 0 ? (
          <GridGallery images={this.state.images} />
        ) : (
          ""
        )}
        {this.state.noResult ? (
          <div className="no-results">
            No Results For: {this.state.searchValue}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
