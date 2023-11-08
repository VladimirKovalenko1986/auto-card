import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import { cars } from './js/cars-items';

const conteiner = document.querySelector('.js-conteiner');

const markup = cars
  .map(
    ({ img, car, id }) => `
       <li data-car-id="${id}" class="js-target js-card">
        <img src="${img}" alt="${car}" class="js-target" />
        <h2 class="js-target">${car}</h2>
      </li>`
  )
  .join('');

conteiner.insertAdjacentHTML('beforeend', markup);

conteiner.addEventListener('click', onClick);

function onClick(e) {
  const { target } = e;
  if (!target.classList.contains('js-target')) {
    return;
  }
  const carId =
    target.dataset.carId ?? target.closest('.js-card').dataset.carId;
  const currentItem = cars.find(({ id }) => id === Number(carId));

  // Якщо не знайло id напріклад не прийшов з бекенду
  if (!currentItem) {
    const instance = basicLightbox.create(`
    <div class = "wrapper">
    <img src="https://t4.ftcdn.net/jpg/05/07/58/41/360_F_507584110_KNIfe7d3hUAEpraq10J7MCPmtny8EH7A.jpg" />
    </div>
`);
    instance.show();
    return;
  } else {
    const instance = basicLightbox.create(`
    <div class = "wrapper">
      <img src="${currentItem.img}" alt="${currentItem.car}" />
      <h2>${currentItem.car}</h2>
      <h3>${currentItem.type}</h3>
      <p>Ціна: ${currentItem.price} грн.</p>
    </div>
`);
    instance.show();
  }
}
