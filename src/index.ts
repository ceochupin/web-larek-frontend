import './scss/styles.scss';

import { ProductsData } from './components/model/ProductsDataModel';
import { WebLarekApi } from './components/connector/WebLarekApi';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Product } from './components/view/Product';
import { EventEmitter } from './components/base/Events';
import { Page } from './components/view/Page';
import { BasketData } from './components/model/BasketDataModel';
import { IApi } from './types';
import { Api } from './components/base/Api';
import { Modal } from './components/common/Modal';

// Темплейты HTMLTemplateElement
const productCatalogTemplate = ensureElement(settings.templates.productCatalog) as HTMLTemplateElement;
const productPreviewTemplate = ensureElement(settings.templates.productPreview) as HTMLTemplateElement;
const productBasketTemplate = ensureElement(settings.templates.productBasket) as HTMLTemplateElement;

// Контейнеры на странице HTMLElement
const modalTemplate = ensureElement(settings.containers.modal) as HTMLElement;
const pageContainer = ensureElement(settings.containers.page) as HTMLElement;

const events = new EventEmitter();
const baseUrl: IApi = new Api(API_URL);
const api = new WebLarekApi(baseUrl, CDN_URL);

const page = new Page(pageContainer);
const productsData = new ProductsData(events);
const basket = new BasketData();
const modal = new Modal(modalTemplate);

api.getProductsApi()
  .then(data => {
    productsData.setProductsAll(data);
    events.emit('initialData:loaded');
  })
  .catch(err => console.error(err));

events.on('initialData:loaded', () => {
  const productsHTMLArray = productsData.getProductsAll().map(item => 
    new Product(cloneTemplate(productCatalogTemplate), events).render(item));


  page.render({
    productList: productsHTMLArray,
    basketCounter: basket.getCountProductsInBasket()
  })
});

events.on('product:click', ({id}: {id: string}) => {
  const productSelect = productsData.getProduct(id);
  const productPreview = new Product(cloneTemplate(productPreviewTemplate), events);

  modal.render({
    content: productPreview.render(productSelect)
  });
})