import './scss/styles.scss';

import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/Eevents';
import { API_URL, CDN_URL } from './utils/constants';
import { Api } from './components/base/aApi';
import { IApi, ICatalogDataState, IUser, IUserDataState } from './types';
import { WebLarekApi } from './components/connector/WebLarekApi';

import { CatalogData } from './components/model/CcatalogData';

import { Modal } from './components/common/Mmodal';
import { Basket } from './components/view/Bbasket';

import { Page } from './components/view/Ppage';

import { CardCatalog } from './components/view/CcardCatalog';
import { CardPreview } from './components/view/CcardPreview';
import { CardBasket } from './components/view/CcardBasket';
import { UserData } from './components/model/UuserData';
import { UserOrder } from './components/view/UuserOrder';
import { UserContacts } from './components/view/UuserContacts';
import { Success } from './components/view/Ssuccess';


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

const catalogData = new CatalogData(events);

const initialStateUser: IUserDataState = { user: {} };
const initialErrors: Record<string, string> = {};
const userData = new UserData(initialErrors, initialStateUser, events);

const page = new Page(pageContainer, events);
const modal = new Modal(modalContainer, events);
const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const userOrder = new UserOrder(cloneTemplate(userOrderTemplate), events);
const userContacts = new UserContacts(cloneTemplate(userContactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

events.on('catalogData:init', () => {
  const cardsHTMLArray = catalogData.getCards().map(item => 
    new CardCatalog(cloneTemplate(cardCatalogTemplate), events).render(item));

  page.render({
    cardsList: cardsHTMLArray
  })
});

events.on('catalogData:changed', () => {
  const basketCountTotal = catalogData.getSelectedCardsCount();

  page.render({
    basketCounter: basketCountTotal,
  })
});

events.on('cardCatalog:openPreview', ({ id }: { id: string }) => {
  const cardClick = catalogData.getCard(id);

  cardPreview.buttonText = cardClick.selected;
  cardPreview.buttonState = catalogData.isPriceNotNull(id);

  modal.render({
    content: cardPreview.render(cardClick)
  });
});

events.on('cardPreview:selectedChanged', ({ id }: { id: string }) => {
  catalogData.toggleCardSelected(id);

  events.emit('cardCatalog:openPreview', { id });
});

events.on('basket:open', () => {
  const cardsBasketHTMLArray = catalogData.getSelectedCards().map((item, index) => {
    const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), events);
    cardBasket.index = ++index;
    return cardBasket.render(item);
  });

  const basketTotalPrice = catalogData.getTotalPriceOfSelectedCards();

  basket.buttonState = !!basketTotalPrice;

  modal.render({
    content: basket.render({
      items: cardsBasketHTMLArray,
      total: basketTotalPrice,
    })
  });
});

events.on('cardBasket:selectedChanged', ({ id }: { id: string }) => {
  catalogData.toggleCardSelected(id);

  events.emit('basket:open');
});

events.on('inputValue:changed', (data: { field: keyof IUser, value: string }) => {
  userData.setUserData(data.field, data.value);
});

events.on('userData:errorsChange', (errors: Partial<IUser>) => {
  const { payment, address, email, phone } = errors;

  userOrder.valid = !payment && !address;
  userOrder.errors = Object.values({ payment, address })
    .filter((i) => !!i)
    .join(' и ');

  userContacts.valid = !email && !phone;
  userContacts.errors = Object.values({ email, phone })
    .filter((i) => !!i)
    .join(' и ');
});

events.on('basket:submit', () => {
  modal.render({
    content: userOrder.render({
      valid: false,
      errors: [],
    })
  });
});

events.on('order:submit', () => {
  modal.render({
    content: userContacts.render({
      valid: false,
      errors: [],
    })
  })
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

events.on('userData:clear', () => {
  userOrder.reset();
  userContacts.reset();
});

events.on('success:close', () => {
  modal.close();
});

api.getProductsApi()
  .then(catalogData.setCards.bind(catalogData))
  .catch(err => console.error(err));