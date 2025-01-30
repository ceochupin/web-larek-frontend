import './scss/styles.scss';

import { ProductsData } from './components/model/ProductsData';
import { WebLarekApi } from './components/connector/WebLarekApi';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Product } from './components/view/Product';
import { EventEmitter } from './components/base/Events';
import { Page } from './components/view/Page';
import { BasketData } from './components/model/BasketData';
import { IApi } from './types';
import { Api } from './components/base/Api';
import { Modal } from './components/common/Modal';
import { Basket } from './components/view/Basket';

// Темплейты HTMLTemplateElement
const productCatalogTemplate = ensureElement(settings.templates.productCatalog) as HTMLTemplateElement;
const productPreviewTemplate = ensureElement(settings.templates.productPreview) as HTMLTemplateElement;
const productBasketTemplate = ensureElement(settings.templates.productBasket) as HTMLTemplateElement;
const basketTemplate = ensureElement(settings.templates.basketModal) as HTMLTemplateElement;

// Контейнеры на странице HTMLElement
const modalTemplate = ensureElement(settings.containers.modal) as HTMLElement;
const pageContainer = ensureElement(settings.containers.page) as HTMLElement;

const events = new EventEmitter();
const baseUrl: IApi = new Api(API_URL);
const api = new WebLarekApi(baseUrl, CDN_URL);

const page = new Page(pageContainer, events);
const productsData = new ProductsData(events);
const basketData = new BasketData();
const modal = new Modal(modalTemplate);
const basket = new Basket(cloneTemplate(basketTemplate));

api.getProductsApi()
  .then(data => {
    productsData.setProductsAll(data);
    events.emit('initialData:loaded');
  })
  .catch(err => console.error(err));

events.on('initialData:loaded', () => {
  const productsHTMLArray = productsData.getProductsAll().map(item => 
    new Product(cloneTemplate(productCatalogTemplate), events).render(item));

  const basketCountTotal = basketData.getCountProductsInBasket();

  page.render({
    productList: productsHTMLArray,
    basketCounter: basketCountTotal,
  })
});

events.on('product:click', ({id}: {id: string}) => {
  const productSelect = productsData.getProduct(id);
  const productPreview = new Product(cloneTemplate(productPreviewTemplate), events);

  modal.render({
    content: productPreview.render(productSelect)
  });
});

events.on('product:add', ({id}: {id: string}) => {
  basketData.addProductInBasket(productsData.getProduct(id));
});

events.on('basket:click', () => {
  const basketItems = basketData.getProductsAllInBasket().map(item =>
    new Product(cloneTemplate(productBasketTemplate), events).render(item));

  const basketTotal = basketData.getTotalPriceProductsInBasket()

  modal.render({
    content: basket.render({
      items: basketItems,
      total: basketTotal,
    })
  });
})