import './styles.css';
import itemTemplate from './templates/itemTemplate.hbs';
import getGalleryImages from './js/apiService';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
  containerRef: document.querySelector('.container'),
  inputRef: document.querySelector('.search-form'),
  galleryRef: document.querySelector('.gallery'),
  buttonReadMoreRef: document.querySelector('.button-read-more'),
  searchFormRef: document.querySelector('.search-form'),
  galleryItemRef: document.querySelector('.gallery-item'),
  spinnerRef: document.querySelector('.spinner'),
};

const windowsScroll = () => {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth',
  });
};

const handleImage = event => {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.bigimage}" width="800" height="600">
`);
  instance.show();
}

const loadImages = array => {
  array.map(image => {
    let picture = itemTemplate(image);
    refs.galleryRef.insertAdjacentHTML('beforeend', picture);
  });
};

const fetchQuery = () => {
  refs.spinnerRef.classList.add('lds-ripple');
  getGalleryImages
    .getImages()
    .then(response => {
      loadImages(response);
      windowsScroll();
    })
    .finally(() => refs.spinnerRef.classList.remove('lds-ripple'));
};

const handleInput = event => {
  event.preventDefault();
  const inputValue = event.currentTarget;
  
  getGalleryImages.request = inputValue.elements.query.value;
  refs.galleryRef.innerHTML = '';

  refs.buttonReadMoreRef.classList.add('unhide');
  getGalleryImages.resetPage();
  refs.searchFormRef.reset();

fetchQuery();
};

refs.searchFormRef.addEventListener('submit', handleInput);
refs.buttonReadMoreRef.addEventListener('click', fetchQuery);
refs.galleryRef.addEventListener('click', handleImage);

