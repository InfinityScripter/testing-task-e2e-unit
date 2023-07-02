describe('2. Страницы', function() {
  const BASE_URL = 'http://localhost:3000/hw/store';

  it('2.1/2.2 Главная', async function() {
    await this.browser.url(BASE_URL);
    await this.browser.pause(1000);
    await this.browser.assertView('main', '.Home');
  });

  it('2.1/2.2 Каталог', async function() {

    await this.browser.url(`${BASE_URL}/catalog`);
    await this.browser.pause(3000);
    await this.browser.assertView('catalog', 'body', {
      screenshotDelay: 2000,
      ignoreElements: ['.card-body','.navbar-nav'],
    });
  });

  it('2.1/2.2 Доставка', async function() {
    await this.browser.url(`${BASE_URL}/delivery`);
    await this.browser.pause(1000);
    await this.browser.assertView('delivery', '.Delivery');
  });

  it('2.1/2.2 Контакты', async function() {
    await this.browser.url(`${BASE_URL}/contacts`);
    await this.browser.pause(1000);
    await this.browser.assertView('contacts', '.Contacts');
  });
});
