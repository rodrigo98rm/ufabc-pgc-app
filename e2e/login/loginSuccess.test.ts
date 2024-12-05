import {expect} from 'detox';

describe('Login Success', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('2 - Should log in successfuly', async () => {
    await element(by.id('email-input')).typeText('rodrigo@teste.com');

    await element(by.id('password-input')).typeText('123456');

    await element(by.id('login-button')).tap();

    await expect(element(by.text('Notas'))).toBeVisible();
  });
});
