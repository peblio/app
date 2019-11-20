import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { seedDB, clearDB, hashUserPassword, login } from '../helpers';

fixture('Run Workspace without logging in')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('workspace and editor files open', async (t) => {
    const files = Selector('[data-test=editor-toolbar__file-name]');
  await t
    .click(Selector('[data-test=workspace__header-container]'))
    .click(Selector('[data-test=open-files__view-all-files]'))
    .click(Selector('[data-test=play-sketch-button]'))
    .expect(files.count).eql(3)
});

test('workspace p5 code runs and stops', async (t) => {
  await t
    .click(Selector('[data-test=workspace__header-container]'))
    .click(Selector('[data-test=play-sketch-button]'))
    .expect(Selector('[data-test=code-output]').exists).ok()
    .click(Selector('[data-test=pause-sketch-button]'))
    .expect(Selector('[data-test=code-output]').exists).notOk();
});

fixture('Run Workspace after logging in')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();

    const hashedPassword = await hashUserPassword(studentUser.password);
    const userSeedResults = await seedDB({
      User: [{
        ...studentUser,
        password: hashedPassword
      }]
    });
    await login(studentUser.email, studentUser.password);
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });


test('upload image in p5 editor', async(t) => {
  const fileList = Selector('[data-test=editor-toolbar__file-name]');
  await t
    .click(Selector('[data-test=workspace__header-container]'))
    .click(Selector('[data-test=open-files__view-all-files]'))
    .click(Selector('[data-test=editor-toolbar__add-file-button]'))
    .setFilesToUpload('.file-upload__dropzone input', [
      '../assets/cat.jpeg'
    ])
    .expect(fileList.nth(3).textContent).eql('cat.jpeg');
});
