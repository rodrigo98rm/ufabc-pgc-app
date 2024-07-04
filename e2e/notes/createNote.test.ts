import {createNote} from '../baseFlows/createNote.base';

describe('Create note', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
  });

  it('Should create a note', async () => {
    await createNote({
      noteTitle: 'Nota teste 1',
      noteDescription: 'Descricao teste 1',
    });
  });
});
