import {expect} from 'detox';

export const createNote = async ({
  noteTitle,
  noteDescription,
}: {
  noteTitle: string;
  noteDescription: string;
}) => {
  const newNoteButton = element(by.id('new-note-button'));
  await newNoteButton.tap();

  const titleInput = element(by.id('title-input'));
  await titleInput.typeText(noteTitle);

  const descriptionInput = element(by.id('description-input'));
  await descriptionInput.typeText(noteDescription);

  await element(by.id('save-note-button')).tap();

  await expect(newNoteButton).toBeVisible();

  const noteTitleElement = element(by.text(noteTitle));
  const noteDescriptionElement = element(by.text(noteDescription));

  await expect(noteTitleElement).toBeVisible();
  await expect(noteDescriptionElement).toBeVisible();
};
