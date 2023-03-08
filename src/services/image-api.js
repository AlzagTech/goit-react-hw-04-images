const API_KEY = '32574941-ff57db53a87475aec71f36ede';
const baseURL = 'https://pixabay.com/api/';

export const fetchImages = (searchQuery, page) => {
  return fetch(
    `${baseURL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`'Nothing Found`));
  });
};
