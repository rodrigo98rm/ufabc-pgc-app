import {expect} from 'detox';
import {createNote} from '../baseFlows/createNote.base';

describe('Delete note', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('Should delete a note', async () => {
    const noteTitle = 'Nota a ser apagada';
    const noteDescription = 'Descricao da nota a ser apagada';

    await createNote({
      noteTitle,
      noteDescription,
    });

    await element(by.text(noteTitle)).tap();

    await element(by.id('delete-note-button')).tap();
    await element(by.text('Apagar')).tap();

    await expect(element(by.id('new-note-button'))).toBeVisible();
    await expect(element(by.text(noteTitle))).not.toBeVisible();
  });
});
