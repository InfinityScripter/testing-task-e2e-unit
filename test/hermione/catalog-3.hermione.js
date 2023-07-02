const BASE_URL = 'http://localhost:3000/hw/store';
const axios = require('axios');
const puppeteer = require('puppeteer');

describe('3 Каталог', function () {
  let page;

  beforeEach(async function () {
    const browserInstance = await puppeteer.launch();
    page = await browserInstance.newPage();
    await page.goto(`${BASE_URL}/catalog`);
  });

  it('3.1 в каталоге должны отображаться товары, список которых приходит с сервера', async function () {
    const res = await axios.get(`${BASE_URL}/api/products`);
    const expectedProductNames = res.data.map((el) => el.name);

    await page.waitForSelector('.ProductItem-Name',{ timeout: 2000 });
    const actualProductNames = await page.$$eval('.ProductItem-Name', products =>
      products.map(product => product.innerHTML.trim()));

    expect(actualProductNames).toEqual(expectedProductNames);
  });

  it('3.2 для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async function () {
    const res = await axios.get(`${BASE_URL}/api/products/1`);
    const expectedProductName = res.data.name;

    await page.goto(`${BASE_URL}/catalog/1`);
    await page.waitForSelector('.ProductDetails-Name', { timeout: 2000 });

    const actualProductName = await page.$eval('.ProductDetails-Name', el => el.innerHTML.trim());

    expect(actualProductName).toEqual(expectedProductName);
  });
});
