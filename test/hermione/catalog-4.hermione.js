const axios = require('axios');

const PRODUCT_PAGE_URL = 'http://localhost:3000/hw/store/catalog/0';
const CART_PAGE_URL = 'http://localhost:3000/hw/store/cart';
const CHECKOUT_API_URL = 'http://localhost:3000/hw/store/api/checkout';

describe('4.2 В корзине должна отображаться таблица с добавленными в нее товарами', function() {
  beforeEach(async function({browser}) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.goto(PRODUCT_PAGE_URL);
    await page.click('.ProductDetails-AddToCart');

    await page.goto(CART_PAGE_URL);
    await page.click('.Form-Submit');

    await page.type('.Form-Field_type_name', 'Name');
    await page.type('.Form-Field_type_phone', '89222123456');
    await page.type('.Form-Field_type_address', 'Moscow');
  });

  it('Поле для ввода имени заполнено не корректно', async function() {
    const nameFieldClass = await this.browser.$('.Form-Field_type_name').getProperty('className');
    expect(nameFieldClass).not.toContain('is-invalid');
  });

  it('Поле для ввода номера телефона заполнено не корректно', async function() {
    const phoneFieldClass = await this.browser.$('.Form-Field_type_phone').getProperty('className');
    expect(phoneFieldClass).not.toContain('is-invalid');
  });

  it('Поле для ввода адреса заполнено не корректно', async function() {
    const addressFieldClass = await this.browser.$('.Form-Field_type_address').getProperty('className');
    expect(addressFieldClass).not.toContain('is-invalid');
  });

  it('Заказ оформлен', async function() {
    const puppeteer = await this.browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await page.click('.Form-Submit');

    const cartNumber = await this.browser.$('.Cart-Number').getHTML(false);
    const res = await axios.post(CHECKOUT_API_URL);
    const successMessageClass = await this.browser.$('.Cart-SuccessMessage').getProperty('className');

    expect(successMessageClass).not.toContain('alert-danger');
    expect(res.data.id).toBe(+cartNumber + 1);
  });
});
