import './scss/styles.scss';

import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { API_URL, CDN_URL } from './utils/constants';
import { Api } from './components/base/Api';
import { IApi, IUser, TUserContacts, TUserOrder } from './types';
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
import { UserContacts } from './components/view/UserContacts';
import { Success } from './components/view/Success';
import { IFormState } from './components/common/Form';

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
const userData = new UserData(events);

const page = new Page(pageContainer, events);
const modal = new Modal(modalContainer, events);
const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const userOrder = new UserOrder(cloneTemplate(userOrderTemplate), events);
const userContacts = new UserContacts(cloneTemplate(userContactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

events.on('catalogDataModel:changed', () => {
  const cardsHTMLArray = catalogData.getCards().map(item => 
    new CardCatalog(cloneTemplate(cardCatalogTemplate), events)
      .render(item)
  );

  page.render({
    cardsList: cardsHTMLArray,
  });
});

events.on('catalogDataModel:basketChanged', () => {
  page.render({
    basketCounter: catalogData.getCountBasket(),
  });

  const cardsBasketHTMLArray = catalogData.getCardsBasket().map((item, index) =>
    new CardBasket(cloneTemplate(cardBasketTemplate), events)
      .setIndex(index + 1)
      .render(item)
  );

  basket.render({
    items: cardsBasketHTMLArray,
    total: catalogData.getTotalPriceInBasket(),
    buttonState: catalogData.isBasketNotEmpty(),
  });
});

events.on('cardCatalogView:clickCard', ({ id }: { id: string }) => {
  catalogData.setCardSelected(id);

  modal.render({
    content: cardPreview.render(),
  });
});

events.on('catalogDataModel:selectedChanged', ({ id }: { id: string }) => {
  cardPreview.setButtonText(catalogData.isCardInBasket(id));
  cardPreview.setButtonState(catalogData.isPriceNotNull(id));
  cardPreview.render(catalogData.getCard(id));
});

events.on('cardPreviewView:clickButton', ({ id }: { id: string }) => {
  catalogData.toggleCardInBasket(id);
});

events.on('pageVeiw:basketClick', () => {
  modal.render({
    content: basket.render(),
  });
});

events.on('cardBasketView:clickDeleteButton', ({ id }: { id: string }) => {
  catalogData.toggleCardInBasket(id);
});

events.on('formFieldValue:changed', (data: { field: keyof IUser, value: string }) => {
  userData.setUserData(data.field, data.value);
});

events.on('userDataModel:changed', (errors: Partial<Record<keyof IUser, string>>) => {
  const formFieldsOrder: Array<keyof TUserOrder> = ['payment', 'address'];
  const formFieldsContacts: Array<keyof TUserContacts> = ['email', 'phone'];

  userOrder.valid = userData.validateFields(formFieldsOrder);
  userOrder.errors = userData.getErrorFields(formFieldsOrder)
    .filter(Boolean)
    .join(' и ');

  userContacts.valid = userData.validateFields(formFieldsContacts);
  userContacts.errors = userData.getErrorFields(formFieldsContacts)
  .filter(Boolean)
  .join(' и ');
});

events.on('basketView:clickOrderButton', () => {
  modal.render({
    content: userOrder.render(userData.getUserData() as TUserOrder & IFormState)
  });
});

// events.on('userDataModel:errorsChange', (errors: Partial<IUser>) => {
//   const { payment, address, email, phone } = errors;

//   userOrder.valid = !payment && !address;
//   userOrder.errors = Object.values({ payment, address })
//     .filter((i) => !!i)
//     .join(' и ');

//   userContacts.valid = !email && !phone;
//   userContacts.errors = Object.values({ email, phone })
//     .filter((i) => !!i)
//     .join(' и ');
// });

// events.on('basketView:clickOrderButton', () => {
//   const { payment, address } = userData.getErrors();
//   const errors = Object.values({ payment, address })
//     .filter((i) => !!i)
//     .join(' и ');

//   modal.render({
//     content: userOrder.render({
//       valid: !payment && !address,
//       errors: errors,
//     })
//   });
// });


events.on('orderView:submit', () => {
  const { email, phone } = userData.getErrors();
  const errors = Object.values({ email, phone })
    .filter((i) => !!i)
    .join(' и ');

  modal.render({
    content: userContacts.render({
      valid: !email && !phone,
      errors: errors,
    })
  })
});

events.on('contactsView:submit', () => {
  const { payment, address, email, phone } = userData.getUserData();
  
  api.postOrderApi({
      payment,
      address,
      email,
      phone,
      total: catalogData.getTotalPriceInBasket(),
      items: catalogData.getCardIdsBasket(),
  })
  .then((res) => {
      modal.render({
        content: success.render({
          total: res.total
        })
      });

      catalogData.clearPropsCatalogData();
      userData.clearUserData();
  })
  .catch(err => console.error(err));
});

// events.on('userDataModel:clear', () => {
//   userOrder.reset();
//   userContacts.reset();
// });

events.on('successView:close', () => {
  modal.close();
});

api.getProductsApi()
  .then(catalogData.setCards.bind(catalogData))
  .catch(err => console.error(err));