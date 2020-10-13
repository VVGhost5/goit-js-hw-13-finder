const request = {
  APIkey: '18616543-61f088c3928fc4bac834774e6',
  page: 1,
  queryImage: '',

  async getImages() {
    const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.queryImage}&page=${this.page}&per_page=12&key=${this.APIkey}`;
    try {
      let response = await fetch(URL);
      let images = await response.json();
      this.page++;
      return images.hits;
    } catch (err) {
      throw err;
    }
  },

  resetPage() {
    this.pages = 1;
  },
  get request() {
    return this.queryImage;
  },

  set request(value) {
    this.queryImage = value;
  },
};

export default request;
