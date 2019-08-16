import constants from "../constants";
import _ from "lodash";

const getPreviousSearchTerms = searchPairs => {
  return _.map(searchPairs, searchPair => {
    return _.pick(searchPair, "searchValue").searchValue;
  });
};

const getCachedImageList = (searchPairs, searchValue) => {
  const index = _.findIndex(searchPairs, { searchValue });
  return searchPairs[index].cachedImagesList;
};

export { getPreviousSearchTerms, getCachedImageList };
