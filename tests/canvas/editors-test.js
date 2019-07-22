import { Selector } from 'testcafe';

import config from '../config';
import { studentUser } from '../fixtures/user';
import { seedDB, clearDB, hashUserPassword, login } from '../helpers';

fixture('Executing editors')
  .page(config.baseUrl)
  .beforeEach(async (t) => {
    await clearDB();

    const hashedPassword = await hashUserPassword(studentUser.password);
    await seedDB({
      User: [{
        ...studentUser,
        password: hashedPassword
      }]
    });

    await login(studentUser.email, studentUser.password);
    await t.setNativeDialogHandler(type => type === 'beforeunload');
    await t.eval(() => window.location.reload(true));
  });

test('p5 sketch runs and stops', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-p5-editor]'))
    .click(Selector('[data-test=play-sketch-button]'))
    .expect(Selector('[data-test=code-output]').exists).ok()
    .click(Selector('[data-test=pause-sketch-button]'))
    .expect(Selector('[data-test=code-output]').exists).notOk();
});

test('html code runs and stops', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-html-editor]'))
    .click(Selector('[data-test=play-sketch-button]'))
    .expect(Selector('[data-test=code-output]').exists).ok()
    .click(Selector('[data-test=pause-sketch-button]'))
    .expect(Selector('[data-test=code-output]').exists).notOk();
});

test('front end code runs and stops', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-webdev-editor]'))
    .click(Selector('[data-test=play-sketch-button]'))
    .expect(Selector('[data-test=code-output]').exists).ok()
    .click(Selector('[data-test=pause-sketch-button]'))
    .expect(Selector('[data-test=code-output]').exists).notOk();
});

test('default processing sketch runs and stops', async (t) => {
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-processing-editor]'))
    .click(Selector('[data-test=play-sketch-button]'))
    .switchToIframe(Selector('[data-test=sketch-output]'))
    .expect(Selector('[data-test=processing-canvas]').exists).ok()
    .switchToMainWindow()
    .click(Selector('[data-test=pause-sketch-button]'))
    .expect(Selector('[data-test=sketch-output]').exists).notOk();
});

test('upload image in p5 editor', async(t) => {
  const fileList = Selector('[data-test=editor-toolbar__file-name]');
  await t
    .click(Selector('[data-test=add-code-editor]'))
    .click(Selector('[data-test=add-p5-editor]'))
    .click(Selector('[data-test=open-files__view-all-files]'))
    .click(Selector('[data-test=editor-toolbar__add-file-button]'))
    .setFilesToUpload('.file-upload__dropzone input', [
      '../assets/cat.jpeg'
    ])
    .expect(fileList.nth(3).textContent).eql('cat.jpeg');
});
