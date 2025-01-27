import './scss/styles.scss';

import { IProduct, ProductsData } from './components/ProductsData';
import { testCardsData } from './types/tempData';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { Api } from './components/base/api';
import { AppApi, IApi } from './components/AppApi';

const baseUrl: IApi = new Api(API_URL, settings);
const api = new AppApi(baseUrl, CDN_URL);
const productsData = new ProductsData();

api.getApiProducts()
  .then((products) => {
    productsData.items = products;
    console.log(productsData.getProducts());
  })
  .catch((err) => console.log(err));