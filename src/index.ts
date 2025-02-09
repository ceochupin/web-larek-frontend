import './scss/styles.scss';

import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { API_URL, CDN_URL } from './utils/constants';
import { IApi, ICatalogDataState, IUser, IUserDataState } from './types';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/connector/WebLarekApi';

import { CatalogData } from './components/model/CatalogData';

import { Modal } from './components/common/Modal';
import { Basket } from './components/view/Basket';

import { Page } from './components/view/Page';

import { CardCatalog } from './components/view/CardCatalog';
import { CardPreview } from './components/view/CardPreview';
import { CardBasket } from './components/view/CardBasket';
import { UserData } from './components/model/UserData';
import { UserOrder } from './components/view/UserOrder';
import { Success } from './components/view/Success';
import { UserContacts } from './components/view/UserContacts';

const events = new EventEmitter();

const baseUrl: IApi = new Api(API_URL);
const api = new WebLarekApi(baseUrl, CDN_URL);

const modalContainer = ensureElement('#modal-container') as HTMLElement;
const pageContainer = ensureElement('.page') as HTMLElement;

const cardCatalogTemplate = ensureElement('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = ensureElement('#card-basket') as HTMLTemplateElement;

const basketTemplate = ensureElement('#basket') as HTMLTemplateElement;

const userContactsTemplate = ensureElement('#contacts') as HTMLTemplateElement;
const userOrderTemplate = ensureElement('#order') as HTMLTemplateElement;

const successTemplate = ensureElement('#success') as HTMLTemplateElement;

const initialStateCatalog: ICatalogDataState = { cards: [] };
const catalogData = new CatalogData(initialStateCatalog, events);

const initialStateUser: IUserDataState = { user: {} };
const userData = new UserData(initialStateUser, events);

const userOrder = new UserOrder(cloneTemplate(userOrderTemplate), events);
const userContacts = new UserContacts(cloneTemplate(userContactsTemplate), events);

const page = new Page(pageContainer, events);
const modal = new Modal(modalContainer, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

api.getProductsApi()
  .then(catalogData.setCards.bind(catalogData))
  .catch(err => console.error(err));

events.on('catalog:changed', () => {
  const cardsHTMLArray = catalogData.getCards().map(item => 
    new CardCatalog(cloneTemplate(cardCatalogTemplate), events).render(item));

  const basketCountTotal = catalogData.getSelectedCardsCount();

  page.render({
    cardsList: cardsHTMLArray,
    basketCounter: basketCountTotal,
  })
});

events.on('cardCatalog:click', ({id}: {id: string}) => {
  const cardClick = catalogData.getCard(id);
  const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);

  cardPreview.buttonText = cardClick.selected;
  cardPreview.buttonState = catalogData.isPriceNotNull(id);

  modal.render({
    content: cardPreview.render(cardClick)
  });
});

events.on('cardPreviewButton:click', ({ id }: { id: string }) => {
  catalogData.toggleCardSelection(id);

  events.emit('cardCatalog:click', {id});
});

events.on('cardBasketButtonRemove:click', ({ id }: { id: string }) => {
  catalogData.toggleCardSelection(id);

  events.emit('basket:click');
});

events.on('basket:click', () => {
  const cardsBasketHTMLArray = catalogData.getSelectedCards().map((item, index) => {
    const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), events);
    cardBasket.index = ++index;
    return cardBasket.render(item);
  });

  const basketTotal = catalogData.getTotalPriceOfSelectedCards();

  basket.buttonState = basketTotal > 0;

  modal.render({
    content: basket.render({
      items: cardsBasketHTMLArray,
      total: basketTotal,
    })
  });
});

events.on('basket:stepOrder', () => {
  modal.render({
    content: userOrder.render({
      payment: null,
      address: '',
      valid: false,
      errors: [],
    })
  });
});

events.on('order:submit', () => {
  modal.render({
    content: userContacts.render({
      email: '',
      phone: '',
      valid: false,
      errors: [],
    })
  })
});

events.on('/^contacts\..*:change$/',(data: { field: keyof IUser, value: string }) => {
  userData.setUserData(data.field, data.value);
});

events.on('/^order\..*:change$/',(data: { field: keyof IUser, value: string }) => {
  userData.setUserData(data.field, data.value);
});

events.on('contacts:submit', () => {
  api.postOrderApi({
      payment: userData.getPayment(),
      address: userData.getAddress(),
      email: userData.getEmail(),
      phone: userData.getPhone(),
      total: catalogData.getTotalPriceOfSelectedCards(),
      items: catalogData.getSelectedCardIds(),
  })
  .then((res) => {
      modal.render({
        content: success.render({
          total: res.total
        })
      });

      catalogData.clearSelection();
      userData.clearUserData();
  })
  .catch(err => console.error(err));
});

events.on('success:close', () => {
  modal.close();
});

events.on('modal:open', () => {
  modal.locked(true);
});

events.on('modal:close', () => {
  modal.locked(false);
});