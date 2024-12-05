import {expect} from 'detox';

describe('List empty state', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('3 - List should correctly display an empty state', async () => {
    await expect(element(by.text('Nenhuma nota cadastrada'))).toBeVisible();
  });
});
