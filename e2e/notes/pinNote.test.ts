import {expect} from 'detox';
import {createNote} from '../baseFlows/createNote.base';

describe('Delete note', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('Should delete a note', async () => {
    const noteTitle = 'Nota a ser fixada';
    const noteDescription = 'Descricao da nota a ser fixada';

    await createNote({
      noteTitle,
      noteDescription,
    });

    await expect(
      element(by.id(`list-item-pinned:false-${noteTitle}`)),
    ).toBeVisible();

    await element(by.text(noteTitle)).tap();

    await element(by.id('pin-note-switch')).tap();

    await element(by.text('SALVAR')).tap();

    await expect(element(by.id('new-note-button'))).toBeVisible();
    await expect(
      element(by.id(`list-item-pinned:true-${noteTitle}`)),
    ).toBeVisible();
  });
});
