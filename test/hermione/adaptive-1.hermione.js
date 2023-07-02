describe('1. Общие требования:', () => {
  const windowSizes = [1920, 800, 600, 375];
  windowSizes.forEach(width => {
    it(`1.1 Вёрстка должна адаптироваться под ширину экрана ${width}px`, async function() {
      await this.browser.url('http://localhost:3000/hw/store');
      await this.browser.setWindowSize(width, 1080);
      const element = await this.browser.$('.Application');
      await element.waitForDisplayed({ timeout: 2000 });
      await this.browser.assertView(`adaptive${width}px`, '.Application', {
        screenshotDelay: 500,
      });
    });
  });
});

describe('Адаптивность навигационного меню', () => {
  it('1.4 На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function() {
    await this.browser.url('http://localhost:3000/hw/store');
    await this.browser.setWindowSize(575, 1080);
    await this.browser.assertView('hamburger', 'body', {
      screenshotDelay: 1000,
    });
  });
});
