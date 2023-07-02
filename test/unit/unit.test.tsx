import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {addToCart, initStore} from '../../src/client/store';
import { ExampleApi, CartApi } from '../../src/client/api';
import { Application } from '../../src/client/Application';

const URL = '/hw/store';
const api = new ExampleApi(URL);
const cart = new CartApi();
const store = initStore(api, cart);

const renderWithProviders = (ui: JSX.Element, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: ({children}) =>
      <BrowserRouter basename={URL}>
        <Provider store={store}>
          {children}
        </Provider>
      </BrowserRouter>
  })
}

const createTestItem = (id: number) => ({
  id,
  description: '',
  material: '',
  color: '',
  name: '',
  price: 0,
});

describe('1. Общие требования', () => {
  const app = <Application />;

  it('1.2 в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
    const { container } = renderWithProviders(app);
    const header = container.querySelector('.navbar-nav');
    const links = Array.from(header?.children || []).map(link =>
      (link as HTMLAnchorElement)?.href || null);

    expect(links).toEqual([
      'http://localhost/hw/store/catalog',
      'http://localhost/hw/store/delivery',
      'http://localhost/hw/store/contacts',
      'http://localhost/hw/store/cart',
    ]);
  });

  it('1.3 Название магазина должно быть ссылкой на главную', () => {
    const { container } = renderWithProviders(app);
    const ShopLogo = container.querySelector('.navbar-brand') as HTMLAnchorElement;

    expect(ShopLogo?.tagName).toEqual('A');
    expect(ShopLogo?.href).toEqual('http://localhost/hw/store/');
  });


  it('1.5 При выборе элемента из меню "гамбургера", меню должно закрываться', () => {
    const { container } = renderWithProviders(app);
    const header = container.querySelector('.Application-Menu');
    const burger = container.querySelector('.Application-Toggler');

    fireEvent.click(burger);
    const link = container.querySelector('a.nav-link');
    fireEvent.click(link);

    expect(header?.className.split(' ')).toContainEqual('collapse');
  });

  it('4.1 в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', () => {
    const { container } = renderWithProviders(app);

    store.dispatch(addToCart(createTestItem(0)));
    store.dispatch(addToCart(createTestItem(1)));
    store.dispatch(addToCart(createTestItem(2)));

    const navbar =
      container.querySelector('.navbar-nav')?.children[3].textContent;
    expect(navbar).toEqual('Cart (3)');
  });
});
