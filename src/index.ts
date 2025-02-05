import './scss/styles.scss';

import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { API_URL, CDN_URL } from './utils/constants';
import { IApi } from './types';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/connector/WebLarekApi';

import { CardsData } from './components/model/CardsData';
import { BasketData } from './components/model/BasketData';

import { Modal } from './components/common/Modal';
import { Basket } from './components/view/Basket';

import { Page } from './components/view/Page';

import { CardCatalog } from './components/view/CardCatalog';
import { CardPreview } from './components/view/CardPreview';
import { CardBasket } from './components/view/CardBasket';

const events = new EventEmitter();
const baseUrl: IApi = new Api(API_URL);
const api = new WebLarekApi(baseUrl, CDN_URL);

const cardCatalogTemplate = ensureElement('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = ensureElement('#card-basket') as HTMLTemplateElement;
const basketTemplate = ensureElement('#basket') as HTMLTemplateElement;
const modalContainer = ensureElement('#modal-container') as HTMLElement;
const pageContainer = ensureElement('.page') as HTMLElement;

const cardsData = new CardsData(events);
const basketData = new BasketData(events);

const page = new Page(pageContainer, events);
const modal = new Modal(modalContainer, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

events.on('cardsData:changed', () => {
  const productsHTMLArray = cardsData.getCards().map(item => 
    new CardCatalog(cloneTemplate(cardCatalogTemplate), events).render(item));

  const basketCountTotal = basketData.getCountCardsInBasket();

  page.render({
    productList: productsHTMLArray,
    basketCounter: basketCountTotal,
  })
});

events.on('productCatalog:click', ({id}: {id: string}) => {
  const productSelect = cardsData.getCard(id);
  const productPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);

  productPreview.button = basketData.checkCardInBasket(id);

  productPreview.buttonState = cardsData.isPriceNotNull(id);

  modal.render({
    content: productPreview.render(productSelect)
  });
});

events.on('productPreview:button', ({id}: {id: string}) => {
  if (basketData.checkCardInBasket(id)) {
    basketData.removeCardFromBasket(id);
  } else {
    basketData.addCardToBasket(cardsData.getCard(id));
  }

  events.emit('productCatalog:click', {id});
});

events.on('productBasket:remove', ({id}: {id: string}) => {
  basketData.removeCardFromBasket(id);

  events.emit('basket:click');
});

events.on('basket:click', () => {
  const basketItems = basketData.getCardsBasket().map(item =>
    new CardBasket(cloneTemplate(cardBasketTemplate), events).render(item));

  const basketTotal = basketData.getTotalPriceFromBasket();

  basket.buttonState = basketTotal > 0;

  modal.render({
    content: basket.render({
      items: basketItems,
      total: basketTotal,
    })
  });
});

events.on('basket:changed', () => {
  const basketCountTotal = basketData.getCountCardsInBasket();

  page.render({
    basketCounter: basketCountTotal,
  });
});

events.on('basket:stepOrder', () => {
  console.log('basket:stepOrder');
})

events.on('success:close', () => {
  basketData.clearBasket();
  modal.close();
});

events.on('modal:open', () => {
  modal.locked(true);
});

events.on('modal:close', () => {
  modal.locked(false);
});

api.getProductsApi()
  .then(cardsData.setCards.bind(cardsData))
  .catch(err => console.error(err));