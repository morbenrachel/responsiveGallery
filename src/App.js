import React from "react";
import SearchInput from "./components/SearchInput";
import GridGallery from "./components/GridGallery";
import DropDownList from "./components/DropDownList";
import { fetchImagesAsync } from "./flickrUtils";
import _ from "lodash";
import constants from "./constants";
import "./App.css";

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

  updateLocalStorage(searchValue, cachedImagesList) {
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
      console.log(this.state.previousSearches.length);
      localStorage.setItem(
        constants.LOCAL_STORAGE_KEY,
        JSON.stringify(this.state.previousSearches)
      );
    }
  }

  onSearch = searchValue => {
    console.log("search field entered: " + searchValue);
    fetchImagesAsync(searchValue).then(imagesArray => {
      console.log("inside on search fetch async");
      console.log(imagesArray.length === 0);
      this.setState({ noResult: imagesArray.length === 0 });
      this.setState({ images: imagesArray });
      this.updateLocalStorage(searchValue, imagesArray);
    });
  };

  isEmptySearchTerm = searchValue => {
    return searchValue.trim().length === 0;
  };

  setSearchValue = valueFromInput => {
    console.log("set search val");
    this.setState({ searchValue: valueFromInput });
  };

  componentWillUnmount() {
    this.onSearch.cancel();
  }

  getPreviousSearchTerms = () => {
    return _.map(this.state.previousSearches, searchPair => {
      _.pick(searchPair, "searchValue");
    });
  };

  handleSearchTermClick = searchTerm => {
    console.log("search term: " + searchTerm);
    if (this.state.searchValue !== searchTerm) {
      this.setState({ searchValue: searchTerm });
      fetchImagesAsync(searchTerm).then(imagesArray => {
        this.setState({ noResult: imagesArray.length === 0 });
        this.setState({ images: imagesArray });
      });
    }
  };

  render() {
    return (
      <div>
        <div className="top-container">
          <h2>Image Gallery</h2>
          <SearchInput
            value={this.state.searchValue}
            setSearchValue={this.setSearchValue}
            onSearch={this.onSearch}
          />
          {this.state.previousSearches.length > 0 ? (
            <DropDownList
              handleSearchTermClick={this.handleSearchTermClick}
              previousSearches={this.state.previousSearches}
              searchValue={this.state.searchValue}
            />
          ) : (
            ""
          )}
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
