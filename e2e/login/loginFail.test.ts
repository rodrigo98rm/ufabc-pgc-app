import {expect} from 'detox';

describe('Login Fail', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('1 - Login fails', async () => {
    await element(by.id('email-input')).typeText('rodrigo@teste.com');
    await element(by.id('password-input')).typeText('12345');
    await element(by.id('login-button')).tap();

    await expect(element(by.text('Login Inválido'))).toBeVisible();
    await element(by.text('OK')).tap();

    await expect(element(by.text('LOGIN'))).toBeVisible();
  });
});
