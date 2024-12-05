import {expect} from 'detox';

describe('Create note validation', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('4 - Should display the correct validation errors when creating a note', async () => {
    const newNoteButton = element(by.id('new-note-button'));
    await newNoteButton.tap();

    const saveNoteButton = element(by.id('save-note-button'));
    await saveNoteButton.tap();

    const titleError = element(by.text('Preencha o título'));
    await expect(titleError).toBeVisible();

    await element(by.text('OK')).tap();

    const titleInput = element(by.id('title-input'));
    await titleInput.typeText('Nota teste 1');

    await saveNoteButton.tap();

    const descriptionError = element(by.text('Preencha a descrição'));
    await expect(descriptionError).toBeVisible();

    await element(by.text('OK')).tap();

    const errorView = element(by.text('Erro'));
    await expect(errorView).not.toBeVisible();
  });
});
