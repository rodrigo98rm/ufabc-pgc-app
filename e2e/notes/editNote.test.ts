import {expect} from 'detox';
import {createNote} from '../baseFlows/createNote.base';

describe('Edit note', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('7 - Should edit a note', async () => {
    const noteTitle = 'Nota a ser editada';
    const noteDescription = 'Descricao da nota a ser editada';

    const noteTitleEdited = 'Nota editada';
    const noteDescriptionEdited = 'Descricao da nota editada';

    await createNote({
      noteTitle,
      noteDescription,
    });

    await element(by.text(noteTitle)).tap();

    const titleInput = element(by.id('title-input'));
    await titleInput.clearText();
    await titleInput.typeText(noteTitleEdited);

    const descriptionInput = element(by.id('description-input'));
    await descriptionInput.clearText();
    await descriptionInput.typeText(noteDescriptionEdited);

    await element(by.id('save-note-button')).tap();

    await expect(element(by.id('new-note-button'))).toBeVisible();
    await expect(element(by.text(noteTitleEdited))).toBeVisible();
    await expect(element(by.text(noteDescriptionEdited))).toBeVisible();
  });
});
