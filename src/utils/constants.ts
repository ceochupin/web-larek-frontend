export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  pageClassName: {
    'productsContainer': '.gallery',
    'basketButton': '.header__basket',
    'basketCounter': '.header__basket-counter',
  } as Record<string, string>,
  productElementClassName: {
    'category': '.card__category',
    'title': '.card__title',
    'description': '.card__text',
    'image': '.card__image',
    'price': '.card__price',
    'button': '.card__button',
  } as Record<string, string>,
  productCategoryClassName: {
    'софт-скил': 'card__category_soft',
    'другое': 'card__category_other',
    'дополнительное': 'card__category_additional',
    'кнопка': 'card__category_button',
    'хард-скил': 'card__category_hard',
	} as Record<string, string>,
  basketClassName: {
    'list': '.basket__list',
    'totalPrice': '.basket__price',
    'buttonOrder': '.basket__button',
  } as Record<string, string>,
  modalClassName: {
    'active': 'modal_active',
    'closeButton': '.modal__close',
    'contentContainer': '.modal__content',
  } as Record<string, string>,
  templates: {
    'productCatalog': '#card-catalog',
    'productPreview': '#card-preview',
    'productBasket': '#card-basket',
    'basketModal': '#basket',
  } as Record<string, string>,
  containers: {
    'modal': '#modal-container',
    'page': '.page__wrapper',
  } as Record<string, string>,
};
