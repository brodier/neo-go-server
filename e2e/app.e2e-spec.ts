import { NeoGoServerPage } from './app.po';

describe('neo-go-server App', () => {
  let page: NeoGoServerPage;

  beforeEach(() => {
    page = new NeoGoServerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
