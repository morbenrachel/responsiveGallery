## Responsive Gallery with Live Search (Flickr API)
Live search for images from the Flickr API

![](https://i.gyazo.com/1d7102847723248380ff77425b03ebd2.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation
```sh
$ git clone https://github.com/morbenrachel/responsiveGallery.git
$ cd responsiveGallery
$ npm install
$ npm start
```

### Description:

* An image search page that shows results in a responsive gallery as the user types.
* Choose previous search terms from a saved list


### Constants:
Tweak the following values in the constants.js file according to your preferences:

* DEBOUNCE_VALUE - Due to this being a live search, Flickr API calls are debounced by DEBOUNCE_VALUE [ms] 
 * SEARCHES_STORAGE_THRESHOLD - Limit the amount of previous searches that are saved to localStorage
* IMAGES_PER_PAGE - Limit the number of images returned from the Flickr API request as well as the amount of images saved for a searchValue in localStorage
 






