describe ('4.Корзина', async function (){
  it ('4.4 в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async function () {
    const puppeteer = await this.browser.getPuppeteer ();
    const [page] = await puppeteer.pages ();
    await page.goto (`http://localhost:3000/hw/store/catalog/0`);
    await page.waitForSelector ('.ProductDetails-AddToCart');
    await page.click ('.ProductDetails-AddToCart');
    await page.click ('.ProductDetails-AddToCart');
    await page.click ('.ProductDetails-AddToCart');
    await page.goto (`http://localhost:3000/hw/store/cart`);
    await page.click ('.Cart-Clear');
    await page.reload ();
    let catalogData = await this.browser.$ ('.Cart-Count');
    await catalogData.waitForExist ({reverse: true});
  });
});
