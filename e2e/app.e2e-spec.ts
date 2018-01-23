import { SassWebTestPage } from './app.po';

describe('sass-web-test App', () => {
  let page: SassWebTestPage;

  beforeEach(() => {
    page = new SassWebTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
