import { RxJSDemoPage } from './app.po';

describe('rx-js-demo App', () => {
  let page: RxJSDemoPage;

  beforeEach(() => {
    page = new RxJSDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
