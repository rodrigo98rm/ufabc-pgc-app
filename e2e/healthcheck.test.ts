import {expect} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should log in successfuly', async () => {
    await element(by.id('email-input')).typeText('rodrigo@teste.com');

    await element(by.id('password-input')).typeText('123456');

    await element(by.id('login-button')).tap();

    await expect(element(by.text('You are now logged in!'))).toBeVisible();
  });
});
