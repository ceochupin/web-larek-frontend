import './scss/styles.scss';

import { ProductsData } from './components/model/ProductsDataModel';
import { WebLarekApi } from './components/connector/WebLarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { Product } from './components/view/Product';
import { EventEmitter } from './components/base/events';
import { Page } from './components/view/Page';
import { BasketData } from './components/model/BasketDataModel';
import { IApi } from './types';
import { Api } from './components/base/api';

const events = new EventEmitter();
const baseUrl: IApi = new Api(API_URL);
const api = new WebLarekApi(baseUrl, CDN_URL);

const page = new Page(document.querySelector('.page__wrapper') as HTMLElement);
const productsData = new ProductsData(events);
const basket = new BasketData();

const productTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;

api.getProductsApi()
  .then(data => {
    productsData.setProductsAll(data);
  })
  .catch(err => console.error(err));

events.on('items:changed', () => {
  const itemsHTMLArray = productsData.getProductsAll().map(item => new Product(cloneTemplate(productTemplate), events).render(item));
  page.render({
    productList: itemsHTMLArray,
    basketCounter: basket.getCountProductsInBasket()
  })
});

events.on('product:click', ({id}: {id: string}) => {
  const productSelect = productsData.getProduct(id);
  console.log('product:click');
})