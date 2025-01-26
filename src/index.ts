import './scss/styles.scss';

import { IProduct, ProductsData } from './components/ProductsData';
import { testCardsData } from './types/tempData';
import { API_URL } from './utils/constants';
import { Api } from './components/base/api';
import { AppApi, IApi } from './components/AppApi';

const baseUrl: IApi = new Api(API_URL);
const api = new AppApi(baseUrl);
const productsData = new ProductsData();

api.getApiProducts()
  .then((products) => {
    productsData.items = products;
    console.log(productsData.items);
  })
  .catch((err) => console.log(err));