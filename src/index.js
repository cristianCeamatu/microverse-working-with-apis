import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/style.scss';

const setNewImage = (query = 'cats') => {
  const img = document.querySelector('img');

  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=xd2uDy89ReVVZSV6zc1IfvgMEVc7emRk&s=${query}`,
    {
      mode: 'cors',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      img.src = response.data.images.original.url;
      document.body.querySelector('#image-container').appendChild(img);
    });
};

setNewImage();

document.querySelector('#fetch-image').addEventListener('click', (e) => {
  e.preventDefault();

  setNewImage();
});

document.querySelector('#search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = e.target.elements.search.value;
  const img = document.querySelector('img');

  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=xd2uDy89ReVVZSV6zc1IfvgMEVc7emRk&s=${query}`,
    {
      mode: 'cors',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      img.src = response.data.images.original.url;
      document.body.querySelector('#image-container').appendChild(img);
    })
    .catch((error) => {
      console.log(error);
      const message = document.createElement('p');
      message.className = 'text-danger font-weight-bold mt-1';
      message.innerText =
        'Your query not valid or Gliphy did not manage to find any results! We will give you a random `not found` GIF. Pleasure doing bussiness with you!';

      document.querySelector('#search-form').appendChild(message);

      setNewImage('not found');
    });
});
