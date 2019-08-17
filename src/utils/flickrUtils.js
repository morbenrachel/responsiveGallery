import constants from "../constants";
import _ from "lodash";

const checkHttpStatus = response => {
  if (
    _.inRange(
      response.status,
      constants.BOTTOM_SUCCESS_STATUS_CODE,
      constants.TOP_SUCCESS_STATUS_CODE
    )
  ) {
    return response;
  } else {
    throw response;
  }
};

const getImagesArray = response => {
  if (response.photos.total > 0) {
    return response.photos.photo;
  } else {
    return [];
  }
};

const fetchImagesAsync = async searchValue => {
  const url =
    constants.FLICKR_BASE_URL +
    "&text=" +
    searchValue +
    "&per_page=" +
    constants.IMAGES_PER_PAGE;
  try {
    const response = await fetch(url);
    const verifiedResponse = await checkHttpStatus(response);
    const data = await verifiedResponse.json();
    let imagesArray = await getImagesArray(data);
    return imagesArray;
  } catch (err) {
    console.log(err);
  }
};

const getImageUrl = (farm, server, id, secret) => {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

export { fetchImagesAsync, getImageUrl };
